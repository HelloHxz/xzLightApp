import {observable} from 'mobx';
class Store {
    @observable tabSelctedConfig = {key:"friends",cache:true};
    @observable tabContentIsOpen = true;


    @observable friendsListData = [
    	{id:"xx",name:"hhxxx",data:[
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"}
    	]},
    	{id:"xx",name:"hxxx",data:[
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"}
    	]},
    	{id:"xx",name:"hhxxx",data:[
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"}
    	]}

    ];
}

export default Store;

