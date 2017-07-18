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
      var preS = params.scroller.scrollTop;
      setTimeout(()=>{
        var curS = params.scroller.scrollTop;
        if(curS>preS&&curS>=this.limit&&this.props.store.tabContentIsOpen){
          this.props.store.tabContentIsOpen=false;
        }
        if(curS<=preS&&curS<=1&&!this.props.store.tabContentIsOpen){
          this.props.store.tabContentIsOpen=true;
        }
      },100);
     
  }
  render() {
    return (
        <xz.ScrollView 
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
