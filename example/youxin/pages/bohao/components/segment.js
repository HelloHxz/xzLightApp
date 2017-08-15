import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Segment extends React.Component {

  constructor(props) {
    super(props)
  }


  onChange(params){
    if(this.props.homeStore.bohaoStatusConfig.key===params.selectedKey){

    }else{
      this.props.homeStore.bohaoStatusConfig = {key:params.selectedKey,cache:true}
    }
  }

  renderIndicator(params){
    var dom = params.itemInstance.Dom.children[0];
    var iw = style.rem2px(.6);
    //dom.offsetWidth
    var indicatorStyle = {
      left:(dom.offsetLeft+(dom.offsetWidth-iw)/2)+"px",
      width:iw+"px",
      backgroundColor:"#333"
    };
    return <div className="weibo-segment-indicator" style={indicatorStyle}></div>
  }
 

  render() {
    return (
          <xz.Segment 
          renderIndicator={this.renderIndicator.bind(this)}
          onChange={this.onChange.bind(this)}
          selectedKey={this.props.homeStore.bohaoStatusConfig.key} className='weibo-bohao-segment'>
            <xz.Segment.Item key='recent'><span>最近通话</span></xz.Segment.Item>
            <xz.Segment.Item key='contacts'><span>通讯录</span></xz.Segment.Item>
          </xz.Segment>);
  }
}
export default Segment;
