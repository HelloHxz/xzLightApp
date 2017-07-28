import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'
import Num from './num'


@observer
class RightRow extends React.Component{
  constructor(props){
    super(props)
  }


  onAdd(params){
    this.props.itemData.value = params.value;
  }
  onSubtra(params){
    this.props.itemData.value = params.value;
  }

  render(){
    var itemID = this.props.itemData.id.toString();
    var value = this.props.itemData.value;
    return (
      <div id={itemID}  className='mt-dc-row'>
      <div className='mt-dc-row-left'><div className='avatar'></div></div>
      <div className='mt-dc-row-right'>{this.props.itemData.name}
        <div className='mt-dc-row-pj'>月售 10 好评 7</div>
        <div className='mt-dc-row-num'><span className='mt-dc-row-money'><span className='now'>¥12.2</span><span className='old'>¥14.2</span></span>
        <Num value={value} 
        onSubtra={this.onSubtra.bind(this)}
        onAdd={this.onAdd.bind(this)}/></div>
      </div>
    </div>
      );
  }
}

@observer
class DianCaiRightList extends React.Component {
  constructor(props) {
    super(props)
  }


  renderGroup(data,children){
    for(var i=0,j=data.length;i<j;i++){
      var itemData = data[i];
      var id = itemData.id;
      children.push(<RightRow shopStore={this.props.shopStore} itemData={itemData} key={itemData.id}/>);
    }
  }

  onSticky(params){
    this.props.shopStore.selectedLeftID = params.instance.props.id.toString();
  }

  
  render() {
    var data = this.props.shopStore.diancaiData||[];
    var children = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemData = data[i];
      children.push(<xz.StickyView 
        id={itemData.classId.toString()}
        onSticky={this.onSticky.bind(this)}
        scrollKey={this.props.scrollKey}
        pageview={this.props.pageview}
        key={itemData.classId}>
        <div className='mt-dc-secheader'><span>{itemData.name}</span></div>
        </xz.StickyView>);
      this.renderGroup(itemData.data,children);
    }
    return (
      <div className='meituan-diancai-rightlist'>
        <div style={{height:".1rem"}}></div>
        {children}
      </div>);
  }
}
export default DianCaiRightList;
