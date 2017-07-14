import React from "react"
import "./index.less"
import Avatar from "../../components/headeravatar"
import HomeStore from "../home/store"
import {xz,Navigation} from "../../../../index"


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
			Blogs
	  </div>);
	}
}
export default PageView;
