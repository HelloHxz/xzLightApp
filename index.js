import Navigation from './navigation' 
import XzComponents from './src/components' 
import style from './utils/style' 
import './css/main.css';
var React = require("react");

function NoAnimation(routeStack,pages){
	for(var i=0,j=routeStack.length;i<j;i++){
		var _key = routeStack[i]._key+"_wrapper";
		var instance = routeStack[i].page;

		if(i===j-1){
			pages.push(<div className='xz-page-route-wrapper' key={_key}>{instance}</div>);
	    }else{
	    	pages.push(<div className='xz-page-route-wrapper'  style={{left:"-120%",visibility:"hidden"}} key={_key}>{instance}</div>);

	    }
	}
}

function GoPreOrNext(lastClass,preClass,len,routeStack,pages){
	for(var i=0;i<len;i++){
		var _key = routeStack[i]._key+"_wrapper";
		var instance = routeStack[i].page;
		//isDelete
		
		if(i===len-1){
    		pages.push(<div className={lastClass} key={_key}>{instance}</div>);
		}else if(i===len-2){
			pages.push(<div className={preClass} key={_key}>{instance}</div>);
		}else{
			pages.push(<div className='xz-page-route-wrapper' key={_key} style={{left:"-120%",visibility:"hidden"}}>{instance}</div>);
		}
	}
}

export default {
	"style":style,
	"Navigation":{
		start(config){
			for(var key in config.pages){
				if(key.split("_").length>1){
					console.error(key+ " start 方法pages对象页面注册名称不能带有 _ 标示");
				}
			}
			Navigation.start(config,(manager,action,animationAction,isReplaceGo)=>{
				var pages = [];
				var routeStack = manager.routeStack;
				var len = routeStack.length;
			    console.log(animationAction+"	"+"	"+action +"	"+len);

			   	if(len>1){
			   		if(animationAction==='前进'){
			   			GoPreOrNext('xz-page-route-wrapper right-in','xz-page-route-wrapper left-out',len,routeStack,pages,isReplaceGo);
			   		}else if(animationAction==="后退删除最后"){
				   		GoPreOrNext('xz-page-route-wrapper right-out','xz-page-route-wrapper left-in',len,routeStack,pages);
						console.log("删除");
						routeStack.pop();

						var seedObj = manager.getUrlSeedObj();
						var r = seedObj.__r;
						if(r){
							r = parseInt(r);

							for(var i=routeStack.length-1;i>=0;i--){

								var rr = routeStack[i].r;
								if(rr&&routeStack[i].isDelete){
									rr = parseInt(rr);
									if(rr>r){
										routeStack.splice(i,1); 
									}
								}
							}
						}

						

			   		}else{
			   			NoAnimation(routeStack,pages);
			   		}

			   	}else{
			   		NoAnimation(routeStack,pages);
			   	}

			   	

			    console.log(routeStack.length);
			    return pages;
			})
		},
		PageContainer:Navigation.PageContainer
	},
	"XzComponents":XzComponents

};