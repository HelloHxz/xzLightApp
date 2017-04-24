var React = require("react");
const {XzComponents} = require("../../../index").default



class PageView extends React.Component {
  constructor(props) {
    super(props)
  }

  clickHandle(){
  	this.props.pagemanager.replaceGo("two");
  }

  render() {
  		
    return (<div>分包加载...<button onClick={this.clickHandle.bind(this)}>RepacelGoTo</button></div>);
  }
}
module.exports = PageView;
