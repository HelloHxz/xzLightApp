import React from "react"
import {observer} from 'mobx-react'

import {xz,style,shallowEqual,Navigation} from "../../../../../index"

@observer
class TabBar extends React.Component {

  constructor(props) {
    super(props)
  }


 
  tabbarChange(params){
    //params.selectedKey
    this.props.pageview.props.pagemanager.modifyParams({pk:params.selectedKey});
    this.props.store.tabSelectedKey = params.selectedKey;
  }


  render() {
    return (
    	 <xz.Segment selectedKey={this.props.store.tabSelectedKey} 
    	 onChange={this.tabbarChange.bind(this)} className="weichat-home-tabbar">
          <xz.Segment.Item key='weixin'>微信</xz.Segment.Item>
          <xz.Segment.Item key='contacts'>通讯录</xz.Segment.Item>
          <xz.Segment.Item key='discover'>发现</xz.Segment.Item> 
          <xz.Segment.Item key='me'>我</xz.Segment.Item> 
         </xz.Segment>);
  }
}
export default TabBar;
