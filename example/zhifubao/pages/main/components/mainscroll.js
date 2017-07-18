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
    if(curS>=this.limit&&this.props.homeStore.mainStatusOpen){
      this.props.homeStore.mainStatusOpen=false;
    }
    if(curS<=0&&!this.props.homeStore.mainStatusOpen){
      this.props.homeStore.mainStatusOpen=true;
    }
  }

  appClick(itemdata){
    this.props.pageview.props.pagemanager.go(itemdata.url||"yuebao")
  }

  renderMainApps(){
    var children = [];
    var data = [{name:"余额宝",icon:"icon-icon",color:"rgb(255,74,62)",url:"yuebao"},{name:"转账",icon:"icon-zhuanzhang",color:"rgb(227,136,29)"},
    {name:"蚂蚁财富",icon:"icon-guojihuikuan",color:"rgb(255,74,62)"},{name:"充值中心",icon:"icon-shoujichongzhi",color:"rgb(29,127,219)"},
    {name:"淘票票",icon:"icon-diandian",color:"rgb(29,127,219)"},{name:"游戏中心",icon:"icon-youxichongzhi",color:"rgb(227,136,29)"},
    {name:"滴滴出行",icon:"icon-dache",color:"rgb(227,136,29)"},{name:"外卖",icon:"icon-kuaidi",color:"rgb(29,127,219)"},
    {name:"火车票机票",icon:"icon-jipiao",color:"rgb(227,136,29)"},
    {name:"股票",icon:"icon-gupiao",color:"rgb(255,74,62)"}];

    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
      var iconClass = "iconfont "+itemdata.icon;
      children.push(<div key={itemdata.name} onClick={this.appClick.bind(this,itemdata)} className='zfu-main-app-item'>
          <span style={{color:itemdata.color}} className={iconClass}></span>
          <span className='zfu-main-app-name'>{itemdata.name}</span>
        </div>);
    }
    return children;
  }

  render() {
    var className = ["zfb-main-scroll"];
    className.push(this.props.homeStore.mainStatusOpen?"zfb-main-scroll-open":"zfb-main-scroll-close");
    return (<xz.ScrollView onScroll={this.onScroll.bind(this)} className={className.join(" ")}>
      <div className='zfb-main-apps'>
        {this.renderMainApps()}
      </div>
      <div style={{height:"40rem"}}></div>
      </xz.ScrollView>);
  }
}
export default Scroll;
