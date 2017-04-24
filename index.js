import Navigation from './navigation' 
import XzComponents from './src/components' 
import './css/main.css';
var React = require("react");

export default {
	"pagecontainer":"xxxxxxx",
	"Navigation":{
		start(config){
			Navigation.start(config,(routeStack,action,animationAction)=>{
				
				var pages = [];
				var len = routeStack.length;
			    console.log(animationAction+"	"+"	"+action+"	"+len);

			   	if(len>1){
			   		if(animationAction==='前进'){
						for(var i=0;i<len;i++){
							var _key = routeStack[i]._key+"_wrapper";
							var instance = routeStack[i].page;
							if(i===len-1){
				        		pages.push(<div className='xz-page-route-wrapper right-in' key={_key}>{instance}</div>);
							}else if(i===len-2){
								pages.push(<div className='xz-page-route-wrapper left-out' key={_key}>{instance}</div>);
							}else{
								pages.push(<div className='xz-page-route-wrapper' key={_key} style={{left:"-120%"}}>{instance}</div>);
							}
				   		}
			   		}else if(animationAction==="后退删除最后"){
			   			for(var i=0;i<len;i++){
							var _key = routeStack[i]._key+"_wrapper";
							var instance = routeStack[i].page;
							if(i===len-1){
				        		pages.push(<div className='xz-page-route-wrapper right-out' key={_key}>{instance}</div>);
							}else if(i===len-2){
								pages.push(<div className='xz-page-route-wrapper left-in' key={_key}>{instance}</div>);
							}else{
								pages.push(<div className='xz-page-route-wrapper' key={_key} style={{left:"-120%"}}>{instance}</div>);
							}
				   		}
						routeStack.splice(routeStack.length-1,1)
			   		}else{
			   			for(var i=0;i<len;i++){
				   			var _key = routeStack[i]._key+"_wrapper";
							var instance = routeStack[i].page;
							if(i===len-1){
				        		pages.push(<div className='xz-page-route-wrapper' key={_key}>{instance}</div>);
					        }else{
					        	pages.push(<div className='xz-page-route-wrapper'  style={{left:"-120%"}} key={_key}>{instance}</div>);

					        }
				   		}
			   		}

			   	}else{
			   		for(var i=0;i<len;i++){
			   			var _key = routeStack[i]._key+"_wrapper";
						var instance = routeStack[i].page;
						if(i===len-1){
			        		pages.push(<div className='xz-page-route-wrapper' key={_key}>{instance}</div>);
				        }else{
				        	pages.push(<div className='xz-page-route-wrapper'  style={{left:"-120%"}} key={_key}>{instance}</div>);

				        }
			   		}
			   	}
			    
			    return pages;
			})
		},
		PageContainer:Navigation.PageContainer
	},
	"XzComponents":XzComponents

};