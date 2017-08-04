import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"
import RefreshScroll from '../../components/refreshScroll'


class PageView extends React.Component {

  
  constructor(props) {
    super(props)
  }


  render() {
    return (<RefreshScroll><br/><br/>关注页面</RefreshScroll>);
  }
}
export default PageView;
