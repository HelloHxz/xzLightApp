import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'
import DianCai from './diancai'

@observer
class StatusView extends React.Component {
  constructor(props) {
    super(props)
  }

  renderItem(config){
    if(config.key==='diancai'){
      return <DianCai shopStore={this.props.shopStore} pageview={this.props.pageview}/>
    }
    return <div>{config.key}</div>;
  }
  
  render() {
    return (<xz.StatusView renderItem={this.renderItem.bind(this)}
      config={{key:this.props.shopStore.segmentSelectedKey,cache:true}}
      className='meituan-shop-statusview'/>
          );
  }
}
export default StatusView;

