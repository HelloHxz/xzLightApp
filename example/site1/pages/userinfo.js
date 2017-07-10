import React from "react"
import globalStore from "../stores/global"

import {observer} from 'mobx-react'

import {xz,style,shallowEqual} from "../../../index"

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

  constructor(props) {
    super(props)
  }
  
  onPageResume(){
    // alert("one");
  }
  onPageBeforeLeave(){
    return true;
  }

  renderIndicatorTwo(params){
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:params.itemInstance.Dom.offsetLeft+"px",
      width:style.px2rem(params.itemInstance.Dom.offsetWidth)+"rem",
      height:style.px2rem(5)+"rem",
    };
    var arr = ["segment-indi-nomal"];
    if(params.curIndex!=params.preIndex){
      arr.push("segment-indi-nomal-ani");
    }
    return <div className={arr.join(" ")} style={indicatorStyle}></div>
  }
   renderSwiperItem(params){
    return (<xz.Image className="index-top-swipe-image" src={params.data.src} key={"xx"+params.index}></xz.Image>);
  }

 componentWillUnmount(){
    this.topswiper.stopInterval();
  }

  onPageBeforeLeave(){
    this.topswiper.stopInterval();
    return true;
  }

  

  render() {
    return (
      <div>
      <div className='detail-header'>UserInfo</div>
      <xz.ScrollView style={{flex:1}} scrollKey="userinfoscroll" pageview={this}>
         <xz.Swiper ref={(instance)=>{this.topswiper = instance;}} 
          className="top-swiper"
          lazyrender={false} 
          loop={true} 
          interval={3000} 
          cache={false} 
          datasource={siwperData} 
          renderItem = {this.renderSwiperItem.bind(this)}>
        </xz.Swiper>
        <xz.StickyView  scrollKey="userinfoscroll" pageview={this}>
        <xz.Segment selectedIndex={1} 
          renderIndicator={this.renderIndicatorTwo.bind(this)} className="userinfo-segment" selectedKey="1">
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
         </xz.Segment>

        </xz.StickyView>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
        asd<br/>
      </xz.ScrollView></div>);
  }
}
export default PageView;
