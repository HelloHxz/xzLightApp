import React from "react"
import Segment from './segment'
import {xz,Navigation} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class DropDownGroup extends React.Component {

  constructor(props) {
    super(props)
  }


  renderItem(params){
    return <div style={{height:"9rem",backgroundColor:"#fff"}}>{params}</div>
  }
 

  render() {
    return (<div className='weibo-header'>
          <Segment  homeStore={this.props.homeStore} store={this.props.store}/>
      </div>);
  }
}
export default DropDownGroup;
