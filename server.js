var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config');

console.log(WebpackConfig);

var app = express()

var fs = require('fs')
var path = require('path')



app.use(webpackDevMiddleware(webpack(WebpackConfig), {
	stats: {
		colors: true
	}
}))





app.listen(8080, function() {
	console.log("====================");
	console.log('http://localhost:8888/index.html, Ctrl+C to stop');
	console.log("====================");
})
