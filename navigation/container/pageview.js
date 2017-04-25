var React = require("react");

class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.shouldUpdate = true;
    this.state={
      leftroute:props.leftroute,
      pagename:props.pagename
    };
  }


  componentWillReceiveProps(props){
    this.setState({pagename:props.pagename,leftroute:props.leftroute});
  }

  //  shouldComponentUpdate(){
  //   return this.shouldUpdate;
  // }

 


  render() {
  	var ToPageInstance = this.props.pagemanager.props.config.pages[this.state.pagename];
    if(!ToPageInstance){
       console.error("pages属性中没有引入["+this.state.pagename+"]页面");
    }
    return (<ToPageInstance 
    			pageview={this} 
          pagename={this.state.pagename}
          leftroute = {this.state.leftroute}
    			pagemanager={this.props.pagemanager}
          pkey={this.props.pkey+"_inner_"} 
    			key={this.props.pkey+"_inner"}>
    		</ToPageInstance>);
  }
}
module.exports = PageView;
