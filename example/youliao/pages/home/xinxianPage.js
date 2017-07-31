import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"
import RefreshScroll from '../../components/refreshScroll'

class PageView extends React.Component {

  
  constructor(props) {
    super(props)
  }


  render() {
    return (<RefreshScroll/>);
  }
}
export default PageView;
