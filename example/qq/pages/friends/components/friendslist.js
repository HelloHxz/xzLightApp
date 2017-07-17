import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"
import GroupList from '../../../components/grouplist'

@observer
class FriendsList extends React.Component {


  constructor(props) {
    super(props)
  }

   onFriendsSectionHeaderClick(params){
    params.headerInstance.sectionHeaderClick();
  }

  renderFriendListSectionHeader(params){
    return <xz.StickyView disabled={!params.isOpen} scrollKey={this.props.listkey} pageview={this.props.pageview}>
      <div className='qq-fri-list-sectionheader' onClick={this.onFriendsSectionHeaderClick.bind(this,params)}>
        <span className='qq-list-section-name'>{params.data.name}</span>
        <span className='qq-fri-list-sectionheader-left'>2/4</span>
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


  render() {
    return (
      <GroupList 
        renderSectionHeader={this.renderFriendListSectionHeader.bind(this)} 
        renderRow = {this.renderFriendListRow.bind(this)}
        datasource={this.props.store.friendsListData}/>
        );
  }
}
export default FriendsList;
