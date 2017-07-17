import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"

@observer
class Scroll extends React.Component {
  constructor(props) {
    super(props)
    this.limit = style.rem2px(3);

  }
  
  onScroll(params){
    var curS = params.scroller.scrollTop;
    if(curS>=this.limit&&this.props.store.mainStatusOpen){
      this.props.store.mainStatusOpen=false;
    }
    if(curS<=0&&!this.props.store.mainStatusOpen){
      this.props.store.mainStatusOpen=true;
    }
  }

  render() {
    var className = ["zfb-main-scroll"];
    className.push(this.props.store.mainStatusOpen?"zfb-main-scroll-open":"zfb-main-scroll-close");
    return (<xz.ScrollView onScroll={this.onScroll.bind(this)} className={className.join(" ")}>
      <div className='iconfont icon-rectangle390'></div>
      <div style={{height:"40rem"}}></div>
      </xz.ScrollView>);
  }
}
export default Scroll;
