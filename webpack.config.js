const path = require('path');
const webpack = require('webpack');





module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
const isProd = nodeEnv === 'production';

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
    // the output bundle

    path: path.resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: isProd ? 'hidden-source-map' : 'eval',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new webpack.NamedModulesPlugin(),
    
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
  ],
};
}