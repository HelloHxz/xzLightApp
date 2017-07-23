import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import Avatar from "../../components/headeravatar"
import SearchBar from "../../components/searchbar"
import HomeStore from "../home/store"
import Store from './store'



class PageView extends React.Component {
	static connectStore(){
		return {homeStore:HomeStore,store:Store}
	}

  constructor(props) {
    super(props)
  }




  onRefresh(){}
  render() {

    return (<div>
    	<div className='qq-header'>
    		<Avatar homestore={this.props.homeStore}/>
        <span className='qq-title'>动态</span>
        <span className='qq-header-act'>更多</span>
    	</div>
      <xz.ScrollView 
      onRefresh={this.onRefresh.bind(this)}
      className='qq-blog-scroll'>
        <SearchBar/>
        <div className='qq-blog-topview'>
        	<div className='qq-blog-topitem'>
        		<i className='iconfont icon-aixinjuanzeng'/>
        		<span>动态</span></div>
        	<div className='qq-blog-topitem'>
        	<i className='iconfont icon-ditu'/>
        	<span>附近</span></div>
        	<div className='qq-blog-topitem'>
        	<i className='iconfont icon-yule'/>
        	<span>兴趣部落</span></div>
          </div>
        </xz.ScrollView>
      </div>);
  }
}
export default PageView;
