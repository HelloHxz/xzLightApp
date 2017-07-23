import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation} from "../../../../../index"
import WeiXinPage from '../weixin'
import WeiXinStore from '../weixin/store'
import DisCoverPage from '../discover'
import ContactsPage from '../contacts'
import ContactsPageStore from '../contacts/store'

import MePage from '../me'

@observer
class StatusView extends React.Component {


  constructor(props) {
    super(props)
  }

  renderItem(params){
    var key =params.key;
    if(key==="weixin"){
      return <WeiXinPage store={WeiXinStore} pageview={this.props.pageview}/>
    }else if(key==="discover"){
      return <DisCoverPage store={this.props.store} pageview={this.props.pageview}/>
    }else if(key==="me"){
      return <MePage store={this.props.store} pageview={this.props.pageview}/>
    }else if(key==="contacts"){
      return <ContactsPage store={ContactsPageStore} pageview={this.props.pageview}/>
    }
    return <div>todo..{params.key}</div>;
  }

  render() {
    return (
      <xz.StatusView 
      renderItem={this.renderItem.bind(this)}
      config={{key:this.props.store.tabSelectedKey,cache:true}}
      className='weichat-statusview'></xz.StatusView>
      );
  }
}
export default StatusView;
