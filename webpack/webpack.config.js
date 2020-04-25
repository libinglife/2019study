/*
 * @version: 
 * @Author: 李兵
 * @Date: 2020-04-17 22:30:28
 * @LastEditTime: 2020-04-19 14:36:58
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    mode: 'development',

    // loader 配置
    // ! loader执行顺序自右往左 
    module: {
        rules: [{
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // name: '[path][name]_[hash:8].[ext]'
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2|eot|woff|ttf|svg)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /.css$/,
                use: [{
                    loader: "style-loader",
                    options: {
                        // 把生成的css 放进一个style 里面
                        injectType: 'singletonStyleTag'
                    }
                }, 'css-loader']
            },
            // {
            //     test: /.less$/,
            //     use: [{
            //         loader: "style-loader",
            //         options: {
            //             // 把生成的css 放进一个style 里面
            //             injectType: 'singletonStyleTag'
            //         }
            //     }, 'css-loader', "postcss-loader", "less-loader"]
            // },
            // 使用MiniCssExtractPlugin.loader 生成单独的css 文件
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', "postcss-loader", "less-loader"
                ]
            }
        ]
    },
    // 选项控制是否生成，以及如何生成 source map 方便代码调试错误
    devtool: "eval-source-map",

    // 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name]_[chunkhash:8].css"
        })
    ]
}