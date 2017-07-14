import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div style={{width:style.px2px(600)+"px"}}>
    	Slide
      </div>);
  }
}
export default PageView;
