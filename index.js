import N from './navigator' 
import xz from './src/components' 
import style from './utils/style' 
import shallowEqual from './utils/shallowEqual' 
import './css/main.less';
import React from 'react';
import fetch from  './utils/fetch' 

var init = false;
var Navigation = {
		start(config){
			style._shipei();
			N.start(config);
			
		},
		PageContainer:N.PageContainer
	};
export {
	style,
	Navigation,
	xz,
	shallowEqual,
	fetch
};