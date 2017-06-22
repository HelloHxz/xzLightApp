import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class ConditionBar extends React.Component {

  constructor(props) {
    super(props)
  }

  renderItem(key){
  	var _style={};
  	if(key==="condition2"){
  		_style.height = style.px2rem(400)+"rem";
  	}else if(key==="condition1"){
  		_style.height = style.px2rem(200)+"rem";
  	}else if(key==="condition3"){
  		_style["maxHeight"] = style.px2rem(300)+"rem";
  	}else{
  		_style.height = "100%";
  	}
  	return <div style={_style} className="goodlis-condition-dd-1">{key}</div>
  }

  segmentChange(params){
  	if(this.props.store.conditionSelectedKey===params.selectedKey){
  		params.selectedKey = null;
  	}
  	this.props.store.conditionSelectedKey = params.selectedKey;
  }

  onBackLayerClick(){
  	this.props.store.conditionSelectedKey="";
  }

  render() {
    return (
      <xz.DropDownGroup className="goodlis-condition-area"
      	pageview={this.props.pageview}
      	onBackLayerClick={this.onBackLayerClick.bind(this)}
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
