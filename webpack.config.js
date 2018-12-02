const webpack = require('webpack');

module.exports = {
    entry: './frontend/index.js',
    output: {
        path: __dirname + '/core/static',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};