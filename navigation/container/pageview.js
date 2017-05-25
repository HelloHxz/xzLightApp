import React from "react";

class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.shouldUpdate = true;
    this.showPageInfo = null;
    this.state={
      leftroute:props.leftroute,
      pagename:props.pagename,
      showPages:[]
    };
    this.repaireUrlWhenRepalceGo = this.repaireUrlWhenRepalceGo.bind(this);
  }


  componentWillReceiveProps(props){
    this.setState({pagename:props.pagename,leftroute:props.leftroute});
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

  close(){
    if(this.showPageInfo){

      if(this.showPageInfo.page.close()){
        //onPageBeforeLeave 
        //close it 
        if(this.showPageInfo.page.onPageBeforeLeave){
          var re = this.showPageInfo.page.onPageBeforeLeave();
          if(!re){
            return false;
          }
        }
        console.log(this.showPageInfo.showPage);
        this.showPageInfo.showPage.style["display"]="none";
      }
      
      return true;
    
    }else{
      return true;
    }
  
  }

  showPage(params){
    var showpages = [];
    this.showPageInfo={};
    showpages.push(<div ref={(showPage)=>{
      this.showPageInfo.showPage = showPage;
    }} className='xz-showpage-frombottom' key='xxx' style={{position:"absolute",zIndex:1,top:0,left:0,backgroundColor:'#fff',height:"100%",width:"100%"}}>
        <PageView ref={(page)=>{this.showPageInfo.page = page;}} leftroute={[]} pagename={'one'} pagemanager={this.props.pagemanager} key={this.props.pkey+'_sone'} pkey={this.props.pkey+'_sone'}></PageView>
      </div>);
    this.setState({showPages:showpages});
  }



  render() {
    var pagename = this.state.pagename||"";
    var realpagename = pagename.split("_")[0];

    var ToPageInstance = this.props.pagemanager.props.config.pages[realpagename];
    if(!ToPageInstance){
       console.error("pages属性中没有引入["+realpagename+"]页面");
       return <div></div>
    }
    //this.props.pkey
    var params = this.props.pagemanager.getParamsFromUrl();
    return (<div className='xz-page-inner' key={this.props.pkey+"_outer"}>
        {this.state.showPages}
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
export default PageView;
