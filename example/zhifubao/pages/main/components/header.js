import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"

@observer
class Header extends React.Component {
  constructor(props) {
    super(props)
  }


  renderMinIcons(){
    var children = [];
    var icons = ["icon-saoyisao","icon-dangmianfu","icon-shoukuan","icon-sousuo","icon-tianjia"];
    for(var i=0,j=icons.length;i<j;i++){
      var className= "iconfont "+icons[i];
      children.push(<span key={className} className={className}></span>);
    }
    return children;
  }


  render() {
    if(this.props.homeStore.mainStatusOpen){
      return (<div className='zfb-min-header zfb-open'>
          <div className='zfb-header-search'>
            <span className='iconfont icon-sousuo'></span>
            <span className='zfb-main-searchtext'>火火火火锅</span>
          </div>
          <span className="iconfont icon-addressbook"></span>
          <span className="iconfont icon-tianjia"></span>
        </div>);
    }
    return (<div className='zfb-min-header zfb-close'>{this.renderMinIcons()}</div>);
  }
}
export default Header;
