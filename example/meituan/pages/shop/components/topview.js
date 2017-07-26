import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'
import bk from '../../../imgs/2.jpg'

@observer
class TopView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	console.log(bk);
    return (
    	<div style={{backgroundImage:"url("+bk+")"}} className='meituan-shop-topview'>
    		<div className='meituan-top-content'>某某某店面</div>
    	</div>
      );
  }
}
export default TopView;
