import React from "react"
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
    return (<div>QQ</div>);
  }
}
export default PageView;
