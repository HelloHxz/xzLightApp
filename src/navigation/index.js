import ReactDOM from 'react-dom';
var React = require("react");

var Navigation = require("./main");
import '../../css/main.css';

// function loadC(name) {
// 	require.ensure(["../components/button"], function(require) {
// 		alert("s");
// 	});
// }

export default {
	start(config){
		ReactDOM.render(<Navigation config={config}/>,
   		 document.getElementById('xz-lightapp-root'));
	}
}


