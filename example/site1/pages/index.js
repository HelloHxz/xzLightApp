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
    return <div key={"xx"+params.index}>
      <img src={params.data.src}/>
    </div>;
  }


  render() {

    var siwperData = [
     {src:"http://img05.tooopen.com/images/20150202/sy_80219211654.jpg",title:"xxx"},
     {
       src:"http://img04.tooopen.com/images/20130701/tooopen_10055061.jpg",title:"xxx",
      },
      {src:"http://img06.tooopen.com/images/20170514/tooopen_sy_210126153448.jpg",title:"xxx"},
      {src:"http://img06.tooopen.com/images/20170514/tooopen_sy_210122159348.jpg",title:"xxx"}
    ];
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

               <xz.Swiper space={30} lazyrender={false} loop={true} interval={1000} cache={false} datasource={siwperData} renderItem = {this.renderSwiperItem.bind(this)}></xz.Swiper>
        </xz.ScrollView>
       </div>);
  }
}
export default PageView;
