import React from "react"
import "./index.less"
import {observer} from 'mobx-react'
import SearchBar from '../../../components/searchbar'
import List from './list'
import PinYinList from './pinyinindex'
import {xz,Navigation} from "../../../../../index"

@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
  	this.props.store.loadData();
  }

  render() {
     return (<div className='weichat-page'>
    	<PinYinList pageview={this} store={this.props.store}/>
    	<div className='weichat-header'><span className='weichat-title'>联系人</span>
    	</div>
    	<xz.ScrollView 
    	ref={(scroll)=>{
    		this.scrollInstance = scroll;
    	}}
      scrollEndDelayTime={30}
    	scrollKey="contact-scroll" pageview={this} className='weichat-scroll'>
    		<SearchBar/>
    		<List pageview={this} scrollKey="contact-scroll" store={this.props.store}/>
    	</xz.ScrollView>
      </div>);
  }
}
export default PageView;
