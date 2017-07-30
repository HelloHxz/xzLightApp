import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class ShopScroll extends React.Component {
  constructor(props) {
    super(props)
    this.limit = style.rem2px(.5);
    this.rad = Math.random()*1000;
     var u = navigator.userAgent;
    this.disableCheckSticky = u.indexOf("QYZone")>=0&&(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
  }

  onScroll(params){
    //优化防止抖动 在动画的时候 不再进行判断
    // if(this.disableCheckScroll === true){
    //   return;
    // }
    var preS = this.preScroll||0;
    var curS = params.scroller.scrollTop;
    if(curS>preS&&curS>=this.limit&&this.props.shopStore.UIisOpen){
      this.props.shopStore.UIisOpen=false;
      //优化防止抖动 在动画的时候 不再进行判断
      this.disableCheckScroll = true;
      setTimeout(()=>{
        this.disableCheckScroll = false;
      },300)
    }
    if(curS<preS&&curS<=1&&!this.props.shopStore.UIisOpen){
      this.props.shopStore.UIisOpen=true;

      //优化防止抖动 在动画的时候 不再进行判断
      this.disableCheckScroll = true;
      setTimeout(()=>{
        this.disableCheckScroll = false;
      },300)
    }
    this.preScroll =  params.scroller.scrollTop;
  }
  
  render() {
    var className = this.props.className||"";
    var scrollKey = {};
    if(this.props.scrollKey){
      scrollKey.scrollKey = this.props.scrollKey;
    }
    return (<xz.ScrollView 
      disableCheckSticky={this.disableCheckSticky}
      ref={(instance)=>{
        if(this.props.role==='diancairight'){
          this.props.pageview.diancaiRightScroll = instance;
        }
      }}
      onScroll={this.onScroll.bind(this)}
      {...scrollKey} pageview={this.props.pageview} className={className}>
        {this.props.children}
      </xz.ScrollView>);
  }
}
export default ShopScroll;
