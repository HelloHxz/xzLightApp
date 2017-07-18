import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import MainScroll from './components/mainscroll'
import HomeStore from "../home/store"
import Store from "./store"
import Header from './components/header'


class PageView extends React.Component {
 
 static connectStore(){
    return {homeStore:HomeStore,store:Store}
 }

 constructor(props) {
    super(props)
  }

  renderTopViewItems(){
    var items = [];
    var child = [{name:"扫一扫",icon:"icon-saoyisao"},{name:"付钱",icon:"icon-dangmianfu"},{name:"收钱",icon:"icon-shoukuan"},{name:"卡包",icon:"icon-huankuan"}];
    for(var i=0,j=child.length;i<j;i++){
      var itemdata = child[i];
      var itemClass = "zfb-top-icon iconfont "+itemdata.icon;
      items.push(<div key={itemdata.name} className='zfb-top-item'>
          <span className={itemClass}></span>
          <span className='zfb-top-name'>{itemdata.name}</span>
        </div>);
    }
    return items;
  }

  render() {
    return (<div>
    	<Header store={this.props.store} homeStore={this.props.homeStore} pageview={this}/>
    	<div className='zfb-main-topv'>
        {this.renderTopViewItems()}
    	</div>
    	<MainScroll pageview={this} homeStore={this.props.homeStore} store={this.props.store}/>
    	</div>);
  }
}
export default PageView;
