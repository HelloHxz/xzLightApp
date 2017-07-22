import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"

@observer
class tabScroll extends React.Component {


  constructor(props) {
    super(props)
    this.limit = style.rem2px(1);
    //disableCheckSticky
    var u = navigator.userAgent;
    this.disableCheckSticky = u.indexOf("QYZone")>=0&&(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
  }

  onScroll(params){
    //优化防止抖动 在动画的时候 不再进行判断
    if(this.disableCheckScroll === true){
      return;
    }
      var preS = params.scroller.scrollTop;
      setTimeout(()=>{
        var curS = params.scroller.scrollTop;
        if(curS>preS&&curS>=this.limit&&this.props.store.tabContentIsOpen){
          this.props.store.tabContentIsOpen=false;

          //优化防止抖动 在动画的时候 不再进行判断
          this.disableCheckScroll = true;
          setTimeout(()=>{
            this.disableCheckScroll = false;
          },300)
        }
        if(curS<=preS&&curS<=1&&!this.props.store.tabContentIsOpen){
          this.props.store.tabContentIsOpen=true;

          //优化防止抖动 在动画的时候 不再进行判断
          this.disableCheckScroll = true;
          setTimeout(()=>{
            this.disableCheckScroll = false;
          },300)
        }
      },100);
     
  }
  render() {
    return (
        <xz.ScrollView 
          ref={(scrollInstance)=>{
            this.props.pageview.scrollInstanceDict[this.props.scrollKey] = scrollInstance;
          }}
          disableCheckSticky={this.disableCheckSticky}
          onScroll={this.onScroll.bind(this)}
          scrollKey={this.props.scrollKey} 
          pageview={this.props.pageview}  className='qq-fir-scrollview'>
          {this.props.children}
        </xz.ScrollView>
      );
  }
}
export default tabScroll;
