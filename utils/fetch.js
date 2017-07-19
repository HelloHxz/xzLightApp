require('es6-promise').polyfill();
require('isomorphic-fetch');

/*
	
*/
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