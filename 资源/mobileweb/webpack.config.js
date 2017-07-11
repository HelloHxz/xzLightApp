const path = require("path");

module.exports = {

  devtool: 'inline-source-map',
  entry: {
    main:['./index.web.js']
  },
  output: {
    path:__dirname,
    filename: "[name].bundle.js",
  },
  resolve: {
    root: [ process.cwd() + '/node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader!jsx-loader?harmony'
    },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      { test: /\.css$/, loader: 'style!css' }]
  }
};
