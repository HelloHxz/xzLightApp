import {observable} from 'mobx';
class Store {
    @observable searchBarStatus = "show";
    @observable searchBarIsOpacity = true;
}

export default new Store;

