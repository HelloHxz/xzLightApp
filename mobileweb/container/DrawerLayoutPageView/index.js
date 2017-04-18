import * as React from 'react'
//注意文件中的互相引用 可能导致 require 出来的对象为空
// import * as CF from '../../common/ComponentsFactory';

import * as Helper from '../../common/utils'
import { connect }            from 'react-redux';
import {getMapStateAndMapDispatch} from '../../common/containerCommon';

var xzDrawerLayoutPageView = React.createClass({
  componentWillMount:function(){
  },
  fireAction:function(childConfig,params){
    if(this.props.page_state.get("mode")=="dev"){return;}
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
    }
  },
  hideDrawer:function(){
    this.props.actions.modifyProperty({sender:this,page:this.props.com_ref,show:false});
  },
  render: function() {
    this.page_state =this.props.page_state.toJS();
    this.immu_page_state=this.props.page_state;
    var show = this.page_state.show;
    var drawerlayoutStyle = this.page_state.style||{};
    if(!drawerlayoutStyle.flexDirection){
      drawerlayoutStyle.flexDirection="column";
    }
    return (
      <div className='xz-drawer-page-wrapper' key={this.props.com_ref}>
        <div className='xz-pageview-outer'>
          {this.props.children}
        </div>
        <div style={drawerlayoutStyle} className={show?'xz-drawer xz-drawer-open':'xz-drawer'}>
          {Helper.getLayout(this.page_state,this,null)}
        </div>
        <div style={show?{display:"block"}:{display:"none"}} className='xz-drawer-bk' onClick={(e) => this.hideDrawer(e)}></div>
      </div>
    )
  }
});

var DrawerLayoutDict = {};

export function DrawerLayoutPageView (dpagename) {
  if(!DrawerLayoutDict[dpagename]){
    var R = getMapStateAndMapDispatch(dpagename);
    DrawerLayoutDict[dpagename]=connect(R.mapStateToProps, R.mapDispatchToProps)(xzDrawerLayoutPageView);
  }
  return DrawerLayoutDict[dpagename];
}
