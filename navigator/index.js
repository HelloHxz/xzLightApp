import ReactDOM from 'react-dom';
import React from 'react';
import Navigation from './main';


export default {
	start(config){
		for(var key in config.pages){
				if(key.split("_").length>1){
					console.error(key+ " start 方法pages对象页面注册名称不能带有 _ 标示");
				}
		}
		ReactDOM.render(<div className='xz-app-wrapper'>
			<Navigation 
			config={config}/></div>,
   		 document.getElementById('xz-lightapp-root'));
	},
	PageContainer:require("./container/pageContainer").default

}


