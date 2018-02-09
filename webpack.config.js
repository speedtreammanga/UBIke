const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: [
        './js/App.js'
    ],
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/index.html'),
        }),
        new CopyWebpackPlugin([
            // {
                // from: path.resolve(__dirname, 'src/semantic/dist/semantic.min.js'),
                // to: path.resolve(__dirname, 'build/semantic/semantic.min.js')
            // },
            {
                from: path.resolve(__dirname, 'src/semantic/dist/semantic.min.css'),
                to: path.resolve(__dirname, 'build/semantic/semantic.min.css')
            }
        ]),
        // new UglifyJsWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                query: {
                    presets: ['stage-0', 'flow', 'es2016'],
                    plugins: ['transform-class-properties']
                }
            }
        ]
    },
    stats: { colors: true },
    devServer: {
        port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: path.join(__dirname, 'build'),
		historyApiFallback: true,
		open: true,
		openPage: '',
    }
};