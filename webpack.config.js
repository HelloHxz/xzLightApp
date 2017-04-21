const path = require('path');
const webpack = require('webpack');





module.exports = function (env) {
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

  var entry = ['./page1/index.js'];
  if(!isProd){
    entry = entry.concat([
        'react-hot-loader/patch',

        'webpack-dev-server/client?http://localhost:8080',

        'webpack/hot/only-dev-server',
      ]);
  }
return {

  context: path.resolve(__dirname, 'example'),

  entry:entry,
  output: {
    filename: 'bundle.js',
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