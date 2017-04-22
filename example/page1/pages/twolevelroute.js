var React = require("react");
const {Navigation,XzComponents} = require("../../../index").default

class Com extends React.Component {
  constructor(props) {
    super(props)
  	console.log("constructor");
  }

 

  render() {
  	console.log("render");
    return (<div>test<Navigation.PageContainer owner={this}/></div>);
  }
}
module.exports = Com;
