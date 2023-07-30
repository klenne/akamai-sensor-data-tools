const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        zlib: require.resolve("browserify-zlib"),
        child_process: false,
        fs: require.resolve("browserify-fs"),
        process: require.resolve("process/browser"),
        leveldown: require.resolve("level-js"),
        buffer: require.resolve("buffer/"),
        vm: require.resolve("vm-browserify"),
        util: require.resolve("util/")
    });
    config.resolve.fallback = fallback;

    if (process.env.NODE_ENV === 'production') {
        config.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        keep_fnames: true,
                        mangle: false,
                    },
                }),
            ],
        };
    }

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]);

    return config;
};
