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
    console.log("constructor");
  }

  clickHandle(params){
    if(params===1){
     this.props.pagemanager.go("delayload");

    }else if(params===2){
      this.props.pagemanager.go("threelevelroute/twolevelroute/one");
    }else if(params===3){
      this.props.pagemanager.go("twolevelroute/one");
    }else{
       this.props.pagemanager.go("index",{x:111});
    }
  }

  render() {
    return (<div><button onClick={this.clickHandle.bind(this,1)}>跳转</button>
      <button onClick={this.clickHandle.bind(this,2)}>去三级</button>
       <button onClick={this.clickHandle.bind(this,3)}>去二级</button>
       <button onClick={this.clickHandle.bind(this,4)}>GoSame</button></div>);
  }
}
module.exports = PageView;
