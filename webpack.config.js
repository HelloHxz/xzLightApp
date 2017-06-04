const path = require('path');
const webpack = require('webpack');
var fs= require('fs');
 

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


module.exports = function (env) {


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
        `
        @textcolor:#333;
        @headerbordercolor:rgb(171,171,173);
         @backgroundcolor:rgb(235,235,241);
         @themecolor:rgb(10,96,254);
         @bordercolor:rgb(194,192,198);
         .displayflex () {
            position: relative; 
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -moz-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-overflow-scrolling: touch;
          }
          .flex-wrap (@params) when (@params=wrap) {
            flex-wrap: wrap;
              -webkit-box-lines: multiple;
              box-lines: multiple;
              -webkit-flex-wrap: wrap;
          }

          .flex-wrap (@params) when (@params=wrap-reverse) {
            flex-wrap: wrap-reverse;
              -webkit-flex-wrap: wrap-reverse;
          }

          .flex-wrap (@params) when (@params=nowrap) {
            flex-wrap: nowrap;
              -webkit-box-lines: single;
              box-lines: single;
              -webkit-flex-wrap: nowrap;
          }
          .flex-direction (@dir) when (@dir=row) {
            -webkit-box-direction: normal;
            -webkit-box-orient: horizontal;
            -moz-flex-direction: row;
            -webkit-flex-direction: row;
            flex-direction: row;
          }
          .flex-direction (@dir) when (@dir=column) {
            -webkit-box-direction: normal;
            -webkit-box-orient: vertical;
            -moz-flex-direction: column;
            -webkit-flex-direction: column;
            flex-direction: column;
          }
          .justify-content (@params) when (@params=space-around) {
            justify-content: space-around;
              -webkit-justify-content: space-around;
          }
          .justify-content (@params) when (@params=space-between) {
            justify-content: space-between;
              -webkit-justify-content: space-between;
          }
          .justify-content (@params) when (@params=center) {
            -webkit-box-pack: center;
              box-pack: center;
              -moz-justify-content: center;
              -webkit-justify-content: center;
              justify-content: center;
          }
          .justify-content (@params) when (@params=flex-start) {
            -webkit-box-pack: start;
              box-pack: start;
              -moz-justify-content: flex-start;
              -webkit-justify-content: flex-start;
              justify-content: flex-start;
          }
          .justify-content (@params) when (@params=flex-end) {
            -webkit-box-pack: end;
              box-pack: end;
              -moz-justify-content: flex-end;
              -webkit-justify-content: flex-end;
              justify-content: flex-end;
          }
          .align-items(@params) when(@params=stretch){
            align-items: stretch;
              -webkit-align-items: stretch;
          }
          .align-items(@params) when(@params=flex-start){
            -webkit-box-align: start;
              box-align: start;
              -moz-align-items: flex-start;
              -webkit-align-items: flex-start;
              align-items: flex-start;
          }
          .align-items(@params) when(@params=flex-end){
            -webkit-box-align: end;
              box-align: end;
              -moz-align-items: flex-end;
              -webkit-align-items: flex-end;
              align-items: flex-end;
          }
          .align-items(@params) when(@params=center){
            -webkit-box-align: center;
              box-align: center;
              -moz-align-items: center;
              -webkit-align-items: center;
              align-items: center;
          }
          .flex(@w){
            flex: @w;
              -webkit-flex: @w;
              -webkit-box-flex: @w;
              -moz-box-flex: @w;
              box-flex: @w;
              -ms-flex: @w;
          }
         .px2rem(@name, @px){ @{name}: @px / ${rem} * 1rem;}
         .px2remtransfrom(@x,@y){
          transform: translate3d( @x / ${rem} * 1rem,  @y / ${rem} * 1rem, 0);
          -webkit-transform: translate3d( @x / ${rem} * 1rem,  @y / ${rem} * 1rem, 0);
        }`, function (err) {
      if (err) throw err;
      console.log("common.less write success!!");
    });
  });
 

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  var plugins= [
      new webpack.NamedModulesPlugin(),
      new webpack.LoaderOptionsPlugin({
          minimize: true
      })
  ];
  if(!isProd){
    plugins.push(
    new webpack.HotModuleReplacementPlugin()
      );
  }

  var entry = {site1:'./site1/index.js'};
  
  if(!isProd){
    var ip = arguments["1"].host||"localhost";
    var port =  arguments["1"].port;
    var url = ip+":"+port;
    if(ip!=="localhost"){
      url = "http://"+url;
    }
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
        use: [ 'style-loader', 'css-loader', ],
      },
      { 
        test: /\.(png|jpg|jpeg|gif|woff)$/, 
        loader: 'url?limit=4192&name=[path][name].[ext]'
        //exclude
      },
      {
            test: /\.less$/,
            use: [{
                loader: "style-loader" 
            }, {
                loader: "css-loader" 
            }, {
                loader: "less-loader" 
            }]
      }
    ],
  },

  plugins:plugins,
};
}