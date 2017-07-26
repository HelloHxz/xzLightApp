import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'
import ShopScroll from './shopscroll'
import DianCaiLeft from './diancaileft'
import DianCaiRight from './diancairight'

@observer
class Diancai extends React.Component {
  constructor(props) {
    super(props)
  }

  
  render() {
    return (
    	<div className='meituan-shop-diancai'>
        <ShopScroll shopStore={this.props.shopStore} pageview={this.props.pageview} className='meituan-diancai-left'>
          <DianCaiLeft shopStore={this.props.shopStore} pageview={this.props.pageview}/>
        </ShopScroll>
        <ShopScroll shopStore={this.props.shopStore} pageview={this.props.pageview} scrollKey="meituan-diancai-right" className='meituan-diancai-right'>
          <DianCaiRight scrollKey="meituan-diancai-right" shopStore={this.props.shopStore} pageview={this.props.pageview}/>
        </ShopScroll>
    	</div>);
  }
}
export default Diancai;
