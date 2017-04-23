import Navigation from './navigation' 
import XzComponents from './src/components' 
import './css/main.css';

export default {
	"pagecontainer":"xxxxxxx",
	"Navigation":{
		start(config){
			Navigation.start(config,(routeStack,action)=>{
				var pages = [];
			    for(var i=0,j=routeStack.length;i<j;i++){
			        pages.push(routeStack[i].page);
			    }
			    console.log(action);
			    return pages;
			})
		},
		PageContainer:Navigation.PageContainer
	},
	"XzComponents":XzComponents

};