import React from "react"


import "../css/index.less"
import {xz,style,shallowEqual} from "../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor");
    this.state={
      refreshing:"sss"
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.state, nextState)
    );
  }

  clickHandle(params){
    if(params===1){
     // this.props.pagemanager.go("lazyload");
     this.props.pagemanager.refreshApp();
    }else if(params===2){
      this.props.pagemanager.go("threelevelroute/twolevelroute/one");
    }else if(params===3){
      this.props.pagemanager.go("twolevelroute/one");
    }else{
       this.props.pagemanager.go("index",{x:111});
    }
  }
  gotoTabbar(){
    this.props.pagemanager.go("tabbarpage/segmentdemo",{x:111});
  }

  onPageResume(){
  }



  onPageBeforeLeave(){

    return true;
  }

  showPage(){
    this.props.base.showPage({
      pageKey:"index",
      animateType:"fromLeft"
    });
  }

  render() {
    return (<div className='full-screen'>
      <div className='app-header'></div>
      <xz.ScrollView>asdashuxiaozhong</xz.ScrollView>
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
       <xz.Button onClick={this.showPage.bind(this,3)}>我已审批</xz.Button></div></div>);
  }
}
export default PageView;
