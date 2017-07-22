import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import SearchBar from '../../components/searchbar'


class PageView extends React.Component {

  constructor(props) {
    super(props)
  }
 

  render() {
    return (<div>
    	<SearchBar/>
        关注sss
      </div>);
  }
}
export default PageView;
