const {Navigation} = require("../../index").default
Navigation.start({
	root:"index",
	pages:{
		index:require("./pages/index"),
		delayload:require("./delayloadpages/delayload")
	},
});


