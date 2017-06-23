import React from "react"
import {observer} from 'mobx-react'
import Segment from './headersegment'
import GoodInfoPage from './goodinfo'


import {xz,style,shallowEqual,Navigation} from "../../../../index"

var pagedata = [
  "goodinfo",
  "desc",
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
    }
    return <span>111</span>;
  }
 

  render() {
    return ( <div className="good-detai-main-wrapper">
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
          </xz.Swiper></div>
      )
  }
}
export default Main;
