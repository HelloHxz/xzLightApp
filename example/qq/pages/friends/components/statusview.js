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

  renderItem(params){
    var child = [];
    if(params.key==="friends"){
      child = <GroupList datasource={this.props.store.friendsListData}/>
      //friendsListData
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
    className='qq-fir-scrollview'>{params.key}<div style={{height:"25rem"}}>{child}</div></TabScroll>
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
