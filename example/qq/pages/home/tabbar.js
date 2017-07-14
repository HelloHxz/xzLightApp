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
    	 <xz.Segment selectedKey={this.props.store.tabSelectedKey} changeByUrl={true} onChange={this.tabbarChange.bind(this)} className="qq-home-tabbar">
          <xz.Segment.Item key='home/message'>消息</xz.Segment.Item>
          <xz.Segment.Item key='home/friends'>好友</xz.Segment.Item>
          <xz.Segment.Item key='home/blogs'>动态</xz.Segment.Item> 
         </xz.Segment>);
  }
}
export default TabBar;
