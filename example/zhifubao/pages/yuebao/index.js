import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import YueBaoSpin from './components/refreshspin'


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }
 
 onPull2Refresh(){

 }

 renderRefreshIndicator(params){
 	var value = 20;
  var animation = false;
 	if(params.isInLoading){
    animation = true;
 	}else if(params.canRefresh){
 		value = 100;
 	}else{
 		value = (params.offset*100/params.limitOffset);
 	}
  console.log(value);
 	var child = <YueBaoSpin animation={animation} value={value} backgroundColor="rgb(250,59,32)" borderColor="#388ae8"/>
 	return <div className="yuebao-refresh-wrapper">{child}</div>
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
