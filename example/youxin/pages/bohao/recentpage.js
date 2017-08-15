import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import SearchBar from '../../components/searchbar'
import KeyBorad from './components/keyborad'


class PageView extends React.Component {

  constructor(props) {
    super(props)
  }
 

  render() {
    return (
    	<div>
    	<KeyBorad store={this.props.store}  homeStore={this.props.homeStore}/>
    	<xz.ScrollView className='full-scoll'>
    	<SearchBar/>
        recent
      </xz.ScrollView>
      </div>);
  }
}
export default PageView;
