import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class ConditionBar extends React.Component {

  constructor(props) {
    super(props)
  }

  renderItem(key){
  	return <div className="goodlis-condition-dd-1">{key}</div>
  }

  segmentChange(params){
  	if(this.props.store.conditionSelectedKey===params.selectedKey){
  		params.selectedKey = null;
  	}
  	this.props.store.conditionSelectedKey = params.selectedKey;
  }

  render() {
    return (
      <xz.DropDownGroup className="goodlis-condition-area"
      	selectedKey={this.props.store.conditionSelectedKey}
      	renderItem = {this.renderItem.bind(this)}
      >
      	<xz.Segment onChange={this.segmentChange.bind(this)} 
      				className='goodlis-condition-segment' 
      				selectedKey={this.props.store.conditionSelectedKey}>
          <xz.Segment.Item key='condition1'>品牌</xz.Segment.Item>
          <xz.Segment.Item key='condition2'>材质</xz.Segment.Item> 
          <xz.Segment.Item key='condition3'>型号</xz.Segment.Item>  
          <xz.Segment.Item key='condition4'>我的</xz.Segment.Item>
        </xz.Segment>
      </xz.DropDownGroup>
    );
  }
}
export default ConditionBar;
