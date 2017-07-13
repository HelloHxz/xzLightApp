import React from "react";
import LazyLoadPage from "./lazyLoadPage";

class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.shouldUpdate = true;
    this.curShowPageInfo = null;
    this.basePage = null;
    this.bkCover = null;
    this.store = null;
    this.showPageDict = {};
    this.state={
      leftroute:props.leftroute,
      pagename:props.pagename,
      isDestory:false
    };
    this.repaireUrlWhenRepalceGo = this.repaireUrlWhenRepalceGo.bind(this);

    if(props.lazyowner){
      props.lazyowner.realPage = this;
    }
  }


  componentWillReceiveProps(props){
    this.setState({pagename:props.pagename,leftroute:props.leftroute});
  }

  resume(){
    if(!this.state.isDestory){
      return;
    }
    this.setState({isDestory:false});
  }

  destroy(){
    this.setState({isDestory:true});
  }

  repaireUrlWhenRepalceGo(params){
    this.setState(params);
  }

  componentWillUnmount(){
    console.log(this.props.pkey+"     unmount>>>");
    this.props.pagemanager.pageUnmount(this);
  }

  componentDidMount(){
    console.log(this.props.pkey+"     didmount>>>");
    this.props.pagemanager.pageInstanceDict[this.props.pkey] = {
      instance:this.pageInstance,
      basePageView:this,
      isInit:true
    };
  }

   componentWillUpdate(nextProps,nextState){
    return false;
  }

  refresh(){
    
  }


  render() {
    console.log("render>>>>"+this.props.pkey);
    if(this.state.isDestory){
      return null;
    }
    var pagename = this.state.pagename||"";
    var realpagename = pagename.split("_")[0];

    var ToPageInstance = this.props.pagemanager.props.config.pages[realpagename];
    if(!ToPageInstance){
       console.error("pages属性中没有引入["+realpagename+"]页面");
       return null;
    }


    var params = {
      url:this.props.pagemanager.getUrlInfo(),
      pagemanager:this.props.pagemanager,
      base:this,
      pagename:realpagename,
      key:this.props.pkey
    };

    if(!this.store){
      if(ToPageInstance.connectStore){
        this.store = ToPageInstance.connectStore(params);
      }
    }
    
    //this.props.pkey
    var basePageClassName = "xz-page-base-page ";
    return (<div
        ref={(wrapper)=>{this.wrapper = wrapper;}}
       className='xz-pfull' key={this.props.pkey+"_outer"}>
          <ToPageInstance 
            base={this} 
            {...this.store}
            ref={(instance)=>{
              this.pageInstance = instance;
            }}
            owner = {this.props.owner}
            urlinfo={this.props.pagemanager.getUrlInfo()}
            pagename={this.state.pagename}
            leftroute = {this.state.leftroute}
            pagemanager={this.props.pagemanager}
            basekey={this.props.pkey}
            pkey={this.props.pkey+"_inner"} 
            key={this.props.pkey+"_inner"}>
          </ToPageInstance>
      </div>);
  }
}
export default PageView;
