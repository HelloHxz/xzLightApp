import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"
import BottomView from './components/bottomview'
import Store from './store'


class PageView extends React.Component {

  static connectStore(){
  	return {shopStore:Store}
  }

  constructor(props) {
    super(props)
  }

  renderIndicator(params){
  	var Dom = params.itemInstance.Dom.children[0];
  	  var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:Dom.offsetLeft+"px",
      width:Dom.offsetWidth+"px",
      height:style.px2rem(5)+"rem",
    };
    return <div className="xz-segment-indicator" style={indicatorStyle}></div>
  }
  
  render() {
    return (<div><div className='meituan-header'></div>
    	<div className='meituan-shop-topview'></div>
    	<BottomView pageview={this} shopStore={this.props.shopStore}/>
    	</div>);
  }
}
export default PageView;
