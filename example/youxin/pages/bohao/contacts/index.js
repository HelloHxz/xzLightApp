import React from "react"
import './index.less'
import {xz,Navigation} from "../../../../../index"
import SearchBar from '../../../components/searchbar'
import {observer} from 'mobx-react'
import List from './list'
import PinYinList from './pinyinindex'

@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
  	this.props.store.loadData();
  }

 

  render() {
    return (
    	<div className='youxin-out'>
    	<PinYinList pageview={this.props.pageview} store={this.props.store}/>
    	<xz.ScrollView 
    	ref={(scroll)=>{
    		this.props.pageview.scrollInstance = scroll;
    	}}
    	className='youxin-contacts-page' pageview={this.props.pageview} scrollKey="contact-scroll">
    	<SearchBar/>
        <List pageview={this.props.pageview} 
        	scrollKey="contact-scroll" 
        	store={this.props.store} />
      </xz.ScrollView></div>);
  }
}
export default PageView;
