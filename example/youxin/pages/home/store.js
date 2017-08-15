import {observable} from 'mobx';
class Store {
    @observable tabSelectedKey = "";
    @observable showKeyBord= false;
    @observable pageisInBohao =false;
    @observable bohaoStatusConfig = {key:"recent",cache:true};
}

export default new Store;

