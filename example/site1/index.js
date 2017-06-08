import {Navigation} from "../../index"


Navigation.start({
	root:"index",
	pages:{
		index:require("./pages/index").default,
		tabbarpage:require("./pages/tabbarpage").default,
		twolevelroute:require("./pages/twolevelroute").default,
		dpdcdemo:require("./pages/dpdcdemo").default,
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
		  		callback(require("./pages/lazyload").default);
		  	},"lazyload");
		}
	},
	events:{
		init:function(pageManager){

		}
	}
});


