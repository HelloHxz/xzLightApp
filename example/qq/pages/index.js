import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor: two");
  }
   onResume(){
    // alert("two");
  }


  render() {
    return (<div><div className='qq-header'></div>QQ</div>);
  }
}
export default PageView;
