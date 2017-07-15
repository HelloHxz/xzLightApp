import React from "react"
import "./index.less"
import Avatar from "../../components/headeravatar"
import HomeStore from "../home/store"
import {xz,Navigation} from "../../../../index"
import SearchBar from "../../components/searchbar"


class PageView extends React.Component {
	static connectStore(){
		return {homeStore:HomeStore}
	}
	constructor(props) {
		super(props)
	}

	render() {
	return (<div>
		<div className='qq-header'><Avatar homestore={this.props.homeStore}/></div>
			<SearchBar/>
			Blogs
	  </div>);
	}
}
export default PageView;
