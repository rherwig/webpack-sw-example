module.exports = api => {
    api.cache(true);

    return {
        presets: [
            require('@babel/preset-env'),
        ],
        plugins: [
            require('@babel/plugin-syntax-dynamic-import'),
        ],
    }
};
