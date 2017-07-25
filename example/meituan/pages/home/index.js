import React from "react"
import "./index.less"
import HomeStore from './store'
import SearchBar from './searchbar'
import StickyBar from './stickybar'
import {xz,Navigation,style} from "../../../../index"
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

class PageView extends React.Component {

  static connectStore(){
    return {homeStore:HomeStore}
  }

  constructor(props) {
    super(props)
  }
  

  onRefreshClose(){
    this.props.homeStore.searchBarStatus = "show";
  }

  onTouchMove(params){
    var scrollTop = params.scroller.scrollTop;
    if(this.props.homeStore.searchBarStatus!=="hide"&&params.diff>100&&scrollTop===0){
      this.props.homeStore.searchBarStatus = "hide";
    }
  }

  onRefresh(){

  }

  onScroll(params){
    if(params.scroller.scrollTop<80&&!this.props.homeStore.searchBarIsOpacity){
      this.props.homeStore.searchBarIsOpacity = true;
    }

    if(params.scroller.scrollTop>200&&this.props.homeStore.searchBarIsOpacity){
      this.props.homeStore.searchBarIsOpacity = false;
    }
  }


 renderSwiperItem(params){
    return (<xz.Image className="index-top-swipe-image" src={params.data.src} key={"xx"+params.index}></xz.Image>);
  }


  render() {
    return (<div>
      <SearchBar store={this.props.homeStore}/>
      <xz.ScrollView
      ref={(scroll)=>{this.mainScroll = scroll;}}
      className='meituan-home-scroll'
      stickyOffset = {style.rem2px(1.06)}
      onScroll={this.onScroll.bind(this)}
      scrollKey='meituan-home-scroll'
      pageview={this}
      onTouchMove={this.onTouchMove.bind(this)}
      onRefreshClose = {this.onRefreshClose.bind(this)}
      onRefresh = {this.onRefresh.bind(this)}
      >
         <xz.Swiper ref={(instance)=>{this.topswiper = instance;}} 
            className="meituan-top-swiper"
            lazyrender={false} 
            loop={true} 
            interval={3000} 
            cache={false} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </xz.Swiper>
        A<br/>B<br/>C<br/>D<br/>E<br/>F<br/>
      
      <StickyBar store={this.props.homeStore} pageview={this} scrollKey="meituan-home-scroll"/>
        A<br/>B<br/>C<br/>D<br/>E<br/>F<br/>
        <div style={{height:"30rem"}}></div>
      </xz.ScrollView>
    </div>);
  }
}
export default PageView;
