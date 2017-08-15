import React from "react"
import {xz,Navigation} from "../../../../../index"
import {observer} from 'mobx-react'
import ContactsPage from '../contacts'
import RecentPage from '../recentpage'

@observer
class StatusView extends React.Component {

  constructor(props) {
    super(props)
  }
 
  onRenderItem(params){
    if(params.key==="recent"){
      return <RecentPage homeStore={this.props.homeStore} store={this.props.store} pageview={this.props.pageview}/>
    }else if(params.key==="contacts"){
       return <ContactsPage  homeStore={this.props.homeStore} store={this.props.store} pageview={this.props.pageview}/>
    }
    return <div>{params.key}none</div>
  }

  render() {
    return (
          <xz.StatusView
           store={this.props.store}
            renderItem = {this.onRenderItem.bind(this)}
           config={this.props.homeStore.bohaoStatusConfig} className='weibo-main-statusview'>
          </xz.StatusView>);
  }
}
export default StatusView;
