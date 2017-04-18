import * as React from 'react'
//注意文件中的互相引用 可能导致 require 出来的对象为空
import * as Helper from '../../common/utils'
import { connect }            from 'react-redux';
import { getMapStateAndMapDispatch } from '../../common/containerCommon';

import * as styleHelper from '../../common/styleHelper';

import Immutable from 'immutable';
import * as PluginBridge from '../../pluginBridge';


class xzPageView extends React.Component{
  constructor(props,context){
    super(props,context);
    this.ctl_with_datasource={};
    this.showpageInstance = null;
    this.pagename = props.com_ref;
    this.plugin = null;
    var p = PluginBridge.get(props.com_ref.split("$$")[0]);
    if(p){
      this.plugin = new p(this);
    }
    this.page_state = props.page_state.toJS();
    this.hidePage = this.hidePage.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    return !Immutable.is(this.props.page_state,nextProps.page_state);
  }

  componentDidMount(){
      if(this.page_state.dataSource){
        for(var key in this.page_state.dataSource){
          var config = this.page_state.dataSource[key];
           this.props.actions.fetchData({pagename:this.props.com_ref,config:config,dataSouceKey:key});
        }
      }
      // for(var key in this.ctl_with_datasource){
      //   this.ctl_with_datasource[key].loadData();
      // }
  }


  Go(pagename,params){
    this.props.rootNav.Go({to:pagename,params:params},this);
  }
  goBack(){
    this.props.rootNav.goBack(null,this);
  }

  fireAction(childConfig,params){

    // if(this.props.page_state.get("mode")=="dev"){return;}

    if(childConfig.onClick){
      params.e.stopPropagation();
      params.e.nativeEvent.stopImmediatePropagation();

      for(var i=0,j=childConfig.onClick.length;i<j;i++){
        var action = childConfig.onClick[i];
        action.sender = params.sender;
        if(action.type=="navigate"){
          this.props.rootNav.Go(action);
        }else if(action.type=="goback"){
          this.props.rootNav.goBack();
        }else{
          if(!action.page){
            action.page = this.props.com_ref;
          }
          this.props.actions[action.type](action);
        }
      }
      if(!params.sender){
        console.error("fireAction缺少sender参数");
      }

    }
    
    var com_key=params.sender.props.com_ref;
    if(this.plugin){
      var method = this.plugin[com_key+"_click"];
      method&&method(params.sender);
    }

    // if(childConfig.recivedataactions){
    //   //payload = {key:"datasourcekey"}
    //   this.props.actions["receiveData"](params.payload,params.jsondata)
    // }
    // this.props.actions["fetchData"]();
  }

  hidePage(){
    // console.log(this);
    this.props.actions.hidepage({page:this.props.com_ref,to:this.page_state.$$showpage});
  }

  render() {
    this.page_state = this.props.page_state.toJS();
    this.immu_page_state=this.props.page_state;
    var showpagename = this.page_state.$$showpage;
    if(showpagename){
      var PageClass = PageView(showpagename);
      this.showpageInstance = (<PageClass parent_pageview={this} type={'showpage'} params={this.props.params} com_ref={showpagename} rootNav={this.props.rootNav}/>);
    }
    var style =styleHelper.process(this.page_state.style) ;
    var com_ref = this.props.com_ref+"_pageview";
    console.log(this.props.com_ref+"render");
    if(this.props.type=='showpage'){
      return (
          <div data-role="xz.pageview" data-ref={com_ref} style={style} className='xz-pageview xz-z100' key={com_ref}>
            {Helper.getLayout(this.page_state,this,null)}
          </div>
      )
    }
    return (
      <div style={{position:"relative",width:"100%",height:"100%"}}>
        <div className={showpagename!=null?'xz-drawer xz-drawer-open':'xz-drawer'}>
          <div onClick={this.hidePage} className='xz-drawer-bk'></div>
          {this.showpageInstance}
        </div>
        <div data-role="xz.pageview" data-ref={com_ref} style={style} className='xz-pageview' key={com_ref}>
          {Helper.getLayout(this.page_state,this,null)}
        </div>
      </div>
    )
  }
}


var PageViewDict={};

export function PageView (pagename) {
  if(!PageViewDict[pagename]){
    var R = getMapStateAndMapDispatch(pagename);
    PageViewDict[pagename]=connect(R.mapStateToProps, R.mapDispatchToProps)(xzPageView);
  }
  return PageViewDict[pagename];

}
