import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Segment extends React.Component {
  constructor(props) {
    super(props)
  }

  renderIndicator(params){
    var rect = params.rect;
    var indicatorStyle = {
      position:"absolute",
      top:"0",
      left:params.itemInstance.Dom.offsetLeft+"px",
      width:params.itemInstance.Dom.offsetWidth+"px",
      height:".08rem",
    };

    return <div className="xz-segment-indicator" style={indicatorStyle}></div>
  }
  onChange(params){
    this.props.homeStore.statusConfig={key:params.selectedKey,cache:true};
  }
  render() {
    return ( <xz.Segment className='home-segment' 
        onChange={this.onChange.bind(this)}
        selectedKey={this.props.homeStore.statusConfig.key} renderIndicator={this.renderIndicator.bind(this)}>
              <xz.Segment.Item key='guanzhu'>关注</xz.Segment.Item>
              <xz.Segment.Item key='liuxing'>流行</xz.Segment.Item> 
              <xz.Segment.Item key='xinxian'>新鲜</xz.Segment.Item>  
             </xz.Segment>);
  }
}
export default Segment;
