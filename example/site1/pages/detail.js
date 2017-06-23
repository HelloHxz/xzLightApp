import React from "react"
import globalStore from "../stores/global"

import {observer} from 'mobx-react'
import {xz,style,shallowEqual} from "../../../index"
import "../css/detail.less"

import MainPage from '../components/detail/main'
import DetailStore from "../stores/detail"





var verticalpagedata=["main","desc"]

@observer
class PageView extends React.Component {

  static connectStore(){
    return {store:new DetailStore}
  }

  constructor(props) {
    super(props)
  }

 
  renderVerticalPageIndicator(){
    return null;
  }


  renderVerticalSwiperPage(params){
    if(params.data==="main"){
      return (<MainPage store={this.props.store}/>)
    }
    return <span>detail</span>;
  }

  render() {
    return (<div>
      <xz.Swiper direction="row" className='good-detail-ver-swiper'
        touchenable={false}
        lazyrender={true}
        cache={true}
        selectedIndex={this.props.store.verticalSwiperSelectedIndex}
        renderItem={this.renderVerticalSwiperPage.bind(this)}
         renderIndicator={this.renderVerticalPageIndicator.bind(this)}
        datasource={verticalpagedata}
        loop={false}
        >
        </xz.Swiper>
    	</div>);
  }
}
export default PageView;
