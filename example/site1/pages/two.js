import React from "react"
import {xz,Navigation} from "../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor: two");
  }
clickHandle(params){
     this.props.pagemanager.replaceGo("one");
  }

  render() {
    return (<div>zheshiw2<button onClick={this.clickHandle.bind(this)}>ReplaceGo</button></div>);
  }
}
export default PageView;
