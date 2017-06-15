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
			var startY = 0;
			document.addEventListener('touchstart',function (event) {  
				console.log();
				startY = event.touches[0].pageY;
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
	            startY = 0;
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