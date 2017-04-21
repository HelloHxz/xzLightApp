var React = require("react");
const {Navigation,XzComponents} = require("../../../index").default



// function loadC(name) {
// 	require.ensure(["../components/button"], function(require) {
// 		alert("s");
// 	});
// }
class PageView extends React.Component {
  constructor(props) {
    super(props)
  }

 

  render() {
  		
    return (<div>2ji<Navigation.PageContainer/></div>);
  }
}
module.exports = PageView;
