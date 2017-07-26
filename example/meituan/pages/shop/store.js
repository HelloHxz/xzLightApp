import {observable} from 'mobx';
class Store {
    @observable segmentSelectedKey = "diancai";
    @observable UIisOpen = true;

    @observable diancaiData = [{
    	name:"专场",
    	id:"xx",
    	data:[{name:"专场套餐"},{name:"专场套餐"},{name:"专场套餐"},{name:"专场套餐"}]
    },{
    	name:"折扣",
    	id:"xx",
    	data:[{name:"折扣套餐"},{name:"折扣套餐"},{name:"折扣套餐"},{name:"折扣套餐"}]
    },{
    	name:"热销",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"单人点餐",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"双人点餐",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"基友套餐",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"三人点餐",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"热销",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"米饭",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"折扣单人",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"折扣双人",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    },{
    	name:"激情无限",
    	id:"xx",
    	data:[{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"},{name:"热销套餐"}]
    }];
}

export default new Store;

