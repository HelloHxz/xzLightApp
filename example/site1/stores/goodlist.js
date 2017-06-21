import {observable, autorun} from 'mobx';

class GoodListStore {
	
    @observable topAreaStatus = 'max';// or min
    @observable conditionSelectedKey ="";
}

export default GoodListStore;

