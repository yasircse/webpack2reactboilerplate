const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


const isProd = process.env.NODE_ENV === 'production' // this will return true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'

})

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {

    entry: [
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './src/index.js'
        // the entry point of our app
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            title: 'Webpack2 Learning',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './public/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]

}