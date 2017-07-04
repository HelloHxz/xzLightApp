import React from "react"

import "../css/index.less"
import {xz,style,shallowEqual} from "../../../index"

import globalStore from "../stores/global"
import indexStore from "../stores/index"

import SearchBar from '../components/index/searchbar'
import LoadingLayer from '../components/index/loadinglayer'

import List from '../components/index/list'
import '../fonts/iconfont.css'
import {observer} from 'mobx-react'




var siwperData = [
 {src:"./imgs/1.jpg",title:"xxx"},
 {
   src:"./imgs/2.jpg",title:"xxx",
  },
  {src:"./imgs/3.jpg",title:"xxx"},
  {src:"./imgs/4.jpg",title:"xxx"}
];
var verSwiperData = [
  ["618打折打促销","笔记本大甩卖"],
  ["鞋子化妆品大甩卖","买一送一"],
  ["电器家电半价～","包邮包送家电！！"]
];
var appSwiperData = [
  [
    {"key":"","title":"segment",url:"tabbarpage/segmentdemo/horizontalsegment"},
    {"key":"","title":"one3",url:"threelevelroute/twolevelroute/one"},
    {"key":"","title":"one",url:"twolevelroute/one"},
    {"key":"","title":"index",url:"index"},
    {"key":"","title":"lazyload",url:"lazyload"},
    {"key":"","title":"drawlayout",url:"drawlayoutdemo"},
    {"key":"","title":"sticky",url:"sticky"},
    {"key":"","title":"xx超市",type:"picker"},
    {"key":"","title":"xx超市",type:"datepicker"},
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

var selectorData=[[
  {
    label:"China",
    value:"0",
    children:[
      {label:"Cf2",value:"2",
        children:[
          {label:"CC",value:"2"},
          {label:"CC",value:"2"},
          {label:"CC",value:"2"}
        ]
      },
      {label:"C4",value:"2",
        children:[
          {label:"CC2",value:"2"},
          {label:"CC3",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"Cs",value:"2",
        children:[
          {label:"CC2",value:"2"},
          {label:"CC4",value:"2"},
          {label:"CC5",value:"2"}
        ]},
      {label:"Cds",value:"2",
        children:[
          {label:"CC6",value:"2"},
          {label:"CC3",value:"2"},
          {label:"CC",value:"2"}
        ]},
    ]
  },
  {
    label:"USA",
    value:"1",
    children:[
      {label:"C1",value:"2",
        children:[
          {label:"CC1",value:"2"},
          {label:"CC",value:"2"},
          {label:"CC",value:"2"}
        ]},
      {label:"C1",value:"2",
        children:[
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"C1",value:"2",
        children:[
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"C1",value:"2",
        children:[
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
    ]
  }

],[
  {
    label:"xxx",
    value:"xxx"
  },
   {
    label:"x11xx",
    value:"xxx"
  },

]];

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
  }


  componentDidMount(){
    setTimeout(()=>{
      this.props.indexStore.mainLoadingStatus = "none";
    },1000)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.state, nextState)
    );
  }

 



  showPage(){
    this.props.base.showPage({
      pageKey:"slidepage",
      animateType:"fromLeft"
    });
  }


  renderSwiperItem(params){
    return (<xz.Image className="index-top-swipe-image" src={params.data.src} key={"xx"+params.index}></xz.Image>);
  }

  SwiperAppItemClick(itemdata){
    var url = itemdata.url;
    if(url){
      this.props.pagemanager.go(url,{someparam:1});
    }else{
      if(itemdata.type==="picker"){
       this.props.indexStore.isShowSelector = true;
      }else{
        this.props.indexStore.showDatePicer = true;
      }
    }
  }


  renderAppSwiper(params){
    var child = [];
    for(var i=0,j=params.data.length;i<j;i++){
      child.push(<li onClick={this.SwiperAppItemClick.bind(this,params.data[i])} key={i}><div className='swiper-app-icon'></div><span className='swiper-app-title'>{params.data[i].title}</span></li>);
    }
    return <ul className='appswiper-ul' key={"xxx"+params.index}>{child}</ul>

  }

  renderVerSwiperItem(params){
    var child = [];
   for(var i=0,j=params.data.length;i<j;i++){
      child.push(<div className='swiper-ver-item' key={"xx"+i}>{params.data[i]}</div>);
   }
    return <div>{child}</div>;
  }
  renderIndicatorVer(params){
    return null;
  }

  onRefreshClose(){
    this.props.indexStore.searchBarStatus = "show";
  }

  onTouchMove(params){
    var scrollTop = params.scroller.scrollTop;
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


  onRenderDefault(){
    return <span className="default-img">默认图</span>
  }
  renderHorScrollChild(){
    var re = [];
    for(var i=0;i<10;i++){
      re.push(<xz.Image  scrollKey="mainhorscroll"
            pageview={this} backgroundSize="cover" onRenderDefault={this.onRenderDefault.bind(this)} className="hor-s-item" src="./imgs/2.jpg" key={"xx"+i}></xz.Image>);
    }
    return <div className="hor-s-item-wrapper">{re}</div>;
  }

  onScroll(params){
    if(params.scroller.scrollTop<80&&!this.props.indexStore.searchBarIsOpacity){
      this.props.indexStore.searchBarIsOpacity = true;
    }

    if(params.scroller.scrollTop>200&&this.props.indexStore.searchBarIsOpacity){
      this.props.indexStore.searchBarIsOpacity = false;
    }
  }

  onPageBeforeLeave(){
    this.topswiper.stopInterval();
    this.verSwiper.stopInterval();
    return true;
  }


  onPageResume(){
    this.topswiper.startInterval();
    this.verSwiper.startInterval();
  }

  onScrollToTail(){ 
    this.props.indexStore.loadMoreData();
  }



  renderAppIndicator(){
    return null;
  }

  selBackLayerClick(){
    this.props.indexStore.isShowSelector = false;
  }

  hideDatePicker(){
    this.props.indexStore.showDatePicer = false;
  }



  render() {
    return (<div>
        <xz.DatePicker 
         onBackLayerClick={this.hideDatePicker.bind(this)}
        show={this.props.indexStore.showDatePicer}/>
        <xz.Picker 
        onBackLayerClick={this.selBackLayerClick.bind(this)}
        datasource={selectorData}
        cascadeCount={3}
        show={this.props.indexStore.isShowSelector}
        loadData={[]}></xz.Picker>
        <SearchBar store={this.props.indexStore} pageview={this}/>
        <LoadingLayer store={this.props.indexStore}/>
        <xz.ScrollView 
          scrollKey="mainscroll"
          pageview={this}
          onScrollToTail={this.onScrollToTail.bind(this)}
          onRefreshClose={this.onRefreshClose.bind(this)} 
          onTouchMove={this.onTouchMove.bind(this)} 
          onLoadMore ={this.onLoadMore.bind(this)}
          onRefresh={this.onRefresh.bind(this)} 
          onScroll={this.onScroll.bind(this)}
          className={"main-scroll"}>
          <xz.Swiper ref={(instance)=>{this.topswiper = instance;}} 
            className="top-swiper"
            lazyrender={false} 
            loop={true} 
            interval={3000} 
            cache={false} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </xz.Swiper>

          <xz.Swiper renderIndicator={this.renderAppIndicator.bind(this)} className='app-swiper' cache={true} datasource={appSwiperData} renderItem={this.renderAppSwiper.bind(this)}/>
         
          <div className='index-ver-siwper-wrapper'>
            <xz.Swiper className='index-ver-swiper' datasource={verSwiperData}
              renderItem={this.renderVerSwiperItem.bind(this)}
              ref={(instance)=>{this.verSwiper = instance;}}
              direction="vertical"
              touchenable={false}
              loop={true}
              renderIndicator={this.renderIndicatorVer.bind(this)}
              interval={2000}
            ></xz.Swiper>
          </div>
           <xz.ScrollView 
            scrollKey="mainhorscroll"
            pageview={this}
            onLoadMore ={this.onLoadMoreHor.bind(this)}
            onRefresh={this.onRefreshHor.bind(this)} 
            direction='horizontal' className='app-horizon-scroll'>
              {this.renderHorScrollChild()}
          </xz.ScrollView> 
       
       
          <List pageview={this} store={this.props.indexStore}/>
         
          <xz.LoadingLayer status={this.props.indexStore.listLoadingStatus}  type="android" className="list-loading"/>
        </xz.ScrollView>
       
       </div>);
  }
}
export default PageView;
