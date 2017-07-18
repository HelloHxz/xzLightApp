import {Navigation} from "../../index"

Navigation.start({
	root:"home/main",
	pages:{
		home:require("./pages/home").default,
		main:require("./pages/main").default,
		me:require("./pages/me").default,
		friend:require("./pages/friend").default,
		koubei:require("./pages/koubei").default,
		yuebao:require("./pages/yuebao").default,
	},
});


