import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"
import GroupList from '../../../components/grouplist'

@observer
class QQGroupList extends React.Component {


  constructor(props) {
    super(props)
  }

  onSectionHeaderClick(params){
    params.headerInstance.sectionHeaderClick();
  }

  renderListSectionHeader(params){
    return <xz.StickyView disabled={!params.isOpen} scrollKey={this.props.listkey} pageview={this.props.pageview}>
      <div className='qq-fri-list-sectionheader' onClick={this.onSectionHeaderClick.bind(this,params)}>
        <span className='qq-list-section-name'>{params.data.name}</span>
        <span className='qq-fri-list-sectionheader-left'>4</span>
      </div>
    </xz.StickyView>
  }

  renderListRow(params){
    return <div className='qq-fri-list-row'>
      <div className='qq-fri-avatar'>
        <xz.Image className='qq-list-avatar'/>
      </div>
      <div className='qq-fri-rowcontent'>
        <span className='qq-fri-content-name'>{params.data.name}</span>
      </div>
    </div>
  }


  render() {
    return (
      <div>
      <div className='create-group-btn'>
        <span>创建群</span>
      </div>
      <GroupList 
        renderSectionHeader={this.renderListSectionHeader.bind(this)} 
        renderRow = {this.renderListRow.bind(this)}
        datasource={this.props.store.qqGroupListData}/>
        </div>
        );
  }
}
export default QQGroupList;
