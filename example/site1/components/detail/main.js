import React from "react"
import {observer} from 'mobx-react'
import GoodDetailPage from './gooddetail'
import GoodInfoPage from './goodinfo'


import {xz,style,shallowEqual,Navigation} from "../../../../index"

var pagedata = [
  "goodinfo",
  "detail",
  "comment"
];

@observer
class Main extends React.Component {

  constructor(props) {
    super(props)
  }

  renderPageIndicator(){
    return null;
  }


  renderSwiperPage(params){
    if(params.data==="goodinfo"){
      return <GoodInfoPage store={this.props.store}/>;
    }else if(params.data==="detail"){
       return <GoodDetailPage canpull={true} store={this.props.store}/>;
    }
    return <span>111</span>;
  }
 

  render() {
    return ( 
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
      )
  }
}
export default Main;
