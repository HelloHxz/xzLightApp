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
    	 onChange={this.tabbarChange.bind(this)} className="weibo-home-tabbar">
          <xz.Segment.Item key='home/weibo'>微博</xz.Segment.Item>
          <xz.Segment.Item key='home/message'>消息</xz.Segment.Item>
          <div className='weibo-tabbar-btn'></div>
          <xz.Segment.Item key='home/discover'>发现</xz.Segment.Item> 
          <xz.Segment.Item key='home/me'>我的</xz.Segment.Item> 
         </xz.Segment>);
  }
}
export default TabBar;
