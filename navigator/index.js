import ReactDOM from 'react-dom';
import React from 'react';
import Navigation from './main';
import ToastManager from './container/toast'
import xz from "../src/components"



export default {
	start(config){
		var toastManager = null;
		for(var key in config.pages){
				if(key.split("_").length>1){
					console.error(key+ " start 方法pages对象页面注册名称不能带有 _ 标示");
				}
		}
		ReactDOM.render(<div className='xz-app-wrapper'>
			<ToastManager ref={(instance)=>{xz.Toast = instance}}/>
			<Navigation 
			config={config}/>
			</div>,
   		 document.getElementById('xz-lightapp-root'));
	},
	PageContainer:require("./container/pageContainer").default

}


