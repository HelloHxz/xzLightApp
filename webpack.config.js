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
    fs.writeFile(path.join(__dirname, '/node_modules/xz-lightapp/css/shipei.less'), ".px2rem(@name, @px){ @{name}: @px / "+rem+" * 1rem;}", function (err) {
      if (err) throw err;
      console.log("shipei.less write success!!");
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
    entry.dev_patch = 'react-hot-loader/patch';
    entry.dev_client = 'webpack-dev-server/client?http://localhost:8080';
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