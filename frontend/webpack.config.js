const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const frontendPackage = require('./package.json');

module.exports = {
    mode: 'development',

    entry: './src/js/main.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        port: 4200,
        open: true,
        hot: true,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            APP_VERSION: JSON.stringify(frontendPackage.version)
        }),
        new webpack.DefinePlugin({
            'process.env.API_BASE_URL': JSON.stringify(
                process.env.API_BASE_URL || 'http://localhost:3000'
            )
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    to: '.'
                }
            ]
        })
    ]
};