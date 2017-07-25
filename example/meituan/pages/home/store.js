import {observable} from 'mobx';
class Store {
    @observable searchBarStatus = "show";
    @observable searchBarIsOpacity = true;
    @observable dropdownSelectedKey=""
}

export default new Store;

