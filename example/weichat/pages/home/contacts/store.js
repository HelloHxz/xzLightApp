import {observable} from 'mobx';
class Store {
    @observable listData = [];
    @observable stickyKey = "A";

    loadData(){
    	var arr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    	var data = [];
    	for(var i=0,j=arr.length;i<j;i++){
    		var key = arr[i];
    		var childdata = [];
    		for(var n=0;n<10;n++){
    			childdata.push({
    				name:key+"xxx",
    				icon:"xx"
    			});
    		}
    		data.push({
    			name:key,
    			data:childdata
    		});
    	}
    	this.listData = data;
    }
}

export default new Store;

