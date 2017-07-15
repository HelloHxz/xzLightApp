import React from "react"
import "./index.less"
import {observer} from 'mobx-react'
import Avatar from "../../components/headeravatar"
import HomeStore from "../home/store"
import Store from './store'
import {xz,Navigation,style} from "../../../../index"
import SearchBar from "../../components/searchbar"


@observer
class PageView extends React.Component {
	static connectStore(){
		return {homeStore:HomeStore,store:new Store}
	}
	constructor(props) {
		super(props)
	}

  renderIndicator(params){
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:params.itemInstance.Dom.offsetLeft+"px",
      width:params.itemInstance.Dom.offsetWidth+"px",
      height:style.px2rem(5)+"rem",
    };
    return <div className="xz-segment-indicator" style={indicatorStyle}></div>
  }

  tabChange(params){
  	this.props.store.tabSelctedConfig = {key:params.selectedKey,cache:true};
  }

  renderItem(params){
  	return <xz.ScrollView scrollKey={params.key} pageview={this} className='qq-fir-scrollview'>{params.key}</xz.ScrollView>
  }

	render() {
	return (<div>
		<div className='qq-header'><Avatar homestore={this.props.homeStore}/></div>
		<div className='qq-body'>
			<div className='qq-fri-search'>
				<SearchBar/>
			</div>
			<div className='qq-fri-scroll'>
				<xz.Segment className='qq-fir-seg' onChange={this.tabChange.bind(this)} renderIndicator={this.renderIndicator.bind(this)}  selectedKey={this.props.store.tabSelctedConfig.key} scroll={true}>
				  <xz.Segment.Item key='friends'>好友</xz.Segment.Item>
				  <xz.Segment.Item key='group'>群</xz.Segment.Item> 
				  <xz.Segment.Item key='multchat'>多人聊天</xz.Segment.Item>  
				  <xz.Segment.Item key='device'>设备</xz.Segment.Item>
				  <xz.Segment.Item key='contacts'>通讯录</xz.Segment.Item>
				  <xz.Segment.Item key='public'>公众号</xz.Segment.Item>
				</xz.Segment>
				<xz.StatusView className='qq-fri-status' renderItem={this.renderItem.bind(this)} config={this.props.store.tabSelctedConfig}/>
			</div>
		</div>
	  </div>);
	}
}
export default PageView;
