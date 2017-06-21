import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class TopArea extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    var status = this.props.store.topAreaStatus;
    var classNameArr = ["goodlis-top-area"];
    classNameArr.push(status==="min"?"goodlis-top-area-min":"")
    return (
      <div className={classNameArr.join(" ")}>
      </div>
    );
  }
}
export default TopArea;
