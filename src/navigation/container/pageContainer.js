var React = require("react");

class PageContainer extends React.Component {
  constructor(props) {
    super(props)
  }

 
  clickMethod(){
  	this.props.owner.props.pagemanager.go("twolevelroute/two");
  }

  render() {
  	var route = [];
  	if(this.props.owner){
  		route = this.props.owner.props.pageview.props.leftroute;
  	}
  	
    return (<div><button onClick={this.clickMethod.bind(this)}>test</button>{route}</div>);
  }
}
module.exports = PageContainer;
