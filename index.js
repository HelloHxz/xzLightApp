import N from './navigation' 
import xz from './src/components' 
import style from './utils/style' 
import shallowEqual from './utils/shallowEqual' 
import './css/main.less';
import React from 'react';

var init = false;
var Navigation = {
		start(config){
			style._shipei();
			N.start(config);
			document.addEventListener('touchstart',function (event) {  
	            if(event.touches.length>1){  
	                event.preventDefault();  
	            }  
	        })  
	        var lastTouchEnd=0;  
	        document.addEventListener('touchend',function (event) {  
	            var now=(new Date()).getTime();  
	            if(now-lastTouchEnd<=300){  
	                event.preventDefault();  
	            }  
	            lastTouchEnd=now;  
	        },false)  
		},
		PageContainer:N.PageContainer
	};
export {
	style,
	Navigation,
	xz,
	shallowEqual

};