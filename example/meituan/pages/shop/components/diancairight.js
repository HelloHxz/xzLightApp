import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'


@observer
class DianCaiRightList extends React.Component {
  constructor(props) {
    super(props)
  }


  renderRow(itemData){
    return <div id={itemData.id} key={itemData.id} className='mt-dc-row'>
      <div className='mt-dc-row-left'><div className='avatar'></div></div>
      <div className='mt-dc-row-right'>{itemData.name}</div>
    </div>
  }
  renderGroup(data,children){
    for(var i=0,j=data.length;i<j;i++){
      children.push(this.renderRow(data[i]));
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
        id={itemData.id.toString()}
        onSticky={this.onSticky.bind(this)}
        scrollKey={this.props.scrollKey}
        pageview={this.props.pageview}
        key={itemData.id}>
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
