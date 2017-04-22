const {Navigation} = require("../../index").default
Navigation.start({
	root:"index",
	pages:{
		index:require("./pages/index"),
		delayload:require("./delayloadpages/delayload"),
		twolevelroute:require("./pages/twolevelroute"),
		threelevelroute:require("./pages/threelevelroute"),
		one:require("./pages/one"),
		two:require("./pages/two")
	},
});


