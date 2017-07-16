import {observable} from 'mobx';
class Store {
    @observable tabSelctedConfig = {key:"friends",cache:true};
    @observable tabContentIsOpen = true;
}

export default Store;

