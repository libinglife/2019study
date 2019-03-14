var path =  require('path');
var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin =require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports= {
    devtool:'eval-source-map',
    // entry:'./src/main.js' , //入口文件
    entry:{
        main:['./src/main.js'],
        one:['./src/one.js'],
        two:['./src/two.js'],
        three:['./src/process.js'],
    } , //入口文件
    output:{
        path:path.resolve(__dirname , 'dist'),
        filename:'[name].[chunkhash:8].js' //输出文件
        // filename:'bundle.js' //输出文件
    },
    module:{
      rules:[
          {
              test:/\.js$/,
              exclude:/node_modules/, //排除node_modules
              loader:'babel-loader',
              options: {
                  presets: ['env']
              }
          },
          {
              test:/\.css$/,
              // loader:'style-loader!css-loader', //第一种
              // use:["style-loader","css-loader"] //第二种
              // loader:ExtractTextPlugin.extract({ //第三种
              //     fallback:'style-loader',
              //     use:['css-loader']
              // })
              use:[
                  "style-loader" ,
                  MiniCssExtractPlugin.loader,
                  "css-loader"
              ]
          }
      ]
    },

    mode:'development',//开发环境

    devServer: {
        contentBase:"./dist" ,//本地服务器所加载文件的目录
        historyApiFallback:true, //不跳转
        inline:true, //实时刷新
        port:8090, //自定义服务监听端口
        host:'127.0.0.1' // 通过localhost访问

    },
    plugins:[
        new CleanWebpackPlugin(['dist']), //清除上一次打包的老文件
        // new ExtractTextPlugin({           //抽离css
        //    filename:'static/css/[name].[chunkhash:8].css'
        // }),
        new MiniCssExtractPlugin({  // 对应 webpack 4.0 版本
           filename: "static/css/[name].[chunkhash:8].css"
        }),
        // new MiniCssExtractPlugin(  // 对应 webpack 4.0 版本
        //    "static/css/[name].[chunkhash:8].css"
        // ),
        new HtmlWebpackPlugin({//根据模板自动生成 'Index.html' 文件，并且将带有hash指纹的js打入到html中
            title: "hello webpack",
            filename: 'index.html', //定义出口文件名
            template:"enter.html" //定义入口模板
            //excludeAssets: [/style.*.js/] // exclude style.js or style.[chunkhash].js
        })
    ]
};