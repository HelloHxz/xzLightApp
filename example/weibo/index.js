import {Navigation} from "../../index"

Navigation.start({
	root:"home/weibo",
	pages:{
		home:require("./pages/home").default,
		weibo:require("./pages/weibo").default,
		me:require("./pages/me").default,
		discover:require("./pages/discover").default,
		message:require("./pages/message").default,
	},
});


