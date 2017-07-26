import React from "react"
import {observer} from 'mobx-react'
import './list.less'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class List extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
     <div>list</div>
    );
  }
}
export default List;
