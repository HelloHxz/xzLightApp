var React = require("react");
var PageView = require("./pageview");
class PageContainer extends React.Component {
  constructor(props) {
    super(props)
  }

 
 

  render() {
  	var route = [];
  	if(this.props.owner){
  		route = this.props.owner.props.pageview.props.leftroute;
  	}
  	var ToPageName = route.shift();
  	var key = this.props.owner.props.pageview.props.pkey+"_"+ToPageName;
  	var pageview = <PageView leftroute={route} pagename={ToPageName} pagemanager={this.props.owner.props.pagemanager} key={key} pkey={key}></PageView>;
    return (<div>{pageview}</div>);
  }
}
module.exports = PageContainer;
