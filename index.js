import Navigation from './navigation' 
import XzComponents from './src/components' 
import style from './utils/style' 
import './css/main.less';
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

function shipei(){

	var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');

dpr = window.devicePixelRatio || 1;
rem = docEl.clientWidth * dpr / 10;
scale = 1 / dpr;


// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem=function(v) {
    v = parseFloat(v);
    return v / rem;
};

window.dpr = dpr;
window.rem = rem;
}

export default {
	"style":style,
	"Navigation":{
		start(config){
			shipei();
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
						routeStack.pop();
					
			   		}else{
			   			NoAnimation(routeStack,pages);
			   		}

			   	}else{
			   		NoAnimation(routeStack,pages);
			   	}
			   	//因为动画 页面没有清楚干净 
			   	if(animationAction!=='前进'){


		   			


					setTimeout(()=>{
				   		var lastPages = [];
				   		NoAnimation(routeStack,lastPages);
				   		manager.setState({pages:lastPages});
				   	},250);
			   	}

			   	setTimeout(()=>{
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
			   	},300);
			    return pages;
			})
		},
		PageContainer:Navigation.PageContainer
	},
	"XzComponents":XzComponents

};