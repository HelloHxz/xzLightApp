import {observable, autorun} from 'mobx';

class GlobaStore {
    @observable selectedIndex = 0;
}

export default new GlobaStore;

