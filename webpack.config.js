const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "client.js"),
        output: {
        path: path.resolve(__dirname, "build"),
            filename: "app.bundle.js",
            publicPath: path.resolve(__dirname, "/"),
        },
        resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"]
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
            ]
        },
};
