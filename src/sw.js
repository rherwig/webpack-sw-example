const SW_CACHE_ID = `sw-cache-${+new Date()}`;
const { assets } = serviceWorkerOption;

/**
 * Installs the service-worker and caches all webpack assets.
 * The assets are provided by the `serviceworker-webpack-plugin` and contain
 * everything, the webpack build emits.
 *
 * The cache id is generated new, each time the service worker changes.
 */
self.addEventListener('install', event => {
    console.info('[SW] Installing with cache id', SW_CACHE_ID);

    self.skipWaiting();

    const cacheOpen$ = caches.open(SW_CACHE_ID);
    const cacheAll$ = cacheOpen$.then(cache => cache.addAll(assets));

    event.waitUntil(cacheAll$);
});

/**
 * Cleans up all old caches when a new service worker is activated.
 */
self.addEventListener('activate', event => {
    const whitelist = [SW_CACHE_ID];

    const cacheCleanup$ = caches.keys().then(keys => {
        return Promise.all(keys.map(key => {
            if (whitelist.indexOf(key) === -1) {
                return caches.delete(key);
            }
        }));
    });

    event.waitUntil(cacheCleanup$);
});

/**
 * Responds with a cached resource, if one is found. If the cache does not
 * contain the assets, the cache request failes or the request method is not
 * a GET method, the regular web request is performed instead.
 */
self.addEventListener('fetch', event => {
    const { request } = event;

    if (request.method !== 'GET' ||
        (request.cache === 'only-if-cached' && request.mode !== 'same-origin')) {
        return;
    }

    const cache$ = caches.match(request).then(response => {
        return response ? response : fetch(request);
    }).catch(() => fetch(request));

    event.respondWith(cache$);
});
