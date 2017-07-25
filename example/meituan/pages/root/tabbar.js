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
       onChange={this.tabbarChange.bind(this)} className="qq-home-tabbar">
          <xz.Segment.Item key='root/home'>首页</xz.Segment.Item>
          <xz.Segment.Item key='root/orderlist'>订单</xz.Segment.Item>
          <xz.Segment.Item key='root/me'>我</xz.Segment.Item> 
         </xz.Segment>);
  }
}
export default TabBar;
