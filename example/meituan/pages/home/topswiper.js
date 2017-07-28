import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"
import image1 from '../../imgs/1.jpg'
import image2 from '../../imgs/2.jpg'
import image3 from '../../imgs/3.jpg'
import image4 from '../../imgs/4.jpg'



var siwperData = [
 {src:image1,title:"xxx"},
 {
   src:image2,title:"xxx",
  },
  {src:image3,title:"xxx"},
  {src:image4,title:"xxx"}
];


@observer
class TopSwiper extends React.Component {

  constructor(props) {
    super(props)
  }

  renderSwiperItem(params){
    return (<xz.Image className="index-top-swipe-image" src={params.data.src} key={"xx"+params.index}/>);
  }

  render() {
    return (
          <xz.Swiper ref={(instance)=>{this.props.pageview.topswiper = instance;}} 
            className="meituan-top-swiper"
            lazyrender={false} 
            loop={true} 
            interval={3000} 
            cache={false} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </xz.Swiper>
    	);
  }
}
export default TopSwiper;
