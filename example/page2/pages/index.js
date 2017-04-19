var React = require("react");
const {XzComponents} = require("../../../index").default

class PageView extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (<div><XzComponents.listview/></div>);
  }
}
module.exports = PageView;
