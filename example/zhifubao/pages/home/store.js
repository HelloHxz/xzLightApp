import {observable} from 'mobx';
class Store {
    @observable tabSelectedKey = "";
    @observable mainStatusOpen = true;
}

export default new Store;

