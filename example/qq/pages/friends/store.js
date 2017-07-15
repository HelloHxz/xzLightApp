import {observable} from 'mobx';
class Store {
    @observable tabSelctedConfig = {key:"friends",cache:true};
}

export default Store;

