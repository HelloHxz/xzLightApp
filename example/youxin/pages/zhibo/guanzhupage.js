import React from "react"
import "./index.less"
import ScrollView from './components/scroll'
import {xz,Navigation} from "../../../../index"
import SearchBar from '../../components/searchbar'


class PageView extends React.Component {

  constructor(props) {
    super(props)
  }
 

  render() {
    return (<ScrollView store={this.props.store} listkey={this.props.pkey} pageview={this.props.pageview}>
    	<SearchBar/>
        关注sss
      </ScrollView>);
  }
}
export default PageView;
