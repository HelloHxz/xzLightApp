import React from "react"
import {observer} from 'mobx-react'

import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }


 
  tabbarChange(params){
    var key = params.itemInstance.props.url||params.selectedKey;
    this.props.pagemanager.replaceGo(key);
  }



  render() {
    return (
    	 <xz.Segment changeByUrl={true} onChange={this.tabbarChange.bind(this)} className="tabbarpage-tabbar" selectedKey={this.props.store.tabSelectedKey}>
          <xz.Segment.Item key='tabbarpage/segmentdemo' url='tabbarpage/segmentdemo/horizontalsegment'>首页</xz.Segment.Item>
          <xz.Segment.Item key='tabbarpage/dpdcdemo'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='4'>设置</xz.Segment.Item>
         </xz.Segment>);
  }
}
export default PageView;
