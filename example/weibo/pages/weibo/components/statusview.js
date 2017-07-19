import React from "react"
import {xz,Navigation} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class StatusView extends React.Component {

  constructor(props) {
    super(props)
  }
 
  onRenderItem(params){
    return <div>{params.key}</div>
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
