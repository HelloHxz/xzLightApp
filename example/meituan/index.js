import {Navigation} from "../../index"

Navigation.start({
	root:"root/home",
	pages:{
		root:require("./pages/root").default,
		home:require("./pages/home").default,
		orderlist:require("./pages/orderlist").default,
		me:require("./pages/me").default,
	},
});


