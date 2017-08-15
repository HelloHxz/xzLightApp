import {Navigation} from "../../index"

Navigation.start({
	root:"home/zhibo",
	pages:{
		home:require("./pages/home").default,
		zhibo:require("./pages/zhibo").default,
		me:require("./pages/me").default,
		bohao:require("./pages/bohao").default,
	},
});


