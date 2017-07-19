import React from "react"
import {xz,Navigation} from "../../../../../index"
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
 

  render() {
    return (
          <xz.Segment 
          onChange={this.onChange.bind(this)}
          selectedKey={this.props.store.statusConfig.key} className='weibo-main-segment'>
            <xz.Segment.Item key='guanzhu'>关注</xz.Segment.Item>
            <xz.Segment.Item key='hot'>热门</xz.Segment.Item>
          </xz.Segment>);
  }
}
export default Segment;
