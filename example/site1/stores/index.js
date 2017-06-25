import {observable, autorun} from 'mobx';

class IndexStore {
	
    @observable searchBarStatus = 'init';// show hide
    @observable searchBarIsOpacity = true;
    @observable mainLoadingStatus = "loading";
    @observable ListDataSource = [{},{},{},{},{},{},{},{},{},{},{},{},{}];
}

export default IndexStore;

