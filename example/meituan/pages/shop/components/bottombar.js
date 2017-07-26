import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'
import Segment from './segment'
import StatusView from './statusview'

@observer
class BottomBar extends React.Component {
  constructor(props) {
    super(props)
  }

  
  render() {
    return (
    	<div className='meituan-shop-bottom-bar'></div>);
  }
}
export default BottomBar;
