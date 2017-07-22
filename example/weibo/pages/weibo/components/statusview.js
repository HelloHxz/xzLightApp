import React from "react"
import {xz,Navigation} from "../../../../../index"
import {observer} from 'mobx-react'
import GuanZhuPage from '../guanzhupage'
import HotPage from '../hotpage'

@observer
class StatusView extends React.Component {

  constructor(props) {
    super(props)
  }
 
  onRenderItem(params){
    if(params.key==="guanzhu"){
      return <GuanZhuPage store={this.props.store}/>
    }else if(params.key==="hot"){
      return <HotPage store={this.props.store}/>
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
