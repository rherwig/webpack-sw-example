const { resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    entry: resolve(__dirname, '../src/index'),
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, '../public'),
        publicPath: '/',
        chunkFilename: '[name]-[hash].chunk.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new HtmlPlugin({
            template: resolve(__dirname, '../src/index.html'),
        }),
        new ServiceWorkerPlugin({
            entry: resolve(__dirname, '../src/sw.js'),
            excludes: [
                '**/*.map',
                '**/*.json',
            ],
        }),
    ],
};
