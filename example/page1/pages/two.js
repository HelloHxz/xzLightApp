var React = require("react");
const {XzComponents} = require("../../../index").default


class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor: two");
  }

clickHandle(params){
     this.props.pagemanager.replaceGo("one");
  }

  render() {
    return (<div>zheshiw2<button onClick={this.clickHandle.bind(this)}>ReplaceGo</button></div>);
  }
}
module.exports = PageView;
