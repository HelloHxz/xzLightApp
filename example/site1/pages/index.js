import React from "react"

import "../css/index.less"
import {xz,style,shallowEqual} from "../../../index"

import globalStore from "../stores/global"
import indexStore from "../stores/index"

import {observer} from 'mobx-react'

import '../fonts/iconfont.css'

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



  clickHandle(params){
    if(params===1){
     this.props.pagemanager.go("lazyload");
     // this.props.pagemanager.refreshApp();
    }else if(params===2){
      this.props.pagemanager.go("threelevelroute/twolevelroute/one");
    }else if(params===3){
      this.props.base.close();
      this.props.pagemanager.go("twolevelroute/one");
    }else{
       this.props.pagemanager.go("index",{x:111});
    }
  }
  gotoTabbar(){
    this.props.pagemanager.go("tabbarpage/segmentdemo/horizontalsegment",{x:111});
  }

  onPageResume(){
  }



  onPageBeforeLeave(){

    return true;
  }

  onRefresh(){

  }

  showSearchPage(){
    this.props.base.showPage({
      pageKey:"search",
      animateType:"fadeIn"
    });
  }

  showPage(){
    this.props.base.showPage({
      pageKey:"slidepage",
      animateType:"fromLeft"
    });
  }


  renderSwiperItem(params){
    return <div key={"xx"+params.index}><div key={"xxxx"+params.index}><br/>{params.index}<br/>{params.data}</div></div>;
  }


  render() {
    return (<div className='full-screen'>
      <div className='app-header iconfont icon-selection'></div>
        <xz.ScrollView onRefresh={this.onRefresh.bind(this)} className='full-screen'>
         <div className='search-bar' onClick={this.showSearchPage.bind(this)}></div>
          <xz.Button onClick={this.gotoTabbar.bind(this)} type="plat">goto tabbar</xz.Button><br/>
              <div className='btn-wrap'>
                <xz.Button onClick={this.clickHandle.bind(this,1)} type="primary">primary Button</xz.Button>
                <xz.Button>default button</xz.Button>
                <xz.Button type="none">none button</xz.Button>
              </div>
              <br/>
              <div><xz.Button onClick={this.clickHandle.bind(this,1)}>跳转</xz.Button>
              <xz.Button type='primary' onClick={this.clickHandle.bind(this,2)}>去三级</xz.Button>
               <xz.Button onClick={this.clickHandle.bind(this,3)}>去二级</xz.Button>
               <xz.Button onClick={this.clickHandle.bind(this,4)}>GoSame</xz.Button>
               <xz.Button onClick={this.showPage.bind(this,3)}>我已审批</xz.Button></div>

               <xz.Swiper lazyrender={true} loop={true} interval={1000} cache={true} datasource={["d-s","d-1s","d-2s","d-3s","d-4s"]} renderItem = {this.renderSwiperItem.bind(this)}></xz.Swiper>
        </xz.ScrollView>
       </div>);
  }
}
export default PageView;
