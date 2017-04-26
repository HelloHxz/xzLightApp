export default {

	getObjLen(param){
		param = param||{};
		var len = 0;
		for(var key in param){
			len+=1;
		}
		return len;
	}
}