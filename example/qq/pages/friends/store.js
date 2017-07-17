import {observable} from 'mobx';
class Store {
    @observable tabSelctedConfig = {key:"friends",cache:true};
    @observable tabContentIsOpen = true;


    @observable friendsListData = [
    	{id:"xx",name:"特别关心",data:[
    		{name:"张三",avatar:"xxx",id:"xx"},
    		{name:"里斯本",avatar:"xxx",id:"xx"},
    		{name:"JASON hu",avatar:"xxx",id:"xx"}
    	]},
    	{id:"xx",name:"好友",data:[
    		{name:"周杰伦",avatar:"xxx",id:"xx"},
    		{name:"刘德华",avatar:"xxx",id:"xx"},
    		{name:"张学友",avatar:"xxx",id:"xx"}
    	]},
    	{id:"xx",name:"亲人",data:[
    		{name:"张学友",avatar:"xxx",id:"xx"},
    		{name:"郭富城",avatar:"xxx",id:"xx"},
    		{name:"林志玲",avatar:"xxx",id:"xx"}
    	]},
        {id:"xx",name:"死党",data:[
            {name:"普京",avatar:"xxx",id:"xx"},
            {name:"川普",avatar:"xxx",id:"xx"},
            {name:"test",avatar:"xxx",id:"xx"}
        ]},
        {id:"xx",name:"陌生人",data:[
            {name:"你是谁",avatar:"xxx",id:"xx"},
            {name:"没有名字",avatar:"xxx",id:"xx"},
            {name:"哈哈",avatar:"xxx",id:"xx"}
        ]},
        {id:"xx",name:"其他",data:[
            {name:"阿拉伯",avatar:"xxx",id:"xx"},
            {name:"三大队",avatar:"xxx",id:"xx"},
            {name:"阿斯顿",avatar:"xxx",id:"xx"}
        ]}

    ];
}

export default Store;

