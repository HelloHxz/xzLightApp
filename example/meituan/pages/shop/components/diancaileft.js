import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class DianCaiLeftList extends React.Component {
  constructor(props) {
    super(props)
  }


  leftClick(itemData){
    this.props.shopStore.selectedLeftID = itemData.id.toString();
    if(this.props.pageview.diancaiRightScroll){
     this.props.pageview.diancaiRightScroll.scrollarea.scrollTop = document.getElementById(itemData.id.toString()).offsetTop;
    }
  }

  
  render() {
    var data = this.props.shopStore.diancaiData||[];
    var children = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemData = data[i];
      var itemClassName = "";
      if(this.props.shopStore.selectedLeftID===itemData.id.toString()){
        itemClassName = "selected";
      }
      children.push(<li data-id={itemData.id} ref={(instance)=>{
        if(instance){
          if(instance.getAttribute("data-id")===this.props.shopStore.selectedLeftID){
            instance.scrollIntoViewIfNeeded();
          }
        }
      }} onClick={this.leftClick.bind(this,itemData)} className={itemClassName} key={itemData.id}><span>{itemData.name}</span></li>);
    } 

    return (
    	<ul className='meituan-diancai-leftlist'>
        {children}
    	</ul>);
  }
}
export default DianCaiLeftList;
