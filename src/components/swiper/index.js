import React from "react"
import "./index.less"





class Swiper extends React.Component {
  constructor(props) {
    super(props)

    this.wrapperArr = [2,0,1];
    this.sourceArr = [-1,-1,-1];

    this.getNextSourceArr();
    
    this.state = {
    	offset:0
    };

  }

  getNextSourceArr(){
    var len = this.props.datasource.length;
    var mid = this.sourceArr[1];
    mid += 1;
    if(mid>len-1){
      if(this.props.loop){
        mid = 0;
      }else{
        mid -=1;
      }
    }
    var right = mid + 1;
    if(right>len-1){
      if(this.props.loop){
        right = 0;
      }else{
        right = -1;
      }
    }
    var left = mid - 1;
    if(left<0){
      if(this.props.loop){
        left = len-1;
      }else{
        left = -1;
      }
    }
    
  }


  getNextWraperArr(){
    this.wrapperArr.unshift(this.wrapperArr.pop());
  }

  getPreWraperArr(){
    this.wrapperArr.push(this.wrapperArr.shift());
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
    // var datasource = this.props.datasource||[];
    // if(datasource.length===0||datasource.length===1){

    // }
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
