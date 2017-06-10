import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }

   renderIndicator(params){
    var rect = params.rect;
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      top:"0",
      left:((params.curIndex)/params.itemCount*100+"%"),
      width:style.px2rem(rect.width)+"rem",
    };

    var arr = ["segment-switch-indi"];
    if(params.curIndex!=params.preIndex){
      arr.push("segment-indi-nomal-ani");
    }
    return <div className={arr.join(" ")} style={indicatorStyle}></div>
  }
 


 
  onChange(params){
    var key = params.selectedKey;

    this.props.pagemanager.replaceGo(key);
  }


  render() {
    return (
    	 <xz.Segment changeByUrl={true} className='segment-switch' onChange={this.onChange.bind(this)} renderIndicator={this.renderIndicator.bind(this)} selectedKey={this.props.store.tabSelectedKey}>
          <xz.Segment.Item key='tabbarpage/segmentdemo/horizontalsegment'>水平</xz.Segment.Item>
          <xz.Segment.Item key='tabbarpage/segmentdemo/verticalsegment'>垂直</xz.Segment.Item> 
         </xz.Segment>);
  }
}
export default PageView;
