var React = require("react");
const {XzComponents} = require("../../../index").default


class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor :one");
  }
    onResume(){
    // alert("one");
  }

clickHandle(params){
     this.props.pagemanager.go("threelevelroute/twolevelroute/two");
  }
  testClick(){
  	this.props.pagemanager.go("twolevelroute/one_a",{test:"1"});
  }

  render() {
    return (<div>
    	{this.props.params.test||"没有"}
    	<button onClick={this.testClick.bind(this)}>GotoSame</button>
    	<button onClick={this.clickHandle.bind(this)}>GoTwo</button></div>);
  }
}
module.exports = PageView;
