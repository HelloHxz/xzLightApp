import React from "react"
import "./index.less"
/*
	className
	disabledClassName

*/
class Button extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (<div>{this.props.children}</div>);
  }
}

export default Button;
