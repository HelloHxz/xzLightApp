var React = require("react");

class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.shouldUpdate = true;
    this.showPages = [];
    this.state={
      leftroute:props.leftroute,
      pagename:props.pagename
    };
  }


  componentWillReceiveProps(props){
    this.setState({pagename:props.pagename,leftroute:props.leftroute});
  }

  componentWillUnmount(){
    console.log(this.props.pkey+"     unmount>>>");

    if(this.props.pagemanager.pageInstanceDict[this.props.pkey]){
      delete this.props.pagemanager.pageInstanceDict[this.props.pkey];
    }
  }

  componentDidMount(){
    console.log(this.props.pkey+"     didmount>>>");
    this.props.pagemanager.pageInstanceDict[this.props.pkey] = {
      instance:this.pageInstance,
      isInit:true
    };
  }

  showPage(){
  }


  render() {
    var realpagename = this.state.pagename.split("_")[0];
  	var ToPageInstance = this.props.pagemanager.props.config.pages[realpagename];
    if(!ToPageInstance){
       console.error("pages属性中没有引入["+realpagename+"]页面");
    }
    //this.props.pkey
    var params = this.props.pagemanager.getParamsFromUrl();
    return (<div key={this.props.pkey+"_outer"}>
        {this.showPages}
        <ToPageInstance 
          pageview={this} 
          ref={(instance)=>{
            this.pageInstance = instance;
          }}
          params={params}
          pagename={this.state.pagename}
          leftroute = {this.state.leftroute}
          pagemanager={this.props.pagemanager}
          pkey={this.props.pkey+"_inner"} 
          key={this.props.pkey+"_inner"}>
        </ToPageInstance>
      </div>);
  }
}
module.exports = PageView;
