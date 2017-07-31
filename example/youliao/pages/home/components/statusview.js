import React from "react"
import {xz,Navigation} from "../../../../../index"
import {observer} from 'mobx-react'
import GuanZhuPage from "../guanZhuPage"
import LiuXingPage from "../liuxingPage"
import XinXianPage from "../xinxianPage"

@observer
class StatusView extends React.Component {

  constructor(props) {
    super(props)
  }
 
  onRenderItem(params){
    var key =params.key;
    if(key==="guanzhu"){
      return <GuanZhuPage/>
    }else if(key==="xinxian"){
      return <XinXianPage/>;
    }else if(key==="liuxing"){
      return <LiuXingPage/>
    }
    return <div>{params.key}</div>
  }

  render() {
    return (
          <xz.StatusView
          renderItem = {this.onRenderItem.bind(this)}
           config={this.props.homeStore.statusConfig} className='home-statusview'>
          </xz.StatusView>);
  }
}
export default StatusView;
