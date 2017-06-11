import React from "react"
import "./index.less"





class Swiper extends React.Component {
  constructor(props) {
    super(props)

    this.wraperIndex = 0;
    this.sourceIndex = 0;

    this.wrapperArr = [2,0,1];

    this.state = {
    	offset:0
    };

  }



  onTouchStart(e){

    this.starttime = new Date().valueOf();
    this.touchStartValue = e.nativeEvent.touches[0].pageX;
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    this.diff = 0;
    this.offsetValue = this.state.offset;
    
  }

  onTouchMove(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    var curTouchX = e.nativeEvent.touches[0].pageX;
    this.diff =  curTouchX - this.touchStartValue;
    var offset = this.offsetValue+this.diff;
    this.setState({offset:offset});
  }

  ScrollTo(index){

  }
  onTouchEnd(){

  }

	componentWillReceiveProps(nextProps){	

	}

  render() {
  	var classNameArr = ["xz-swiper"];
  	if(this.props.className){
  		classNameArr.push(classNameArr);
  	}else{
  		classNameArr.push("xz-default-swiper");
  	}
  	var children= [];

  	var toucheEvent = {};
	toucheEvent.onTouchStart = this.onTouchStart.bind(this);
	toucheEvent.onTouchMove = this.onTouchMove.bind(this);
	toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
  	children.push(<div className="xz-swiper-item" key='xz-swiper-item-0'>1</div>);
  	children.push(<div className="xz-swiper-item" key='xz-swiper-item-1'>2</div>);
  	children.push(<div className="xz-swiper-item" key='xz-swiper-item-2'>3</div>);
    return (<div {...toucheEvent} className={classNameArr.join(" ")}>{children}</div>);
  }
}

export default Swiper;
