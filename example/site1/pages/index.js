import React from "react"


import "../css/index.less"
import {xz,style} from "../../../index"



//style.createSheet(i);

class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor");
    this.state={
      refreshing:"sss"
    };
  }


  clickHandle(params){
    if(params===1){
     this.props.pagemanager.go("lazyload");
    }else if(params===2){
      this.props.pagemanager.go("threelevelroute/twolevelroute/one");
    }else if(params===3){
      this.props.pagemanager.go("twolevelroute/one");
    }else{
       this.props.pagemanager.go("index",{x:111});
    }
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
      <div className='testheader'></div>
      <xz.scrollview>asdashuxiaozhong</xz.scrollview>
      <xz.button type="plat">plat button</xz.button><br/>
      <div className='btn-wrap'>
        <xz.button onClick={this.clickHandle.bind(this,1)} type="primary">primary button</xz.button>
        <xz.button>default button</xz.button>
        <xz.button type="none">none button</xz.button>
      </div>
      <br/>
      <div><xz.button onClick={this.clickHandle.bind(this,1)}>跳转</xz.button>
      <xz.button type='primary' onClick={this.clickHandle.bind(this,2)}>去三级</xz.button>
       <xz.button onClick={this.clickHandle.bind(this,3)}>去二级</xz.button>
       <xz.button onClick={this.clickHandle.bind(this,4)}>GoSame</xz.button>
       <xz.button onClick={this.showPage.bind(this,3)}>我已审批</xz.button></div></div>);
  }
}
export default PageView;
