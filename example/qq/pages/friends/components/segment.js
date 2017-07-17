import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"

@observer
class Segment extends React.Component {


  constructor(props) {
    super(props)
  }

  tabChange(params){
    this.props.store.tabSelctedConfig = {key:params.selectedKey,cache:true};
  }

  renderIndicator(params){
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:params.itemInstance.Dom.offsetLeft+"px",
      width:params.itemInstance.Dom.offsetWidth+"px",
      height:style.px2rem(5)+"rem",
    };
    return <div className="xz-segment-indicator" style={indicatorStyle}></div>
  }


  render() {
    return (
        <xz.Segment className='qq-fir-seg' 
          onChange={this.tabChange.bind(this)} 
          renderIndicator={this.renderIndicator.bind(this)}  
          selectedKey={this.props.store.tabSelctedConfig.key} 
          scroll={true}>
          <xz.Segment.Item key='friends'>好友</xz.Segment.Item>
          <xz.Segment.Item key='group'>群</xz.Segment.Item> 
          <xz.Segment.Item key='multichat'>多人聊天</xz.Segment.Item>  
          <xz.Segment.Item key='device'>设备</xz.Segment.Item>
          <xz.Segment.Item key='contacts'>通讯录</xz.Segment.Item>
          <xz.Segment.Item key='public'>公众号</xz.Segment.Item>
        </xz.Segment>);
  }
}
export default Segment;
