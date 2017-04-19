import ReactDOM from 'react-dom';
var React = require("react");

var Navigation = require("./main");

function loadC(name) {
	require.ensure(["../components/button"], function(require) {
		alert("s");
	});
}

export default {
	start(){
		ReactDOM.render(<Navigation/>,
   		 document.getElementById('xz-lightapp-root'));
	}
}


