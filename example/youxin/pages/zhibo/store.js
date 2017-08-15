import {observable} from 'mobx';
import Fetch from '../../../../utils/fetch'


var seed = 0;
class Store {
    @observable statusConfig = {key:"guanzhu",cache:true};
   
    @observable headerPopoverConfig = {};

    @observable guanzhuRefreshState = "done";
    @observable shipinRefreshState = "done";
    @observable tongchengRefreshState = "done";
    @observable hotRefreshState = "done";

    loadData(){
    	Fetch("",{}).then((re)=>{
    		console.log(re);
    	}).catch((er)=>{
    		console.log(er);
    	})
    }

    refreshListData(key){
        setTimeout(()=>{
          this[key+"RefreshState"] = "loading";
        },30);

        setTimeout(()=>{
          seed+=1;
          this[key+"RefreshState"] = "done"+seed;
        },1330);

    }
}

export default new Store;

