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
    return (<xz.DropDownGroup 
      renderItem={this.renderItem.bind(this)}
      selectedKey={this.props.store.dropDownGroupSelectedKey} className='weibo-header'>
          <span className='weibo-main-header-btn'>相机</span>
          <Segment store={this.props.store}/>
        <span className='weibo-main-header-btn'>扫描</span>
      </xz.DropDownGroup>);
  }
}
export default DropDownGroup;
