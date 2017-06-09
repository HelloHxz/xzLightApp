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
    this.scrollInnerWidth = 0;
    this.tranDict = Style.getTransitionKeys();
    this.state = {
      selectedKey:props.selectedKey||props.defaultSelectedKey,
      renderKey:0,
      offset:0
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
      },()=>{
        if(this.props.onChange){
          this.props.onChange({
            selectedKey:this.state.selectedKey,
            itemInstance:itemInstance,
            segmentInstance:this
          })
        }
      });

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
        },()=>{

          //  if(this.props.onChange){
          //   this.props.onChange({
          //     selectedKey:this.state.selectedKey,
          //     itemInstance:this.itemDict[this.state.selectedKey],
          //     segmentInstance:this
          //   })
          // }
        });
       
    }
  }

  curStartValue:0

  diff:0

  starttime:0

  onTouchStart(e){

    if(!this.scrollInnerWidth){
       var rect  =this.scrollInner.getBoundingClientRect();
          this.scrollInnerWidth=rect.width;
    }
    this.starttime = new Date().valueOf();
    this.touchStartValue = e.nativeEvent.touches[0].pageX;
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    this.diff = 0;
    this.offsetValue = this.state.offset;
    if(this.scrollEngine){
       this.setState({offset:this.scrollEngine.stop()});
    }
  }

  onTouchMove(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    var curTouchX = e.nativeEvent.touches[0].pageX;
    this.diff =  curTouchX - this.touchStartValue;
    var offset = this.offsetValue+this.diff;
    if(offset>0){
      offset = offset/3;
    }
    this.setState({offset:offset});
  }

  scrollEngine:null

  onTouchEnd(){
    var now = new Date().valueOf(); 
    var diffTime = now - this.starttime;
    
    this.setState({offset:this.state.offset});
    var abs_diff = Math.abs(this.diff);

    var abs_offset = Math.abs(this.state.offset);
    var rightlimit = this.scrollInnerWidth-Style.screen.width;

    if(this.state.offset>0||rightlimit<0){
      var l = this.state.offset; 
      var b = this.state.offset, c =0-l, d = 20, t = 0;
      this.scrollEngine=  Style.run(t, b, c, d);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      });
      return;
    }
    else if(abs_offset>rightlimit){
      var l =(-rightlimit-this.state.offset); 
      var b = this.state.offset, c =l, d = 20, t = 0;
      this.scrollEngine=  Style.run(t, b, c, d);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      });
      return;
    }
    else if(abs_diff>17&&diffTime<300){
      var l = Style.screen.width-this.state.offset; 
      d = 60;
      if(abs_diff<270){
        l = abs_diff/270*l;
        d = 40;
      }
      var fun = null;
      
      if(l+this.state.offset>0&&this.diff>0){
        
        l = 0-this.state.offset;
      }
      if(this.diff<0&&Math.abs(this.state.offset-l)>rightlimit){
        
        l =(rightlimit+this.state.offset);
      }
      var b = this.state.offset, c =this.diff>0? l:0-l, t = 0;
      this.scrollEngine=  Style.run(t, b, c, d);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      },fun);
      return;
    }else{
      this.scrollEngine = null;
    }

    if(abs_diff===0){
    }

    
   

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
        scrollOffset:this.state.offset,
        itemCount:itemCount,
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
      return  <ul className={className}>
      {indicator}
      {children}</ul>;
    }
    var classArr = ["xz-scroll-segment"];
   if(this.props.className){
        classArr.push(this.props.className);
    }
    var moveStyle = {};
    moveStyle[this.tranDict.transform] ="translate3d("+this.state.offset+"px,0,0)";
    return (<div {...toucheEvent} className={classArr.join(" ")}>
       <ul style={moveStyle} 
          ref={(scrollInner)=>{this.scrollInner = scrollInner;}}
            className='xz-segment-ul'>
       {children}
    	</ul>
       {indicator}
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
  return (<li key={"item_"+this.props.itemKey} ref={(instance)=>{this.Dom = instance;}} onClick={this.onClick.bind(this)} className={classNameArr.join(" ")}>
    {children}
      </li>);
  }
}

Segment.Item = Item;


export default Segment;
