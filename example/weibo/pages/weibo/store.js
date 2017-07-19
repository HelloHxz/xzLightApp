import {observable} from 'mobx';
class Store {
    @observable statusConfig = {key:"guanzhu",cache:true};
}

export default new Store;

