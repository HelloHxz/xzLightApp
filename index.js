import N from './navigation' 
import XzComponents from './src/components' 
import style from './utils/style' 
import './css/main.less';
import React from 'react';


var Navigation = {
		start(config){
			style._shipei();
			N.start(config)
		},
		PageContainer:N.PageContainer
	};
export {
	style,
	Navigation,
	XzComponents

};