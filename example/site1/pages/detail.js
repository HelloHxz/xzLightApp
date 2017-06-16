import React from "react"
import globalStore from "../stores/global"

import {observer} from 'mobx-react'
import {xz,style,shallowEqual} from "../../../index"
import "../css/detail.less"

import Segment from '../components/detail/headersegment'
import DetailStore from "../stores/detail"


var siwperData = [
 {src:"./imgs/1.jpg",title:"xxx"},
 {
   src:"./imgs/2.jpg",title:"xxx",
  },
  {src:"./imgs/3.jpg",title:"xxx"},
  {src:"./imgs/4.jpg",title:"xxx"}
];

@observer
class PageView extends React.Component {

  static connectStore(){
    return {store:new DetailStore}
  }

  constructor(props) {
    super(props)
  }

  renderSwiperItem(params){
    return <div key={"xx"+params.index}>
      <img style={{height:"100%"}} src={params.data.src}/>
    </div>;
  }

 
  render() {
    return (<div className='full-screen'>
      <div className='detail-header'>
         <Segment store={this.props.store}/>
      </div>
       <xz.Swiper 
          space={30} 
          className="detail-swiper"
          lazyrender={false} 
          loop={true} 
          interval={1000} 
          cache={false} 
          datasource={siwperData} 
          renderItem = {this.renderSwiperItem.bind(this)}>
        </xz.Swiper>
    	</div>);
  }
}
export default PageView;
