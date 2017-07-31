import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"
import RefreshScroll from '../../components/refreshScroll'


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (<div>
    	<div className='youliao-header'>
    		消息
    	</div>
    	 <RefreshScroll
    	 limitOffset = {style.rem2px(1.3)}
    	 className='flex-scroll'
    	 >
    	  </RefreshScroll>
    	</div>);
  }
}
export default PageView;
