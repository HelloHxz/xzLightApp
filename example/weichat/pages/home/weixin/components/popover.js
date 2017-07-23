import React from "react"
import {xz,Navigation} from "../../../../../../index"
import {observer} from 'mobx-react'
import "./popover.less"

@observer
class Popover extends React.Component {

  constructor(props) {
    super(props)
  }


  renderItem(){
  	return <ul className="weixin-header-popover">
      <li>发起群聊</li>
      <li>添加朋友</li>
      <li>扫一扫</li>
      <li>收付款</li>
    </ul>
  }

  onBackLayerClick(){
  	this.props.store.headerPopoverConfig = {};
  }


  render() {
    
    return (
          <xz.Popover 
          offsetX={-10}
          offsetY={20}
          bkOpacity={0}
          onBackLayerClick={this.onBackLayerClick.bind(this)} 
          renderItem={this.renderItem.bind(this)} 
          config={this.props.store.headerPopoverConfig}/>);
  }
}
export default Popover;
