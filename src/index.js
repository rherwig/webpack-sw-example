import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        runtime.register().then(reg => {
            console.info('Service worker registered', reg);
        });
    });
}

import(/* webpackChunkName: 'output' */ './modules/output').then(module => {
    module.default();
});
