import {observable} from 'mobx';

class Store {
    @observable headerPopoverConfig = {};
    @observable messageListData=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
}

export default new Store;

