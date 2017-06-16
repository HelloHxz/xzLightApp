import React from "react"

import "../css/index.less"
import {xz,style,shallowEqual} from "../../../index"

import globalStore from "../stores/global"
import indexStore from "../stores/index"

import SearchBar from '../components/index/searchbar'
import List from '../components/index/list'
import {observer} from 'mobx-react'

import '../fonts/iconfont.css'




var siwperData = [
 {src:"./imgs/1.jpg",title:"xxx"},
 {
   src:"./imgs/2.jpg",title:"xxx",
  },
  {src:"./imgs/3.jpg",title:"xxx"},
  {src:"./imgs/4.jpg",title:"xxx"}
];
var appSwiperData = [
  [
    {"key":"","title":"segment",url:"tabbarpage/segmentdemo/horizontalsegment"},
    {"key":"","title":"one3",url:"threelevelroute/twolevelroute/one"},
    {"key":"","title":"one",url:"twolevelroute/one"},
    {"key":"","title":"index",url:"index"},
    {"key":"","title":"lazyload",url:"lazyload"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"}
  ],
  [
    {"key":"","title":"xx超市2"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"},
    {"key":"","title":"xx超市"}
  ]
];

@observer
class PageView extends React.Component {

  static connectStore(params){
    return {globalStore:globalStore,indexStore:new indexStore};
  }

  constructor(props) {
    super(props)
    
    this.state={
      refreshing:"sss"
    };
    this.seed = 0;
    props.globalStore.selectedIndex = "huxiaozhong";
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.state, nextState)
    );
  }

  onPageResume(){
  }

  onPageBeforeLeave(){
    return true;
  }


  showPage(){
    this.props.base.showPage({
      pageKey:"slidepage",
      animateType:"fromLeft"
    });
  }


  renderSwiperItem(params){
    return <div key={"xx"+params.index}>
      <img style={{width:"100%"}} src={params.data.src}/>
    </div>;
  }

  SwiperAppItemClick(itemdata){
    var url = itemdata.url;
    if(url){
      this.props.pagemanager.go(url,{someparam:1});
    }
  }

  renderAppSwiper(params){
    console.log(params.data);
    var child = [];
    for(var i=0,j=params.data.length;i<j;i++){
      child.push(<li onClick={this.SwiperAppItemClick.bind(this,params.data[i])} key={i}><div className='swiper-app-icon'></div><span className='swiper-app-title'>{params.data[i].title}</span></li>);
    }
    return <ul className='appswiper-ul' key={"xxx"+params.index}>{child}</ul>

  }

  onRefreshClose(){
    this.props.indexStore.searchBarStatus = "show";
  }

  onRefreshMove(params){
    var scrollTop = params.wrapperdom.scrollTop;
    if(this.props.indexStore.searchBarStatus!=="hide"&&params.diff>100&&scrollTop===0){
      this.props.indexStore.searchBarStatus = "hide";
    }
  }

  onRefresh(){

  }

  onLoadMore(){

  }

  onRefreshHor(){

  }

  onLoadMoreHor(){

  }

  onScroll(params){
    if(params.wrapperdom.scrollTop<80&&!this.props.indexStore.searchBarIsOpacity){
      this.props.indexStore.searchBarIsOpacity = true;
    }

    if(params.wrapperdom.scrollTop>200&&this.props.indexStore.searchBarIsOpacity){
      this.props.indexStore.searchBarIsOpacity = false;
    }
  }



  render() {
    return (<div className='full-screen'>
        <SearchBar  store={this.props.indexStore} pageview={this}/>
        <xz.ScrollView 
          scrollkey="mainscroll"
          onRefreshClose={this.onRefreshClose.bind(this)} 
          onRefreshMove={this.onRefreshMove.bind(this)} 
          onLoadMore ={this.onLoadMore.bind(this)}
          onRefresh={this.onRefresh.bind(this)} 
          onScroll={this.onScroll.bind(this)}
          className='full-screen'>
          <xz.Swiper ref={(instance)=>{this.topswiper = instance;}} 
            space={30} 
            className="top-swiper"
            lazyrender={false} 
            loop={true} 
            interval={1000} 
            cache={false} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </xz.Swiper>
          <xz.Swiper className='app-swiper' cache={true} datasource={appSwiperData} renderItem={this.renderAppSwiper.bind(this)}/>
          
          <xz.ScrollView 
          onRefresh={this.onRefreshHor.bind(this)}
          onLoadMore ={this.onLoadMoreHor.bind(this)}
          direction='horizontal' className='app-horizon-scroll'>
              xxxxxxx
          </xz.ScrollView>  

          <List pageview={this} store={this.props.indexStore}/>
        </xz.ScrollView>
       </div>);
  }
}
export default PageView;
