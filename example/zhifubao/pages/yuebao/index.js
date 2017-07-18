import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }
 
 onPull2Refresh(){

 }

 renderRefreshIndicator(params){

 	return <div>111</div>
 }

  render() {
    return (<div>
    		<div className='yuebao-header'>yuebao</div>
    		<xz.ScrollView 
    		renderRefreshIndicator={this.renderRefreshIndicator.bind(this)}
    		onRefresh = {this.onPull2Refresh.bind(this)}
    		className='yuebao-scroll'>
    			<div className='yuebao-topview'></div>
    			<div style={{height:"30rem"}}/>
    		</xz.ScrollView>
    		<div className='yuebao-footer'>
    			<div className='yuebao-footer-zhuanru'>转入</div>
    			<div className='yuebao-footer-zhuanchu'>转出</div>
    		</div>
    	</div>);
  }
}
export default PageView;
