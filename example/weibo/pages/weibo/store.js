import {observable} from 'mobx';
class Store {
    @observable statusConfig = {key:"guanzhu",cache:true};
    @observable dropDownGroupSelectedKey = null;
}

export default new Store;

