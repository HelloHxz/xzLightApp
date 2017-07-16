import {observable} from 'mobx';
class Store {
    @observable tabSelctedConfig = {key:"friends",cache:true};
    @observable tabContentIsOpen = true;


    @observable friendsListData = [
    	{id:"xx",name:"xxx",data:[
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"}
    	]},
    	{id:"xx",name:"xxx",data:[
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"}
    	]},
    	{id:"xx",name:"xxx",data:[
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"},
    		{name:"xxxx",avatar:"xxx",id:"xx"}
    	]}

    ];
}

export default Store;

