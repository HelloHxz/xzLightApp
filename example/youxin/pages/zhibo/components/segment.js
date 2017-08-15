import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Segment extends React.Component {

  constructor(props) {
    super(props)
  }


  componentDidMount(){
    this.props.store.refreshListData(this.props.store.statusConfig.key);
  }
  onChange(params){
    if(this.props.store.statusConfig.key===params.selectedKey){
      
    }else{
      this.props.store.refreshListData(params.selectedKey);
      this.props.store.statusConfig = {key:params.selectedKey,cache:true}
    }
  }

  renderIndicator(params){
    var dom = params.itemInstance.Dom.children[0];
    var indicatorStyle = {
      left:dom.offsetLeft+"px",
      width:dom.offsetWidth+"px",
      backgroundColor:"#333"
    };
    return <div className="weibo-segment-indicator" style={indicatorStyle}></div>
  }
 

  render() {
    return (
          <xz.Segment 
          renderIndicator={this.renderIndicator.bind(this)}
          onChange={this.onChange.bind(this)}
          selectedKey={this.props.store.statusConfig.key} className='weibo-main-segment'>
            <xz.Segment.Item key='guanzhu'><span>关注</span></xz.Segment.Item>
            <xz.Segment.Item key='hot'><span>热门</span></xz.Segment.Item>
            <xz.Segment.Item key='tongcheng'><span>同城</span></xz.Segment.Item>
            <xz.Segment.Item key='shipin'><span>视频</span></xz.Segment.Item>
          </xz.Segment>);
  }
}
export default Segment;
