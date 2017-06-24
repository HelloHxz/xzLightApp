import React from "react"
import "./index.less"

class Spin extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
  	var classNameArr = ["xz-spin"];
  	if(this.props.type==="android"){
  		classNameArr.push("android-spin");
  	}else{
		classNameArr.push("ios-spin");
  	}
    return (<span className={classNameArr.join(" ")}></span>);
  }
}

export default Spin;
