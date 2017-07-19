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
 	var child = <YueBaoSpin animation={animation} value={value} backgroundColor="rgb(250,59,32)" borderColor="#388ae8"/>
 	return <div className="yuebao-refresh-wrapper">{child}</div>
 }

 goBack(){
  window.history.go(-1);
 }

  render() {
    return (<div>
    		<div className='yuebao-header'>
          <span className='yuebao-bk-btn'><i className='iconfont icon-return'></i><span onClick={this.goBack.bind(this)}>首页</span></span>
        </div>
    		<xz.ScrollView 
    		renderRefreshIndicator={this.renderRefreshIndicator.bind(this)}
    		onRefresh = {this.onPull2Refresh.bind(this)}
    		className='yuebao-scroll'>
    			<div className='yuebao-topview'>
            <span className='yuebao-m-label'>3.82</span>
            <span className='yuebao-m-desc'>昨日收益&nbsp;(元)</span>
            <div className='yuebao-sum-label'>总金额****元</div>
          </div>
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
