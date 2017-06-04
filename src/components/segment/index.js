import React from "react"
import Style from "../../../utils/style"
import "./index.less"

class Segment extends React.Component {
  constructor(props) {
    super(props)
    this.itemCount = 0;
    this.initItemCount = 0;
    this.preIndex = 0;
    this.itemDict = {};
    this.state = {
      selectedKey:props.selectedKey||props.defaultSelectedKey,
      renderKey:0
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

  itemComponentDidMount(itemKey,itemInstance){
    this.itemDict[itemKey] = itemInstance;
    this.initItemCount+=1;
    if(this.initItemCount===this.itemCount){
      if(this.props.renderIndicator){
        setTimeout(()=>{
          this.setState({renderKey:this.state.renderKey+1});
        },300)
      }
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
   
    var scroll = this.props.scroll === true;
    var toucheEvent = {};
    if(scroll){
      toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
    }
    var itemCount = 0;
    var children = React.Children.map(this.props.children, 
      (child,index) => {
        if(child.type&&typeof(child.type)!=="string"){
          itemCount+=1;
          return React.cloneElement(child, {
            selectedClassName:this.props.selectedClassName||"xz-segment-selected-item",
            scroll:this.props.scroll,
            itemKey:child.key,
            index:index,
            parent:this,
            selectedKey:this.state.selectedKey,
            itemClick:this.itemClick.bind(this)
          });
        }else{
          return child;
        }
      });
    if(this.itemCount===0){
      this.itemCount = itemCount;
    }

    if(this.props.renderIndicator&&this.itemDict[this.state.selectedKey]){
      var selectedItemInstance = this.itemDict[this.state.selectedKey];
      indicator = this.props.renderIndicator({
        itemInstance:selectedItemInstance,
        curIndex:selectedItemInstance.props.index,
        preIndex:this.preIndex,
        rect:selectedItemInstance.Dom.getBoundingClientRect()
      });
      this.preIndex = selectedItemInstance.props.index;
    }
    var className = "";

    if(!scroll){
     if(this.props.className){
        className = 'xz-segment '+(this.props.className);
      }else{
        className = "xz-segment";
      }
      return  <div className={className}>
      {indicator}
      {children}</div>;
    }
    var classArr = ["xz-scroll-segment"];
   if(this.props.className){
        classArr.push(this.props.className);
    }
    return (<div {...toucheEvent} className={classArr.join(" ")}>
       <div className='xz-segment'>
       {children}
      {indicator}
    	</div>
      </div>);
  }
}


class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick(){
    this.props.itemClick&&this.props.itemClick(this.props.itemKey,this);
  }

  componentDidMount(){
    this.props.parent.itemComponentDidMount(this.props.itemKey,this);
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
