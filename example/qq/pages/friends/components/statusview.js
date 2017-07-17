import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"
import TabScroll from './tabscroll'
import FriendsList from './friendslist'
import QQGroupList from './qqgrouplist'
import MultichatList from './multichatlist'
import QQPublicList from './qqpubliclist'


@observer
class StatusView extends React.Component {


  constructor(props) {
    super(props)

    this.limit = style.rem2px(2.5);
  }

  renderItem(params){
    var child = [];
    var key = params.key;
    if(key==="friends"){
      child = <FriendsList  
      listkey={key}   
      store={this.props.store}
      pageview={this.props.pageview} />
    }else if(key==="group"){
      child = <QQGroupList  
      listkey={key}      
      store={this.props.store}
      pageview={this.props.pageview} />
    }else if(key==="multichat"){
      child = <MultichatList 
      listkey={key}      
      store={this.props.store}
      pageview={this.props.pageview} />
    }else if(key==="public"){
      child = <QQPublicList 
      listkey={key}      
      store={this.props.store}
      pageview={this.props.pageview} />
    }else{
       for(var i=0;i<80;i++){
        if(i===4){
          child.push(<xz.StickyView scrollKey={params.key}  pageview={this.props.pageview}  key={i+"ss"}>xxxxxsss</xz.StickyView>);
        }
        child.push(<div key={i}>{i}</div>);
      }
    }
   
    return <TabScroll 
    scrollKey={params.key} 
    store={this.props.store}
    pageview={this.props.pageview} 
    className='qq-fir-scrollview'>
      {child}
    </TabScroll>
  }

  render() {
    return (
        <xz.StatusView className='qq-fri-status' 
        renderItem={this.renderItem.bind(this)} 
        config={this.props.store.tabSelctedConfig}/>
      );
  }
}
export default StatusView;
