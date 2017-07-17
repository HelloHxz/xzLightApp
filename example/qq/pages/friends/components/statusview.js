import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"
import TabScroll from './tabscroll'
import GroupList from '../../../components/grouplist'

@observer
class StatusView extends React.Component {


  constructor(props) {
    super(props)

    this.limit = style.rem2px(2.5);
  }


  onFriendsSectionHeaderClick(params){
    params.headerInstance.sectionHeaderClick();
  }

  renderFriendListSectionHeader(params){
    return <xz.StickyView disabled={!params.isOpen} scrollKey="friends" pageview={this.props.pageview}>
      <div className='qq-fri-list-sectionheader' onClick={this.onFriendsSectionHeaderClick.bind(this,params)}>
        <span className='qq-list-section-name'>{params.data.name}</span>
      </div>
    </xz.StickyView>
  }

  renderFriendListRow(params){
    return <div className='qq-fri-list-row'>
      <div className='qq-fri-avatar'>
        <xz.Image className='qq-list-avatar'/>
      </div>
      <div className='qq-fri-rowcontent'>
        <span className='qq-fri-content-name'>{params.data.name}</span>
        <div className='qq-content-mes'>[4G在线]一些消息...</div>
      </div>
    </div>
  }

  renderItem(params){
    var child = [];
    if(params.key==="friends"){
      child = <GroupList 
        renderSectionHeader={this.renderFriendListSectionHeader.bind(this)} 
        renderRow = {this.renderFriendListRow.bind(this)}
        datasource={this.props.store.friendsListData}/>
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
