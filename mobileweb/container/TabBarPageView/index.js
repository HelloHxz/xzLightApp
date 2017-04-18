import * as React from 'react'
//注意文件中的互相引用 可能导致 require 出来的对象为空
import * as CF from '../../common/ComponentsFactory';
import { connect }            from 'react-redux';
import TabBar from '../../components/TabBar'


import { PageView } from "../PageView"
import { getMapStateAndMapDispatch } from '../../common/containerCommon';

class xzTabBarPageView extends React.Component {
  TabSelectedChange(pagename){
    this.props.rootNav.TabSelected(this.props.com_ref+"_"+pagename);
    this.setState({selectedpagename:pagename});
  }

  constructor(props){
    super(props);
    this.TabDict={};
    this.NameArr = [];
    this.Arr=[];
    this.state={selectedpagename:props.pagename};
  }

  fireAction(childConfig,params){
    if(this.props.page_state.get("mode")=="dev"){return;}
    if(childConfig.onClick){
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
    }
  }

  render() {
    var p = this.props;
    this.page_state =p.page_state.toJS();
    this.immu_page_state=p.page_state;
    var nav_ctl_id = this.page_state.root[0];
    var nav_ctl_cfg = this.page_state.components[nav_ctl_id];
    var drawer_or_tab = CF.getComponent(nav_ctl_id,this,null);
    var PageInstance;
    if(!this.TabDict[this.state.selectedpagename]){
      var PageClass = PageView(this.state.selectedpagename);
      PageInstance = (<PageClass params={this.props.params} com_ref={this.state.selectedpagename} rootNav={p.rootNav}/>);
      this.TabDict[this.state.selectedpagename]=PageInstance;
    }

    var pageWrapper=[];

    for(var _pagename in this.TabDict){
      pageWrapper.push((<div key={"tabarwrapper"+_pagename} className='xz-tab-body-wapper' style={{display:_pagename!=this.state.selectedpagename?"none":"block"}}>{this.TabDict[_pagename]}</div>));
    }

    return (
      <div className='xz-tabbar-page-wrapper xz-view-ttob' key={this.props.com_ref}>
        <div className='xz-tabbar-page-body'>
          {pageWrapper}
        </div>
        <div className='xz-tabbar-page-footer'>
          <TabBar config={nav_ctl_cfg} rootNav={p.rootNav} page_view={this} selectedpagename={this.state.selectedpagename}/>
        </div>
      </div>
    )
  }
}

var tabbarDict = {};
export function TabBarPageView (pagename) {
  if(!tabbarDict[pagename]){
    var R = getMapStateAndMapDispatch(pagename);
    tabbarDict[pagename] =  connect(R.mapStateToProps, R.mapDispatchToProps)(xzTabBarPageView);
  }
  return tabbarDict[pagename];

}
