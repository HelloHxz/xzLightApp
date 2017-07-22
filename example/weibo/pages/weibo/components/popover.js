import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Popover extends React.Component {

  constructor(props) {
    super(props)
  }


  renderItem(){
  	return <ul className="weibo-header-popover">
      <li>扫一扫</li>
      <li>打车</li>
    </ul>
  }

  onBackLayerClick(){
  	this.props.store.headerPopoverConfig = {};
  }


  render() {
    
    return (
          <xz.Popover 
          offsetX={-10}
          offsetY={-10}
          onBackLayerClick={this.onBackLayerClick.bind(this)} 
          renderItem={this.renderItem.bind(this)} 
          config={this.props.store.headerPopoverConfig}/>);
  }
}
export default Popover;
