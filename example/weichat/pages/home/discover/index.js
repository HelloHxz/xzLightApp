import React from "react"
import "./index.less"
import {observer} from 'mobx-react'
import {xz,Navigation} from "../../../../../index"

@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
    	<div className='weichat-header'><span className='weichat-title'>发现</span></div>
      </div>);
  }
}
export default PageView;
