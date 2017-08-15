import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import ScrollView from './components/scroll'
import SearchBar from '../../components/searchbar'


class PageView extends React.Component {

  constructor(props) {
    super(props)
  }
 

  render() {
    return (<ScrollView listkey={this.props.pkey} store={this.props.store} pageview={this.props.pageview}>
    	<SearchBar/>
        tongcheng
      </ScrollView>);
  }
}
export default PageView;
