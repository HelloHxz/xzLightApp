import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"
import Segement from './components/segment'
import StatusView from './components/statusview'
import HomeStore from './store'


class PageView extends React.Component {

  static connectStore(){
    return {homeStore:HomeStore}
  }
  constructor(props) {
    super(props)
  }

  renderIndicator(params){
    var rect = params.rect;
    var indicatorStyle = {
      position:"absolute",
      top:"0",
      left:params.itemInstance.Dom.offsetLeft+"px",
      width:params.itemInstance.Dom.offsetWidth+"px",
      height:style.px2rem(8)+"rem",
    };

    return <div className="xz-segment-indicator" style={indicatorStyle}></div>
  }
  render() {
    return (<div>
    		<div className='home-seg-wrapper'>
    			  <Segement homeStore={this.props.homeStore}/>
    		</div>
        <StatusView homeStore={this.props.homeStore}/>
    	</div>);
  }
}
export default PageView;
