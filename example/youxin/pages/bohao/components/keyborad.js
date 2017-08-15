import React from "react"
import {xz,Navigation} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class KeyBord extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    var classNameArr = ["youxin-keyborad"]
    if(this.props.homeStore.showKeyBord){
      classNameArr.push("youxin-keyborad-show");
    }
    return (<div className={classNameArr.join(" ")}>
      </div>);
  }
}
export default KeyBord;
