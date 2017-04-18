import ReactDOM from 'react-dom';
var React = require("react");
var Navigation = require("./main");

export default {
	start(){
		ReactDOM.render(<Navigation/>,
   		 document.getElementById('root'));
	}
}