import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Popover extends React.Component {

  constructor(props) {
    super(props)
  }


  renderItem(){
  	return <div style={{width:"3.5rem",height:"4.8rem",backgroundColor:"#fff",borderRadius:".1rem"}}>sss</div>
  }

  onBackLayerClick(){
  	this.props.store.headerPopoverConfig = {};
  }


  render() {
    
    return (
          <xz.Popover onBackLayerClick={this.onBackLayerClick.bind(this)} renderItem={this.renderItem.bind(this)} config={this.props.store.headerPopoverConfig}/>);
  }
}
export default Popover;
