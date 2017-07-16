import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation} from "../../../../../index"
import Segment from './segment'
import StatusView from './statusview'

@observer
class TabContent extends React.Component {


  constructor(props) {
    super(props)
  }


  render() {
    var className = ["qq-fri-scroll"];
    className.push(this.props.store.tabContentIsOpen?"qq-fri-scroll-open":"qq-fri-scroll-close");
    return (<div className={className.join(" ")}>
        <Segment store={this.props.store} pageview={this.props.pageview}/>
        <StatusView store={this.props.store} pageview={this.props.pageview}/>
      </div>);
  }
}
export default TabContent;
