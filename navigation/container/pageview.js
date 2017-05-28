import React from "react";



var showAnimateConfig = {
  fromBottom:{
        showPage:{
          show:"",
          hide:""
        },
        basePage:{
          show:"",
          hide:""
        }
  },
  fromTop:{

  },
  none:{

  }

};

class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.shouldUpdate = true;
    this.curShowPageInfo = null;
    this.showPageDict = {};
    this.state={
      leftroute:props.leftroute,
      pagename:props.pagename,
      isDestory:false,
      showPages:[]
    };
    this.repaireUrlWhenRepalceGo = this.repaireUrlWhenRepalceGo.bind(this);
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

    if(this.props.pagemanager.pageInstanceDict[this.props.pkey]){
      delete this.props.pagemanager.pageInstanceDict[this.props.pkey];
    }
  }

  componentDidMount(){
    console.log(this.props.pkey+"     didmount>>>");
    this.props.pagemanager.pageInstanceDict[this.props.pkey] = {
      instance:this.pageInstance,
      basePageView:this,
      isInit:true
    };
  }


  refresh(){
    
  }

  close(){
    if(this.curShowPageInfo&&this.curShowPageInfo.page){
      if(this.curShowPageInfo.page.close()){
        if(this.curShowPageInfo.page.onPageBeforeLeave){
          var re = this.curShowPageInfo.page.onPageBeforeLeave();
          if(!re){
            return false;
          }
        }
        this.curShowPageInfo.showPage.style["display"]="none";
        if(!this.curShowPageInfo.cache){

          var pageKey = this.curShowPageInfo.pageKey;
          this.curShowPageInfo = null;
          setTimeout(()=>{
            this.setState({showPages:null});
            delete this.showPageDict[pageKey];
          },300)
        }
        
        return false;
      }
      return false;
    }else{
      return true;
    }
  
  }
  /*
    params:{
      pageKey:"",
      
      animateType:"",//string default fromBottom
      
      customAnimateConfig:{
  
      },
      cache:true, //boolean default false
      params:{
  
      }
    }
  */
  showPage(params){
    //   this.curShowPageInfo = null;
    // this.showPageDict = {};
    var pageKey = params.pageKey;
    if(this.showPageDict[pageKey]){
      alert("show cache page");
      return;
    }
    var cachePage = params.cache === true;
    if(!pageKey){
      console.error("showPage 方法参数没有指明pageKey");
    }
    var showpages = [];
    var key = this.props.pkey+'_show_'+pageKey;
    this.curShowPageInfo={cache:cachePage,pageKey:pageKey};
    this.showPageDict[pageKey] = this.curShowPageInfo;
    showpages.push(<div ref={(showPage)=>{
      if(showPage){this.curShowPageInfo.showPage = showPage;}
    }} className='xz-showpage-frombottom-show' key={key+"_wrapper"} >
        <PageView ref={(page)=>{
          if(page){this.curShowPageInfo.page = page;}}} leftroute={[]} pagename={pageKey} pagemanager={this.props.pagemanager} key={key} pkey={key}></PageView>
      </div>);
    this.setState({showPages:showpages});
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
    //this.props.pkey
    var params = this.props.pagemanager.getParamsFromUrl();
    return (<div className='xz-page-inner' key={this.props.pkey+"_outer"}>
        {this.state.showPages}
        <ToPageInstance 
          base={this} 
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
export default PageView;
