import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import Avatar from "../../components/headeravatar"
import SearchBar from "../../components/searchbar"
import HomeStore from "../home/store"
import Store from './store'
import Popover from './components/popover'


class PageView extends React.Component {
	static connectStore(){
		return {homeStore:HomeStore,store:Store}
	}

  constructor(props) {
    super(props)
  }


  showPopver(e){
    this.props.store.headerPopoverConfig = {
      target:e.target,
      direction:"bottom"
    };
  }
  render() {

    return (<div>
      <Popover store={this.props.store}/>
    	<div className='qq-header'>
    		<Avatar homestore={this.props.homeStore}/>
        <span className='qq-title'>消息</span>
        <span className='qq-header-act' onClick={this.showPopver.bind(this)}>更多</span>
    	</div>
      <SearchBar/>
    		Message
      </div>);
  }
}
export default PageView;
