import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Segment extends React.Component {

  constructor(props) {
    super(props)
  }


  onChange(params){
    if(this.props.store.statusConfig.key===params.selectedKey){
      if(this.props.store.dropDownGroupSelectedKey!==params.selectedKey){
        this.props.store.dropDownGroupSelectedKey = params.selectedKey;
      }else{
        this.props.store.dropDownGroupSelectedKey = null;
      }
    }else{
      this.props.store.dropDownGroupSelectedKey = null;
      this.props.store.statusConfig = {key:params.selectedKey,cache:true}
    }
  }

  renderIndicator(params){
    var dom = params.itemInstance.Dom.children[0];
    var indicatorStyle = {
      left:dom.offsetLeft+"px",
      width:dom.offsetWidth+"px",
      backgroundColor:params.curIndex===0?"orange":"rgb(255, 93, 93)"
    };
    return <div className="weibo-segment-indicator" style={indicatorStyle}></div>
  }
 

  render() {
    var guanzhuTri = ["weibo-seg-tri"];
    var hotTri = ["weibo-seg-tri"];
    if(this.props.store.statusConfig){
      if(this.props.store.statusConfig.key==="guanzhu"){
        hotTri.push("visibilityhidden");
      }else if(this.props.store.statusConfig.key==="hot"){
        guanzhuTri.push("visibilityhidden");
      }
    }

    if(this.props.store.dropDownGroupSelectedKey==="guanzhu"){
      guanzhuTri.push("weibo-tri-rotate");
    }
    if(this.props.store.dropDownGroupSelectedKey==="hot"){
      hotTri.push("weibo-tri-rotate");
    }
    return (
          <xz.Segment 
          renderIndicator={this.renderIndicator.bind(this)}
          onChange={this.onChange.bind(this)}
          selectedKey={this.props.store.statusConfig.key} className='weibo-main-segment'>
            <xz.Segment.Item key='guanzhu'><span>关注</span><i className={guanzhuTri.join(" ")}></i></xz.Segment.Item>
            <xz.Segment.Item key='hot'><span>热门</span><i className={hotTri.join(" ")}></i></xz.Segment.Item>
          </xz.Segment>);
  }
}
export default Segment;
