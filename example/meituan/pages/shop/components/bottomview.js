import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'
import Segment from './segment'
import StatusView from './statusview'

@observer
class BottomView extends React.Component {
  constructor(props) {
    super(props)
  }

  
  render() {
    var className = ["meituan-shop-bottomview"];
    className.push(this.props.shopStore.UIisOpen?"meituan-shop-bottomview-open":"meituan-shop-bottomview-close");
    return (
    	<div className={className.join(" ")}>
    		<Segment pageview={this.props.pageview}  shopStore={this.props.shopStore}/>
	      <StatusView pageview={this.props.pageview} shopStore={this.props.shopStore}/>
    	</div>);
  }
}
export default BottomView;
