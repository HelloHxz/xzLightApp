var React = require("react");
var PageView = require("./pageview");
class PageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.arr = {};
    this.dict = {};
   
    this.prepareRoute(props);

  }

  prepareRoute(props,cacheSuccess){
    var route = [];
    if(props.owner){
      route = JSON.stringify(props.leftroute);
      route = JSON.parse(route);
    }
    var ToPageName = route.shift();
    this.curpagename = ToPageName;
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
      cacheSuccess&&cacheSuccess(route,ToPageName);
    }
  }

 
  componentWillReceiveProps(props){
    this.prepareRoute(props,(route,ToPageName)=>{
      this.dict[ToPageName].setState({leftroute:route,pagename:ToPageName});
    });
    
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
