import React from "react"
import "./index.less"
import Store from './store'
import {xz,Navigation} from "../../../../index"
import {observer} from 'mobx-react'

@observer
class PageView extends React.Component {
  static connectStore(){
  	return {store:Store}
  }

  constructor(props) {
    super(props)
  }


  setLoadingState(){
  	this.props.store.loadingState = 'loading';
  	setTimeout(()=>{
  		this.props.store.loadingState = 'success';
  		setTimeout(()=>{
	  		this.props.store.loadingState = 'done';
	  	},800);
  	},2000);
  }


  loadingLayerRender(state){
  	if(state==='loading'){
  		return <div className='zfb-kb-loading'>
  			<xz.Spin size='.69rem' color="#fff" type='android'/>
  			<span>加载中...</span>
  		</div>;
  	}else if(state==="success"){
  		return <div className='zfb-kb-loading'>
  			<div className='iconfont icon-chenggong'></div>
  			<span>提交成功</span>
  		</div>;
  	}
  }
 

  render() {
    return (<div>
    		<div className='zfb-header'>口碑</div>
    		<xz.LoadingLayer 
    			renderItem = {this.loadingLayerRender.bind(this)}
    			className='zfb-kb-content' status={this.props.store.loadingState}>
    			<div className='iconfont icon-rectangle390'></div>
    			<xz.Button onClick={this.setLoadingState.bind(this)}>hhs</xz.Button>
    		</xz.LoadingLayer>
    	</div>);
  }
}
export default PageView;
