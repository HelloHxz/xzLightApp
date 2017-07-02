import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class LoadingLayer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
        <xz.LoadingLayer type="android" className="main-loading" status={this.props.store.mainLoadingStatus}/>
    	);
  }
}
export default LoadingLayer;
