var React = require("react");

class PageView extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
  	var ToPageInstance = this.props.pagemanager.props.config.pages[this.props.pagename];
    if(!ToPageInstance){
       console.error("pages属性中没有引入["+ToPageName+"]页面");
    }
    return (<ToPageInstance 
    			pageinstance={this} 
    			pagemanager={this.props.pagemanager} 
    			key={this.props.pkey+"_inner"}>
    		</ToPageInstance>);
  }
}
module.exports = PageView;
