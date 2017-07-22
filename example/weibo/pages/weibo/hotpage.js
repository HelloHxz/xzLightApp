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
        Hot
      </div>);
  }
}
export default PageView;
