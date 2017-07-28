import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"
import BottomView from './components/bottomview'
import Store from './store'
import BottomBar from './components/bottombar'
import Header from './components/header'
import TopView from './components/topview'
import BottomPopLayer from './components/bottompoplayer'


class PageView extends React.Component {

  static connectStore(){
  	return {shopStore:new Store}
  }

  constructor(props) {
    super(props)
  }

  componentWillUnmount(){
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
    return (<div>
      <Header shopStore={this.props.shopStore}/>
      <TopView/>
    	<BottomView pageview={this} shopStore={this.props.shopStore}/>
      <BottomBar shopStore={this.props.shopStore}/>
      <BottomPopLayer shopStore={this.props.shopStore}/>
    	</div>);
  }
}
export default PageView;
