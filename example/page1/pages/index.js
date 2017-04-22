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

  clickHandle(params){
    if(params===1){
     this.props.pagemanager.go("delayload");

    }else{
      this.props.pagemanager.go("twolevelroute/one");
    }
  }

  render() {
    return (<div><button onClick={this.clickHandle.bind(this,1)}>跳转</button>
      <button onClick={this.clickHandle.bind(this,2)}>跳转</button></div>);
  }
}
module.exports = PageView;
