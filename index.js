import N from './navigator' 
import xz from './src/components' 
import style from './utils/style' 
import './css/main.less';
import React from 'react';

var init = false;
var toast = null;

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
	xz
};