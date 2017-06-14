import {observable, autorun} from 'mobx';

class IndexStore {
    @observable path = "xxx";
    @observable searchBarStatus = 'init';// show hide
}

export default IndexStore;

