import React from "react"
import {xz,Navigation} from "../../../../../index"
import {observer} from 'mobx-react'
import GuanZhuPage from '../guanzhupage'
import TongChengPage from '../tongchengpage'
import ShiPinPage from '../shipinpage'
import HotPage from '../hotpage'

@observer
class StatusView extends React.Component {

  constructor(props) {
    super(props)
  }
 
  onRenderItem(params){
    if(params.key==="guanzhu"){
      return <GuanZhuPage pkey={params.key} store={this.props.store} pageview={this.props.pageview}/>
    }else if(params.key==="hot"){
      return <HotPage pkey={params.key} store={this.props.store} pageview={this.props.pageview}/>
    }else if(params.key==="tongcheng"){
      return <TongChengPage pkey={params.key} store={this.props.store} pageview={this.props.pageview}/>
    }else if(params.key==="shipin"){
      return <ShiPinPage pkey={params.key} store={this.props.store} pageview={this.props.pageview}/>
    }
    return <div>{params.key}none</div>
  }

  render() {
    return (
          <xz.StatusView
            renderItem = {this.onRenderItem.bind(this)}
           config={this.props.store.statusConfig} className='weibo-main-statusview'>
          </xz.StatusView>);
  }
}
export default StatusView;
