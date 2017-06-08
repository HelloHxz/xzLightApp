import React from "react"
import Style from "../../../utils/style"
import "./index.less"

class ScrollView extends React.Component {
  constructor(props) {
    super(props)
  }


  onTouchStart(e){

  }

  onTouchMove(e){

  }

  onTouchEnd(e){

  }


  render() {
  	var refreshHeight = Style.px2rem(100);
  	var refreshStyle = {
  		height:refreshHeight+"rem",
  		background:"red",
  		marginTop:(0-refreshHeight)+"rem"
  	};
    var toucheEvent = {};
    toucheEvent.onTouchStart = this.onTouchStart.bind(this);
    toucheEvent.onTouchMove = this.onTouchMove.bind(this);
    toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
    
    var classNameArr = ['xz-scrollview'];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    return (<div {...toucheEvent} className={classNameArr.join(" ")}>
    	<div className='xz-refresh-control' style={refreshStyle}></div>
    	{this.props.children}</div>);
  }
}

export default ScrollView;
