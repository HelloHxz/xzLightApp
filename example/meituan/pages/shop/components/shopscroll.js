import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class ShopScroll extends React.Component {
  constructor(props) {
    super(props)
    this.limit = style.rem2px(1);
  }

  onScroll(params){
    //优化防止抖动 在动画的时候 不再进行判断
    if(this.disableCheckScroll === true){
      return;
    }

    var curS = params.scroller.scrollTop;
    if(curS>=this.limit&&this.props.shopStore.UIisOpen){
      this.props.shopStore.UIisOpen=false;
     //优化防止抖动 在动画的时候 不再进行判断
      this.disableCheckScroll = true;
      setTimeout(()=>{
        this.disableCheckScroll = false;
      },300)
    }
    if(curS<=0&&!this.props.shopStore.UIisOpen){
      this.props.shopStore.UIisOpen=true;
     //优化防止抖动 在动画的时候 不再进行判断
      this.disableCheckScroll = true;
      setTimeout(()=>{
        this.disableCheckScroll = false;
      },300)
    }
  }
  
  render() {
    var className = this.props.className||"";
    var scrollKey = {};
    if(this.props.scrollKey){
      scrollKey.scrollKey = this.props.scrollKey;
    }
    return (<xz.ScrollView 
      onScroll={this.onScroll.bind(this)}
      {...scrollKey} pageview={this.props.pageview} className={className}>
        {this.props.children}
      </xz.ScrollView>);
  }
}
export default ShopScroll;
