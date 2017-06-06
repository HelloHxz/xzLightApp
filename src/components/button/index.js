import React from "react"
import "./index.less"

/*
	className
	disabledClassName

	type: primary , plat,default

*/

var classNameDict= {
	primary:"xz-btn-primary",
	plat:"xz-btn-plat",
	"default":"xz-btn-default",
	"none":"xz-btn-none"
};
class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick(){
  	this.props.onClick && this.props.onClick(this,arguments);
  }


  render() {
  	var type = this.props.type||"default";
  	var className = classNameDict[type]||"xz-btn-default";
    return (<button onClick={this.onClick.bind(this)} className={className}>{this.props.children}</button>);
  }
}

export default Button;
