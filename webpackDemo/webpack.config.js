var path =  require('path');
var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin =require('extract-text-webpack-plugin');

module.exports= {
    devtool:'eval-source-map',
    entry:'./src/main.js' , //入口文件
    // entry:{
    //     main:['./src/main.js'],
    //     one:['./src/one.js'],
    //     two:['./src/two.js'],
    // } , //入口文件
    output:{
        path:path.resolve(__dirname , 'dist'),
        filename:'[name].[chunkhash:8].js' //输出文件
        // filename:'bundle.js' //输出文件
    },
    module:{
      rules:[
          // {
          //     test:/\.js$/,
          //     exclude:/node_modules/, //排除node_modules
          //     loader:'babel-loader',
          //     options: {
          //         presets: ['env']
          //     }
          // },
          {
              test:/\.css$/,
              loader:'style-loader!css-loader'
          }
      ]
    },
    devServer: {
        contentBase:"./dist" ,//本地服务器所加载文件的目录
        historyApiFallback:true, //不跳转
        inline:true //实时刷新
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "hello webpack",
            filename: 'index.html', //定义出口文件名
            template:"enter.html" //定义入口模板
            //excludeAssets: [/style.*.js/] // exclude style.js or style.[chunkhash].js
        })
    ]
};