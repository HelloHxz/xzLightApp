import {Navigation} from "../../index"

Navigation.start({
	root:"index",
	pages:{
		index:require("./pages/index").default,
		twolevelroute:require("./pages/twolevelroute").default,
		threelevelroute:require("./pages/threelevelroute").default,
		one:require("./pages/one").default,
		// two:require("./pages/two").default,
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
});


