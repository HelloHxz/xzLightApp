import React from "react"
import Style from "../../../utils/style"
import "./index.less"

class Segment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKey:props.selectedKey||props.defaultSelectedKey
    }
  }

  itemClick(key,itemInstance){
    if(this.props.onItemClickChange){
      if(this.props.onItemClickChange({
        nextKey:key,
        selectedKey:this.state.selectedKey,
        itemInstance:itemInstance,
        segmentInstance:this
      })===false){
        return;
      }
    }
    if(this.state.selectedKey!==key){
      this.setState({
        selectedKey:key
      });

    }

    if(this.props.onChange){
      this.props.onChange({
        selectedKey:this.state.selectedKey,
        itemInstance:itemInstance,
        segmentInstance:this
      })
    }

  }

  componentWillReceiveProps(nextProps){
   if(this.state.selectedKey!==nextProps.selectedKey){
        this.setState({
          selectedKey:nextProps.selectedKey
        });
        if(this.props.onChange){
          this.props.onChange({
            selectedKey:this.state.selectedKey,
            itemInstance:itemInstance,
            segmentInstance:this
          })
        }
    }
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
          return React.cloneElement(child, {
            selectedClassName:this.props.selectedClassName||"xz-segment-selected-item",
            scroll:this.props.scroll,
            itemKey:child.key,
            selectedKey:this.state.selectedKey,
            itemClick:this.itemClick.bind(this)
          });
        }else{
          return child;
        }
      });
    var className = "";
    if(!scroll){
      if(this.props.className){
        className = 'xz-segment '+this.props.className;
      }
      return  <div className={className}>
      {indicator}
      {children}</div>;
    }
     if(this.props.className){
        className = this.props.className;
      }
    return (<div {...toucheEvent} className={className}>
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
    this.props.itemClick&&this.props.itemClick(this.props.itemKey,this);
  }

  render() {
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
    if(this.props.selectedKey === this.props.itemKey){
      classNameArr.push(this.props.selectedClassName);
    }
  return (<div key={"item_"+this.props.itemKey} ref={(instance)=>{this.Dom = instance;}} onClick={this.onClick.bind(this)} className={classNameArr.join(" ")}>
    {children}
      </div>);
  }
}

Segment.Item = Item;


export default Segment;
