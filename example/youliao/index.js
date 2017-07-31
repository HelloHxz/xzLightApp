import {Navigation} from "../../index"

Navigation.start({
	root:"root/home",
	pages:{
		home:require("./pages/home").default,
		root:require("./pages/root").default,
		me:require("./pages/me").default,
		discover:require("./pages/discover").default,
		message:require("./pages/message").default,
	},
});


