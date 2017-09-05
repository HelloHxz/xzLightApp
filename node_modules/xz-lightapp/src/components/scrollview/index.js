import React from "react"
import Style from "../../../utils/style"
import "./index.less"

class ScrollView extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
  	var refreshHeight = Style.px2rem(100);
  	var refreshStyle = {
  		height:refreshHeight+"rem",
  		background:"red",
  		marginTop:(0-refreshHeight)+"rem"
  	};
    return (<div className='xz-scrollview'>
    	<div className='xz-refresh-control' style={refreshStyle}></div>
    	{this.props.children}</div>);
  }
}

export default ScrollView;
