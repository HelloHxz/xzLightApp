import {observable} from 'mobx';
import Fetch from '../../../../utils/fetch'

class Store {
    @observable statusConfig = {key:"guanzhu",cache:true};
    @observable dropDownGroupSelectedKey = null;
    @observable headerPopoverConfig = {};

    loadData(){
    	Fetch("",{}).then((re)=>{
    		console.log(re);
    	}).catch((er)=>{
    		console.log(er);
    	})
    }
}

export default new Store;

