import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Segment extends React.Component {
  constructor(props) {
    super(props)
  }

  renderIndicator(params){
  	var Dom = params.itemInstance.Dom.children[0];
  	  var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:Dom.offsetLeft+"px",
      width:Dom.offsetWidth+"px",
      height:style.px2rem(5)+"rem",
    };
    return <div className="xz-segment-indicator" style={indicatorStyle}></div>
  }

  onChange(params){
    this.props.shopStore.segmentSelectedKey = params.selectedKey;
  }
  
  render() {
    return (<xz.Segment 
            className='meitu-shop-segment' 
            onChange={this.onChange.bind(this)}
            renderIndicator={this.renderIndicator.bind(this)} selectedKey={this.props.shopStore.segmentSelectedKey}>
	          <xz.Segment.Item key='diancai'><span>点菜</span></xz.Segment.Item>
	          <xz.Segment.Item key='pingjia'><span>评价</span></xz.Segment.Item> 
	          <xz.Segment.Item key='shangjia'><span>商家</span></xz.Segment.Item>  
	         </xz.Segment>
	        );
  }
}
export default Segment;
