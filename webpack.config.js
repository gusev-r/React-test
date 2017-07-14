var path = require("path");

var config = {
    // точка входа в сборку js
    entry: "./main.js",
    // точка выхода js
    output: {
        path: __dirname,
        filename: "index.js"
    },

    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    // Зависимости
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}

module.exports = config;