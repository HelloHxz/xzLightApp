import {Navigation} from "../../index"


Navigation.start({
	root:"index",
	pages:{
		index:require("./pages/index").default,
		 tabbarpage:require("./pages/tabbarpage").default,
		twolevelroute:require("./pages/twolevelroute").default,
		search:require("./pages/searchpage").default,
		slidepage:require("./pages/slidepage").default,
		dpdcdemo:require("./pages/dpdcdemo").default,
		goodlist:require("./pages/goodlist").default,
		sticky:require("./pages/sticky").default,
		drawlayoutdemo:require("./pages/drawlayoutdemo").default,
		threelevelroute:require("./pages/threelevelroute").default,
		segmentdemo:require("./pages/segmentdemo").default,
		verticalsegment:require("./pages/verticalsegment").default,
		horizontalsegment:require("./pages/horizontalsegment").default,
		segmentdemo:require("./pages/segmentdemo").default,
		one:require("./pages/one").default,
		detail:require("./pages/detail").default,
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




