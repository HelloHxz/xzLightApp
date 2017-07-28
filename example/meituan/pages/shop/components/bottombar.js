import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'
import Segment from './segment'
import StatusView from './statusview'

@observer
class BottomBar extends React.Component {
  constructor(props) {
    super(props)
  }

  showCartPop(){
    if(this.props.shopStore.hasCart){
      this.props.shopStore.showCartPopLayer ={"key":"CARTLIST",cache:true};
    }
  }
  
  render() {
    var count  = this.props.shopStore.getAllCount();
    var countLabel = null;
    if(count>0){
      countLabel = <span className='mt-sp-allc'>{count}</span>
    }
    return (
    	<div className='meituan-shop-bottom-bar'>
        {countLabel}
        <div onClick={this.showCartPop.bind(this)} className='mt-s-b-btn'></div>
      </div>);
  }
}
export default BottomBar;
