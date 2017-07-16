import React from "react"
import "./index.less"
import {observer} from 'mobx-react'
import Avatar from "../../components/headeravatar"
import HomeStore from "../home/store"
import Store from './store'
import {xz,Navigation,style} from "../../../../index"
import SearchBar from "../../components/searchbar"
import TabContent from './components/tabcontent'


@observer
class PageView extends React.Component {
	static connectStore(){
		return {homeStore:HomeStore,store:new Store}
	}
	constructor(props) {
		super(props)
	}


 
 

	render() {
	return (<div>
		<div className='qq-header'><Avatar homestore={this.props.homeStore}/>
		<span className='qq-title'>联系人</span>
		<span className='qq-header-act'>添加</span>
		</div>
		<div className='qq-body'>
			<div className='qq-fri-search'>
				<SearchBar/>
				<div className='qq-fri-newfri'>
					<span>新朋友</span>
				</div>
			</div>
			<TabContent store={this.props.store} pageview={this}/>
		</div>
	  </div>);
	}
}
export default PageView;
