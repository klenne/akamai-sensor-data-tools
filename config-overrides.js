const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
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
