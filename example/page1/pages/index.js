var React = require("react");
const {XzComponents} = require("../../../index").default



// function loadC(name) {
// 	require.ensure(["../components/button"], function(require) {
// 		alert("s");
// 	});
// }
class PageView extends React.Component {
  constructor(props) {
    super(props)
  }

  clickHandle(){
  	this.props.pagemanager.go("delayload",{x:1});
  }

  render() {
  		
    return (<div><button onClick={this.clickHandle.bind(this)}>跳转</button></div>);
  }
}
module.exports = PageView;
