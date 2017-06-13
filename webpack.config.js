const path = require('path');
const webpack = require('webpack');
var fs= require('fs');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env) {

  //写入less  可以在这里修改主题 以及适配系数 默认是基于iphone6
  writeCommonless();
 

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  var entry = {
    site1:'./site1/index.js',
    site2:'./site2/index.js'
  };
  var plugins= [
      
      new webpack.NamedModulesPlugin(),

      new webpack.LoaderOptionsPlugin({
          minimize: true
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './site1/index.html', 
        inject: 'body' ,
        chunks:["site1"],
        hash:true
      }),
      new HtmlWebpackPlugin({
        filename: 'index1.html',
        template: './site2/index.html', 
        inject: 'body' ,
        chunks:["site2"],
        hash:true
      })
  ];

  if(!isProd){
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  
  
  if(!isProd){
    var ip = arguments["1"].host||"localhost";
    var port =  arguments["1"].port;
    var url = ip+":"+port;
    url = "http://"+url;
    entry.dev_patch = 'react-hot-loader/patch';
    entry.dev_client = 'webpack-dev-server/client?'+url;
    entry.dev_server= 'webpack/hot/only-dev-server';
  }
return {
  context: path.resolve(__dirname, 'example'),
  entry:entry,
  output: {
    filename: '[name].entry.js',
    chunkFilename: !isProd ? '[name].bundle.js' : '[name].[chunkhash:8].min.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist'),

    publicPath: isProd?'./':'/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: isProd ? 'hidden-source-map' : 'eval',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path

    publicPath: isProd?'./':'/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader',{
              loader:"postcss-loader",
               options: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }
            } ],
      },
      { 
        test: /\.(png|jpg|jpeg|gif|woff)$/, 
        loader: 'url-loader?limit=6144&name=imgs/[path][name].[ext]'
      },
       {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
            test: /\.less$/,
            use: [{
                loader: "style-loader" 
            }, {
                loader: "css-loader" 
            }, 
            {
              loader:"postcss-loader",
               options: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }
            },
            {
                loader: "less-loader" 
            }]
      }
    ],
  },

  plugins:plugins,
};
}



function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            //console.log(path.dirname(dirname));
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}



function writeCommonless(){
   const rem = 75;
  /*
    这里可以配置框架的适配参数 iphone 6 为 75 iphone6p 为124.2 iphone为64
    rem 计算方法
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1;
    console.log(docEl.clientWidth * dpr / 10) ;
  */
  mkdirs(path.join(__dirname, '/node_modules/xz-lightapp/css'),function(){
    fs.writeFile(path.join(__dirname, '/node_modules/xz-lightapp/css/common.less'), 
        `@textcolor:#333;
         @headerbordercolor:rgb(171,171,173);
         @backgroundcolor:rgb(235,235,241);
         @themecolor:rgb(10,96,254);
         @bordercolor:rgb(194,192,198);
         .px2rem(@name, @px){ @{name}: @px / ${rem} * 1rem;}
         .px2px(@name, @px){
            @{name}: round(@px / 2) * 1px;
            [data-dpr="2"] & {
                @{name}: @px * 1px;
            }
            [data-dpr="2.5"] & {
                @{name}: round(@px * 2.5 / 2) * 1px;
            }
            [data-dpr="2.75"] & {
                @{name}: round(@px * 2.75 / 2) * 1px;
            }
            [data-dpr="3"] & {
                @{name}: round(@px / 2 * 3) * 1px
            }
            [data-dpr="4"] & {
                @{name}: @px * 2px;
            }
        }
         .px2remtransfrom(@x,@y){
            transform: translate3d( @x / ${rem} * 1rem,  @y / ${rem} * 1rem, 0);
            -webkit-transform: translate3d( @x / ${rem} * 1rem,  @y / ${rem} * 1rem, 0);
         }`,
         function (err) {
          if (err) throw err;
          console.log("common.less write success!!");
      });
  });
}