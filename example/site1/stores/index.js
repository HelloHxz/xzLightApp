import {observable, autorun} from 'mobx';
import Fetch from '../../../utils/fetch' 
class IndexStore {
	
    @observable searchBarStatus = 'init';// show hide
    @observable searchBarIsOpacity = true;
    @observable mainLoadingStatus = "loading";
    @observable listLoadingStatus = "loading";
    @observable drawLayoutConfig = {};
    @observable isShowSelector =false;
    @observable showDatePicer =false;
    @observable pickerSelectedIndexs =[0,0,0];
    @observable pickerSelectedValues = ["USA","x11xx","s"];

    

    @observable ListDataSource = [{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
    isInLoading = false;

    loadMoreData(){
    	if(this.isInLoading){
    		return;
    	}
    	this.isInLoading = true;
        Fetch('./getJSON',{timeout:10000})
        .then((res)=>{return res.json()})
        .then((data)=>{
            this.ListDataSource = this.ListDataSource.concat([{},{},{},{},{}]);
            this.isInLoading = false;
        }).catch((e)=>{
            this.isInLoading = false;
        });

    }
}

export default IndexStore;

