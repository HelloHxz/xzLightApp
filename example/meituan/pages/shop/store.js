import {observable} from 'mobx';
class Store {
    @observable segmentSelectedKey = "diancai";
    @observable UIisOpen = true;
    @observable selectedLeftID = null;


    loadData(){
        var arr = ["专场","折扣","热销热销热热销热销热销销","单人点餐","双人点餐","基友套餐","三人点餐","米饭","折扣单人","折扣双人"
        ,"饮料","进店必买","粉","面","精美小炒","免费"
        ,"激情无限"];
        var data = [];
        for(var i=0,j=arr.length;i<j;i++){
            var id = i;
            if(this.selectedLeftID===null){
                this.selectedLeftID = id.toString();
            }
            var name = arr[i];
            var rowdata = {
                name:name,
                id:i,
            };
            var children = [] ;
            for(var n=0;n<6;n++){
                children.push({
                    name:name+"n",
                    id:i+"_"+n,
                });
            }
            rowdata.data = children;
            data.push(rowdata);
        }

        this.diancaiData = data;

    }

    @observable diancaiData = [];
}

export default Store;

