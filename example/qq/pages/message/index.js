import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import Avatar from "../../components/headeravatar"
import SearchBar from "../../components/searchbar"
import HomeStore from "../home/store"
import Store from './store'
import Popover from './components/popover'
import List from './components/list'
import {observer} from 'mobx-react'

@observer
class PageView extends React.Component {
	static connectStore(){
		return {homeStore:HomeStore,store:Store}
	}

  constructor(props) {
    super(props)
    this.seed = 0;
  }


  showPopver(e){
    this.props.store.headerPopoverConfig = {
      target:e.target,
      direction:"bottom"
    };
  }

  componentDidMount(){
    setTimeout(()=>{
      this.props.store.listRefreshState = "loading";
    },400)
    setTimeout(()=>{
      this.props.store.listRefreshState = "done";
    },2400)
  }

  onRefresh(){
    setTimeout(()=>{
       this.seed +=1;
      this.props.store.listRefreshState = "done"+this.seed;
    },2400)
  }
  render() {
    return (<div>
      <Popover store={this.props.store}/>
    	<div className='qq-header'>
    		<Avatar homestore={this.props.homeStore}/>
        <span className='qq-title'>消息</span>
        <span className='qq-header-act' onClick={this.showPopver.bind(this)}>更多</span>
    	</div>
      <xz.ScrollView 
      refreshState={this.props.store.listRefreshState}
      onRefresh={this.onRefresh.bind(this)}
      className='qq-mes-scroll'>
        <SearchBar/>
      	<List store={this.props.store}/>
        </xz.ScrollView>
      </div>);
  }
}
export default PageView;
