var React = require("react");
const {Navigation,XzComponents} = require("../../../index").default

class Com extends React.Component {
  constructor(props) {
    super(props)
  	console.log("constructor");
  }

 

  render() {
  	console.log("render");
    return (<div>第二级的内容<Navigation.PageContainer {...this.props} key={this.props.pkey+"container"}  owner={this}/></div>);
  }
}
module.exports = Com;
