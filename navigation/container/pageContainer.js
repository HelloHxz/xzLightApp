var React = require("react");
var PageView = require("./pageview");
class PageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.arr = {};
    this.dict = {};
    var route = [];
    this.shouldUpdate = true;
    if(props.owner){
      route = JSON.stringify(props.owner.props.pageview.props.leftroute);
      route = JSON.parse(route);
    }
    var ToPageName = route.shift();
    this.curpagename = ToPageName;
    var key = props.owner.props.pageview.props.pkey+"_"+ToPageName;
    this.arr[ToPageName]=(<PageView 
                    leftroute={route} 
                    ref={(instance)=>{
                      this.dict[ToPageName] = instance;
                    }}
                    pagename={ToPageName} 
                    pagemanager={props.owner.props.pagemanager} 
                    key={key} 
                    pkey={key}></PageView>) ;

  }

 
  componentWillReceiveProps(props){
    var route = [];
    if(props.owner){
      route = JSON.stringify(props.leftroute);
      route = JSON.parse(route);
    }
    var ToPageName = route.shift();
    this.curpagename = ToPageName;
    this.shouldUpdate = true; 
    var key = props.owner.props.pageview.props.pkey+"_"+ToPageName;
    if(!this.arr[ToPageName]){
      this.arr[ToPageName]=(<PageView 
                    ref={(instance)=>{
                      this.dict[ToPageName] = instance;
                    }}
                    leftroute={route} 
                    pagename={ToPageName} 
                    pagemanager={props.owner.props.pagemanager} 
                    key={key} 
                    pkey={key}></PageView>) ;

    }else{
      this.dict[ToPageName].setState({leftroute:route,pagename:ToPageName});
    }
    
  }

  shouldComponentUpdate(){
    return this.shouldUpdate;
  }

  render() {
    var re = [];
    for(var key in this.arr){
      if(key===this.curpagename){
        re.push(<div key={key+"_containerwrapper"}>{this.arr[key]}</div>);
      }else{
        re.push(<div  key={key+"_containerwrapper"} style={{display:"none"}}>{this.arr[key]}</div>);
      }
    }
    return (<div>{re}</div>);
  }
}
module.exports = PageContainer;
