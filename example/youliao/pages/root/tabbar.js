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

  showPage(){
    this.props.pagemanager.go("add");
  }



  render() {
    return (
    	 <xz.Segment selectedKey={this.props.rootStore.tabSelectedKey} 
    	 onChange={this.tabbarChange.bind(this)} className="youliao-home-tabbar">
          <xz.Segment.Item key='root/home'>首页</xz.Segment.Item>
          <xz.Segment.Item key='root/discover'>发现</xz.Segment.Item>
          <div onClick={this.showPage.bind(this)} className='youliao-tabbar-btn'></div>
          <xz.Segment.Item key='root/message'>消息</xz.Segment.Item> 
          <xz.Segment.Item key='root/me'>我的</xz.Segment.Item> 
         </xz.Segment>);
  }
}
export default TabBar;
