/* 引入操作路径模块和webpack */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');
const vueLoaderConfig = require('./vue-loader.conf')

module.exports = {
    /* 输入文件 */
    entry: {
        index: ['babel-polyfill', path.resolve(__dirname, '../web/src/main.js')]
    },
    output: {
        /* 输出目录，没有则新建 */
        path: path.resolve(__dirname, '../web/dist'),
        /* 静态目录，可以直接从这里取文件 */
        publicPath: '/',
        /* 文件名 */
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            }, { //页面中import css文件打包需要用到
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                /* 排除模块安装目录的文件 */
                exclude: /node_modules/
            }, {
                test: /\.png$|\.jpg$|\.gif$|\.ico$/,
                loader: "file-loader",
                exclude: /node_modules/
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
                // options: {
                //   limit: 10000,
                //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                // }
            }
        ]
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../web/src'),
            '~component': path.resolve(__dirname, '../web/src/components')
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../web/src/index.html'),
            inject: true
        }),
        new ExtractTextPlugin("style.css")
    ]
}