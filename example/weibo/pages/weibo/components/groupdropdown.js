import React from "react"
import Segment from './segment'
import {xz,Navigation} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class DropDownGroup extends React.Component {

  constructor(props) {
    super(props)
  }
 

  render() {
    return (<xz.DropDownGroup className='weibo-header'>
          <span className='weibo-main-header-btn'>相机</span>
          <Segment store={this.props.store}/>
        <span className='weibo-main-header-btn'>扫描</span>
      </xz.DropDownGroup>);
  }
}
export default DropDownGroup;
