import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer 
class LeftRow extends React.Component{
  constructor(props){
    super(props);
  }

  leftClick(itemData){
    this.props.shopStore.selectedLeftID = itemData.classId.toString();
    if(this.props.pageview.diancaiRightScroll){
     this.props.pageview.diancaiRightScroll.scrollarea.scrollTop = document.getElementById(itemData.classId.toString()).offsetTop;
    }
  }






  render(){
    var itemClassName = "";
    var itemId = this.props.itemData.classId.toString();
      if(this.props.shopStore.selectedLeftID===itemId){
        itemClassName = "selected";
      }
      var countLable = null;
      var count = this.props.shopStore.getOneClassCount(itemId);
      if(count>0){
         countLable = <span className='mt-dc-left-cou'>{count}</span>;
      }
    return <li data-id={itemId} ref={(instance)=>{
        if(instance){
          if(instance.getAttribute("data-id")===this.props.shopStore.selectedLeftID){
          }
        }
      }} onClick={this.leftClick.bind(this,this.props.itemData)} className={itemClassName}><span>{this.props.itemData.name}
      {countLable}
      </span></li>
  }
}

@observer
class DianCaiLeftList extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    var data = this.props.shopStore.diancaiData||[];
    var children = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemData = data[i];
      
      children.push(<LeftRow  key={itemData.classId} itemData={itemData} shopStore={this.props.shopStore} pageview={this.props.pageview} />);
    } 

    return (
    	<ul className='meituan-diancai-leftlist'>
        {children}
    	</ul>);
  }
}
export default DianCaiLeftList;
