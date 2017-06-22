import {observable, autorun} from 'mobx';

class GoodListStore {
	
    @observable topAreaStatus = 'max';// or min
    @observable conditionSelectedKey ="";
    @observable filterSelectedKey ="";
}

export default GoodListStore;

