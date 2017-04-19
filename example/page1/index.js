const {Navigation} = require("../../index").default
Navigation.start({
	root:"delayload",
	pages:{
		index:require("./pages/index"),
		delayload:require("./delayloadpages/delayload")
	},
});


