import ReactDOM from 'react-dom';
var React = require("react");

var Navigation = require("./main");


export default {
	start(config,pagelayout){
		ReactDOM.render(<Navigation 
			pagelayout={pagelayout}
			config={config}/>,
   		 document.getElementById('xz-lightapp-root'));
	},
	PageContainer:require("./container/pageContainer")

}


