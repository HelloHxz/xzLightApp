import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Popover extends React.Component {

  constructor(props) {
    super(props)
  }


  renderItem(){
    var data = [{name:"创建群聊",icon:"",action:""},
    {name:"加好友/群",icon:"",action:""},
    {name:"扫一扫",icon:"",action:""},
    {name:"面对面快传",icon:"",action:""},
    {name:"付款",icon:"",action:""},
    {name:"拍摄",icon:"",action:""},
    {name:"面对面红包",icon:"",action:""}];
    var child = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemData = data[i];
      child.push(<li key={itemData.name}><span>{itemData.name}</span></li>);
    }
  	return <ul className='qq-header-popover'>
      {child}
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
          renderItem={this.renderItem.bind(this)} config={this.props.store.headerPopoverConfig}/>);
  }
}
export default Popover;
