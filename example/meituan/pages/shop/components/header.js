import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'

@observer
class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var classArr = ["meituan-header"];
    if(!this.props.shopStore.UIisOpen){
      classArr.push("meituan-shop-header");
    }
    return (
      <div className={classArr.join(" ")}></div>
      );
  }
}
export default Header;
