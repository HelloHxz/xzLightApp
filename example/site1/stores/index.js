import {observable, autorun} from 'mobx';

class IndexStore {
	
    @observable searchBarStatus = 'init';// show hide
    @observable searchBarIsOpacity = true;
    @observable ListDataSource = [];
}

export default IndexStore;

