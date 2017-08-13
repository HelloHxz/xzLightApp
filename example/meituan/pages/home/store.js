import {observable} from 'mobx';
class Store {
    @observable searchBarStatus = "show";
    @observable searchBarIsOpacity = true;
    @observable dropdownSelectedKey=""
    @observable refreshState="done"
}

export default new Store;

