import {Navigation} from "../../index"


Navigation.start({
	root:"index",
	gobal:"xxxx",//可用于登录 重登录 错误验证  全局loading
	pages:{
		index:require("./pages/index").default,
		tabbarpage:require("./pages/tabbarpage").default,
		twolevelroute:require("./pages/twolevelroute").default,
		threelevelroute:require("./pages/threelevelroute").default,
		segmentdemo:require("./pages/segmentdemo").default,
		one:require("./pages/one").default,
		two:function(callback) {
			require.ensure([], function(require) {
		  		callback(require("./pages/two").default);
		  	},"two");
		},
		lazyload:function(callback) {
			require.ensure([], function(require) {
				console.log(require("./stores/index").default);
		  		callback(require("./pages/lazyload").default);
		  	},"lazyload");
		}
	},
	events:{
		init:function(pageManager){

		},
		beforeRender:function(pageManager){
			if(1!==1){
				pageManager.renderPage("gobal",{});
				return false;
			}
			return true;
		}
	}
});


