import React from "react"
import "./refreshspin.less"
import {xz,Navigation,style} from "../../../../../index"

class RefreshSpin extends React.Component {
  constructor(props) {
    super(props)
    this.state={
    	value:props.value,
      animation:props.animation||false
    }
    this.transformkey = style.getTransitionKeys().transform;
  }

  getLeftDegAndRightDeg(num){
  	num = num<0?0:num;
  	num = num>100?100:num;
  	num = parseInt(num);
  	var n = 50;
  	var Rdeg = num > n ? n : num,
        Ldeg = num > n ? num - n : 0;
  	return {
  		left:"rotateZ("+ (360/(2*n)*Ldeg-180) +"deg)"
  		,right:"rotateZ("+ (360/(2*n)*Rdeg-180) +"deg)"
  	};
  }

   componentWillReceiveProps(nextPros){
      this.setState({
        value:nextPros.value||{},
        animation:nextPros.animation
      });
  }

  render() {
  	var leftAndRight = this.getLeftDegAndRightDeg(this.state.value);
  	var leftStyle = {};
  	leftStyle["backgroundColor"] = this.props.borderColor||"lightblue";
  	leftStyle[this.transformkey] = leftAndRight.left;
  	var rightStyle = {};
  	rightStyle[this.transformkey] = leftAndRight.right;
  	rightStyle["backgroundColor"] = this.props.borderColor||"#47b5d9";
  	var pstyle = {};
  	pstyle["backgroundColor"] = this.props.backgroundColor||"#fff";
    var classArr = ["yuebao-spin-wrapper"];
    if(this.state.animation){
      classArr.push("yuebao-span-ani");
    }

    return (<div className={classArr.join(" ")}>   
        <div className="yuebao-spin-circle"></div> 
		    <div className="yuebao-spin-left" ><div style={leftStyle}></div></div>
		    <div className="yuebao-spin-right"><div  style={rightStyle}></div></div>
		    <div className="yuebao-spin-progress" style={pstyle}></div>
		  </div>);
  }
}
export default RefreshSpin;
