import React from "react"


import "../css/index.less"
import {XzComponents,style} from "../../../index"



//style.createSheet(i);

class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor");
  }

  onResume(){
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
  showPage(){
    this.props.pageview.showPage({
      pagekey:"two",
      mode:"fromBottom"
    });
  }

  render() {
    return (<div className='full-screen'>
      <div className='testheader'></div>
      <button onClick={this.clickHandle.bind(this,1)}>跳转</button>
      <button onClick={this.clickHandle.bind(this,2)}>去三级</button>
       <button onClick={this.clickHandle.bind(this,3)}>去二级</button>
       <button onClick={this.clickHandle.bind(this,4)}>GoSame</button>
       <button onClick={this.showPage.bind(this,3)}>我已审批</button></div>);
  }
}
export default PageView;
