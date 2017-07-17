import React from "react"
import {observer} from 'mobx-react'

import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class TabBar extends React.Component {

  constructor(props) {
    super(props)
  }


 
  tabbarChange(params){
    var key = params.itemInstance.props.url||params.selectedKey;
    this.props.pagemanager.replaceGo(key);
  }



  render() {
    return (
    	 <xz.Segment selectedKey={this.props.store.tabSelectedKey} 
    	 onChange={this.tabbarChange.bind(this)} className="zhifubao-home-tabbar">
          <xz.Segment.Item key='home/main'>首页</xz.Segment.Item>
          <xz.Segment.Item key='home/koubei'>口碑</xz.Segment.Item>
          <xz.Segment.Item key='home/friend'>好友</xz.Segment.Item> 
          <xz.Segment.Item key='home/me'>我的</xz.Segment.Item> 
         </xz.Segment>);
  }
}
export default TabBar;
