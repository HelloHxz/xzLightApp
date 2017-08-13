import {observable} from 'mobx';

class Store {
    @observable headerPopoverConfig = {};
    @observable listRefreshState = "done";
    @observable messageListData=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
}

export default new Store;

