require('es6-promise').polyfill();
require('isomorphic-fetch');


var oldFetchfn = fetch; //拦截原始的fetch方法
var NewFetch = function(url, opts){//定义新的fetch方法，封装原有的fetch方法
	opts = opts||{};
    var fetchPromise = oldFetchfn(url, opts);
    var timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
             reject(new Error("fetch timeout"))
        }, opts.timeout||8000)
    });
    return Promise.race([fetchPromise, timeoutPromise])
}

export default (url,config)=>{



	// var header = {
	//     'Content-Type': 'application/json'
	// };
	// var cheader = config.header||{};
	// for(var key in cheader){
	// 	header[key] = cheader[key];
	// }
	// var method = config.method||"GET";
	// var params = {
	//   method: method,
	//   headers: headers,
	//   body: JSON.stringify({
	//     name: 'Hubot',
	//     login: 'hubot',
	//   })
	// };
	return fetch(url, config);
}