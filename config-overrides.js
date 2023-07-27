const webpack = require("webpack");
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
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]);
    return config;
};
