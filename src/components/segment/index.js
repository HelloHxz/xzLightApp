import React from "react"
import Style from "../../../utils/style"
import "./index.less"

class Segment extends React.Component {
  constructor(props) {
    super(props)
  }

  onTouchStart(){
    console.log("start");
  }

  onTouchMove(){

  }

  onTouchEnd(){

  }

  render() {
    var indicator = null;
    if(this.props.renderIndicator){
      indicator = this.props.renderIndicator();
    }
    var scroll = this.props.scroll === true;
    var toucheEvent = {};
    if(scroll){
      toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
    }

    var children = React.Children.map(this.props.children, 
      (child) => {
        if(child.type&&typeof(child.type)!=="string"){
          return React.cloneElement(child, {scroll:this.props.scroll});
        }else{
          return child;
        }
      });
    return (<div {...toucheEvent}>
       <div className='xz-segment'>
      {indicator}
    	{children}</div></div>);
  }
}


class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick(){
    console.log(this.Dom.getBoundingClientRect());
  }

  render() {
    console.log(this.props);
    var scroll = this.props.scroll === true;
    var children = React.Children.map(this.props.children, 
      (child) => {
        if(child.type&&typeof(child.type)!=="string"){
          return React.cloneElement(child, ...this.props);
        }else{
          return child;
        }
    });
    var classNameArr = ["xz-segment-item"];
    if(scroll){
      classNameArr.push("xz-segment-scroll-item");
    }else{
      classNameArr.push("xz-segment-item-flex");
    }
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
  return (<div ref={(instance)=>{this.Dom = instance;}} onClick={this.onClick.bind(this)} className={classNameArr.join(" ")}>
    {children}
      </div>);
  }
}

Segment.Item = Item;


export default Segment;
