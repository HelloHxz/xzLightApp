import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Popover extends React.Component {

  constructor(props) {
    super(props)
  }


 onRefresh(){
  this.props.store.refreshListData(this.props.listkey);
 }
  render() {
    var refreshState = this.props.store[this.props.listkey+"RefreshState"];
    return (
          <xz.ScrollView
          refreshState = {refreshState}
          onRefresh={this.onRefresh.bind(this)}
          >{this.props.children}</xz.ScrollView>);
  }
}
export default Popover;
