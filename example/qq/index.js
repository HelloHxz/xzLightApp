import {Navigation} from "../../index"

Navigation.start({
	root:"home/message",
	pages:{
		home:require("./pages/home").default,
		message:require("./pages/message").default,
		friends:require("./pages/friends").default,
		blogs:require("./pages/blogs").default,
		wallet:require("./pages/wallet").default
	},
});


