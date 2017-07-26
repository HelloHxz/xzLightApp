import React from "react"
import "./index.less"
import HomeStore from './store'
import SearchBar from './searchbar'
import StickyBar from './stickybar'
import List from './list'
import TopSwiper from './topswiper'
import {xz,Navigation,style} from "../../../../index"


var appSwiperData = [
  [
    {"key":"","title":"美食"},
    {"key":"","title":"美团超市",},
    {"key":"","title":"新鲜果蔬",},
    {"key":"","title":"甜点饮品"},
    {"key":"","title":"正餐优选"},
    {"key":"","title":"美团专送"},
    {"key":"","title":"早餐"},
    {"key":"","title":"跑腿代购"},
  ],
  [
    {"key":"","title":"能量西餐"},
    {"key":"","title":"免配送费"},
    {"key":"","title":"鲜花蛋糕"},
    {"key":"","title":"粥粉面"},
    {"key":"","title":"送药上门"},
    {"key":"","title":"商务便当"},
    {"key":"","title":"小吃馆"},
    {"key":"","title":"日韩料理"}
  ]
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


  SwiperAppItemClick(){
    this.props.pagemanager.go("shop");

  }
  renderAppSwiper(params){
    var child = [];
    for(var i=0,j=params.data.length;i<j;i++){
      child.push(<li onClick={this.SwiperAppItemClick.bind(this,params.data[i])} key={i}><div className='swiper-app-icon'></div><span className='swiper-app-title'>{params.data[i].title}</span></li>);
    }
    return <ul className='appswiper-ul' key={"xxx"+params.index}>{child}</ul>
  }

 
  onPageBeforeLeave(){
    this.topswiper&&this.topswiper.stop();
  }

  onPageResume(){
    this.topswiper&&this.topswiper.start();
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
       <TopSwiper pageview={this}/>
        
         <xz.Swiper className='meituan-app-swiper' cache={true} datasource={appSwiperData} renderItem={this.renderAppSwiper.bind(this)}/>
         
      
      <StickyBar store={this.props.homeStore} pageview={this} scrollKey="meituan-home-scroll"/>
        <List pageview={this} store={this.props.homeStore}/>
        <div style={{height:"30rem"}}></div>
      </xz.ScrollView>
    </div>);
  }
}
export default PageView;
