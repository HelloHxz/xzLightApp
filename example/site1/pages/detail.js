import React from "react"
import globalStore from "../stores/global"

import {observer} from 'mobx-react'
import {xz,style,shallowEqual} from "../../../index"
import "../css/detail.less"

import Segment from '../components/detail/headersegment'
import GoodInfoPage from '../components/detail/goodinfo'
import DetailStore from "../stores/detail"



var pagedata = [
  "goodinfo",
  "desc",
  "comment"
];

@observer
class PageView extends React.Component {

  static connectStore(){
    return {store:new DetailStore}
  }

  constructor(props) {
    super(props)
  }

  renderPageIndicator(){
    return null;
  }
 
  renderSwiperPage(params){
    if(params.data==="goodinfo"){
      return <GoodInfoPage/>;
    }
    return <span>111</span>;
  }
 
  render() {
    return (<div className='full-screen'>
      <div className='detail-header'>
         <Segment store={this.props.store}/>
      </div>
      <xz.Swiper
        touchenable={false}
        renderIndicator={this.renderPageIndicator.bind(this)}
        selectedIndex={this.props.store.segmentSelectedIndex}
        className="detail-content-swiper"
        loop={false}
        renderItem={this.renderSwiperPage.bind(this)}
        cache={true}
        lazyrender={true}
        datasource={pagedata}
      >
      </xz.Swiper>
    	</div>);
  }
}
export default PageView;
