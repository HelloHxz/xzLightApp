import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import Avatar from "../../components/headeravatar"
import SearchBar from "../../components/searchbar"
import HomeStore from "../home/store"


class PageView extends React.Component {
	static connectStore(){
		return {homeStore:HomeStore}
	}

  constructor(props) {
    super(props)
  }

  render() {

    return (<div>
    	<div className='qq-header'>
    		<Avatar homestore={this.props.homeStore}/>
        <span className='qq-title'>消息</span>
        <span className='qq-header-act'>更多</span>
    	</div>
      <SearchBar/>
    		Message
      </div>);
  }
}
export default PageView;
