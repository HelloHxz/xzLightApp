import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"
import TopSwiper from './TopSwiper'
import RefreshScroll from '../../components/refreshScroll'


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (<div>
    	 <RefreshScroll>
        <div className='message-search'>
          <div className='message-search-inner'>搜索话题和用户</div>
        </div>
        <TopSwiper pageview={this}/>
      </RefreshScroll>
    	</div>);
  }
}
export default PageView;
