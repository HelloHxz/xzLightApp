var React = require("react");
const {XzComponents} = require("../../../index").default


class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor :one");
  }

clickHandle(params){
     this.props.pagemanager.go("threelevelroute/twolevelroute/two");
  }

  render() {
    return (<div><button onClick={this.clickHandle.bind(this)}>GoTwo</button></div>);
  }
}
module.exports = PageView;
