import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }


  itemClick(itemdata){
  	this.props.store.showPageConfig ={};
  	this.props.pageview.props.pagemanager.go(itemdata.url);
  }

  renderItems(){
  	var arr = [{name:"了解会员特权",url:"wallet"},
  	{name:"QQ钱包",url:"wallet"},
  	{name:"个性装扮",url:"wallet"},
  	{name:"我的收藏",url:"wallet"},
  	{name:"我的相册",url:"wallet"},
  	{name:"我的文件",url:"wallet"},];
  	var children=[];
  	for(var i=0,j=arr.length;i<j;i++){
  		var itemdata = arr[i];
  		children.push(<div key={itemdata.name} onClick={this.itemClick.bind(this,itemdata)} className='qq-slide-item'>{itemdata.name}</div>);
  	}
  	return children;
  }

  render() {
    return (<div className='qq-slide-wrapper'>
    	<div className='qq-slide-top'>

    	</div>
    	<xz.ScrollView className='qq-slide-scroll'>
    		{this.renderItems()}
    	</xz.ScrollView>
    	<div className='qq-slide-bottom'></div>
      </div>);
  }
}
export default PageView;
