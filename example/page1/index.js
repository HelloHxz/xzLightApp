import {Navigation} from "../../index"

Navigation.start({
	root:"index",
	pages:{
		index:require("./pages/index").default,
		delayload:require("./delayloadpages/delayload").default,
		twolevelroute:require("./pages/twolevelroute").default,
		threelevelroute:require("./pages/threelevelroute").default,
		one:require("./pages/one").default,
		two:require("./pages/two").default
	},
});


