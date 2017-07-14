import {observable} from 'mobx';
class Store {
    @observable tabSelectedKey = "";
    @observable showPageConfig = {};
}

export default new Store;

