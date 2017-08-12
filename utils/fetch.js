require('es6-promise').polyfill();
require('isomorphic-fetch');


var oldFetchfn = fetch; //拦截原始的fetch方法

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw {
  	msg:response.statusText,
  	status:response.status,
  	response:response
  };
}

var NewFetch = function(url, opts){//定义新的fetch方法，封装原有的fetch方法
	opts = opts||{};
	if(["include","same-origin","omit"].indexOf(opts.credentials)<0){
		opts.credentials = "include";
	}
	if(!opts["Content-Type"]){
		opts["Content-Type"] = 'application/json';
	}
    var fetchPromise = oldFetchfn(url, opts);
    var timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
           reject({
		  	msg:'timeout',
		  	status:408,
		  	response:null
		  })
        }, opts.timeout||8000)
    });
    return Promise.race([fetchPromise, timeoutPromise]).then(checkStatus);
}



export default (url,config)=>{
	return NewFetch(url, config);
}