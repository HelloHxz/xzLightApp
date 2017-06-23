import {observable, autorun} from 'mobx';

class DetailStore {
    @observable segmentSelectedIndex = 0;
    @observable verticalSwiperSelectedIndex = 0;
}

export default DetailStore;

