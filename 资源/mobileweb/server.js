/*eslint-disable no-console */
var express = require('express')
// var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config');

var testConfig = require("./app_config");




var app = express()

var fs = require('fs')
var path = require('path')

// fs.readdirSync(__dirname).forEach(function(file) {
// 	if (fs.statSync(path.join(__dirname, file)).isDirectory())
// 		app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
// })



app.use(webpackDevMiddleware(webpack(WebpackConfig), {
	publicPath: '/__builder__/',
	stats: {
		colors: true
	}
}))


app.get('/test', function(req, res, next) {
    res.contentType('json');//返回的数据类型
		var data = {data:[{name:"asdasd",price:12.9,id:1111},
		{name:"asdasd",id:1111,price:12.9,imageurl:"http://pic1.sc.chinaz.com/Files/pic/pic9/201505/apic11444_s.jpg"},
		{name:"asdasd",id:1111,price:12.9,imageurl:"http://pics.sc.chinaz.com/files/pic/pic9/201603/apic19605.jpg"},{name:"asdasd",price:12.9,id:1111},{name:"asdasd",id:1111,price:12.9},{name:"asdasd",id:1111,price:12.9},{name:"asdasd",id:1111,price:12.9},{name:"asdasd",id:1111,price:12.9}]};
    res.send(data);//给客户端返回一个json格式的数据
    res.end();
});


app.use(express.static(__dirname));




app.listen(8888, function() {
	console.log("====================");
	console.log('http://localhost:8888/index.html, Ctrl+C to stop');
	console.log("====================");
})
