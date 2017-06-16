import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class HeaderSegment extends React.Component {

  constructor(props) {
    super(props)
  }

  
  renderIndicatorThree(params){
    // var rect = params.itemInstance.Dom.children[0].getBoundingClientRect();
    var rect = params.rect;
    console.log();
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:params.itemInstance.Dom.children[0].offsetLeft,
      width:params.itemInstance.Dom.children[0].offsetWidth+"px",
      height:style.px2rem(5)+"rem",
    };
    var arr = ["segment-indi-nomal"];
    if(params.curIndex!=params.preIndex){
      arr.push("segment-indi-nomal-ani");
    }
    return <div className={arr.join(" ")} style={indicatorStyle}></div>
  }

 


 
  onChange(params){
    this.props.store.segmentSelectedKey  = params.selectedKey;
    // var key = params.selectedKey;

    // this.props.pagemanager.replaceGo(key);
  }


  render() {
    return (
    	 <xz.Segment
       onChange={this.onChange.bind(this)}
        className="detail-segment" 
       renderIndicator={this.renderIndicatorThree.bind(this)} 
        selectedKey={this.props.store.segmentSelectedKey}>
          <xz.Segment.Item key='1'><span>商品</span></xz.Segment.Item>
          <xz.Segment.Item key='2'><span>详情</span></xz.Segment.Item> 
          <xz.Segment.Item key='3'><span>评价</span></xz.Segment.Item>  
         </xz.Segment>);
  }
}
export default HeaderSegment;
