import Navigation from './navigation' 
import XzComponents from './src/components' 
import './css/main.css';
var React = require("react");

function NoAnimation(routeStack,pages){
	for(var i=0,j=routeStack.length;i<j;i++){
		var _key = routeStack[i]._key+"_wrapper";
		var instance = routeStack[i].page;
		if(i===j-1){
			pages.push(<div className='xz-page-route-wrapper' key={_key}>{instance}</div>);
	    }else{
	    	pages.push(<div className='xz-page-route-wrapper'  style={{left:"-120%"}} key={_key}>{instance}</div>);

	    }
	}
}

function GoPreOrNext(lastClass,preClass,len,routeStack,pages){
	for(var i=0;i<len;i++){
		var _key = routeStack[i]._key+"_wrapper";
		var instance = routeStack[i].page;
		if(i===len-1){
    		pages.push(<div className={lastClass} key={_key}>{instance}</div>);
		}else if(i===len-2){
			pages.push(<div className={preClass} key={_key}>{instance}</div>);
		}else{
			pages.push(<div className='xz-page-route-wrapper' key={_key} style={{left:"-120%"}}>{instance}</div>);
		}
	}
}

export default {
	"Navigation":{
		start(config){
			Navigation.start(config,(routeStack,action,animationAction,isReplaceGo)=>{
				var pages = [];
				var len = routeStack.length;
			    console.log(animationAction+"	"+"	"+action+"	"+len);

			   	if(len>1){
			   		if(animationAction==='前进'){
			   			GoPreOrNext('xz-page-route-wrapper right-in','xz-page-route-wrapper left-out',len,routeStack,pages,isReplaceGo);
			   		}else if(animationAction==="后退删除最后"){
				   		GoPreOrNext('xz-page-route-wrapper right-out','xz-page-route-wrapper left-in',len,routeStack,pages);
						routeStack.splice(routeStack.length-1,1)
			   		}else{
			   			NoAnimation(routeStack,pages);
			   		}

			   	}else{
			   		NoAnimation(routeStack,pages);
			   	}
			    
			    return pages;
			})
		},
		PageContainer:Navigation.PageContainer
	},
	"XzComponents":XzComponents

};