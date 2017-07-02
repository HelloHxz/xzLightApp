import React from "react"
import "./index.less"
import Style from "../../../utils/style"


class SelectorColumn extends React.Component{
   constructor(props) {
    super(props)
    props.parent.instanceDict[props.pkey] = this;
    this.tranDict = Style.getTransitionKeys();
    this.state={
      offset:0,
      data:props.data
    };
    this.scrollHeight =this.props.itemHeight*(this.state.data.length-1);

    this.bottomLimit = 0-this.scrollHeight;
    this.wrapperHeight = this.props.itemHeight*5;
  }

  onTouchStart(e){
     e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.diff = 0;
    this.startTime = (new Date()).valueOf();
    this.startY = e.touches[0].pageY;
    this.curOffset = this.state.offset;
    if(this.scrollEngine){
       this.setState({offset:this.scrollEngine.stop()});
    }

    this.scrollEngine = null; 
    
  }

  onTouchMove(e){
     e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.curY = e.touches[0].pageY;
    this.diff = this.curY - this.startY;
    var offset = this.curOffset+this.diff;
    this.setState({
      offset:offset
    });
  }

  onTouchEnd(e){

    if(this.diff===0){
      this.repairDistance();
      return;
    }
    this.diffTime = (new Date()).valueOf()-this.startTime;
    if(this.diffTime>500){
      this.repairDistance();
      return;
    }
    var t=0,b=this.state.offset;
    var tad = this.getCanScrollDistance();
      this.scrollEngine=  Style.run(t, b,tad.len , tad.d);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      },null,()=>{

        this.repairDistance();
        this.scrollEngine = null;
        console.log(">>>");
      });
  }

  repairDistance(){

  }

  componentWillReceiveProps(props){
    this.setState({
      data:props.data
    });
  }

  getCanScrollDistance(){
    var dAndd = this.getDistanceAndDurtion();
    var maxLen =dAndd.value;
    if(this.state.offset>0){
      return {len:0-this.state.offset,d:dAndd.duration};
    }
    if(this.state.offset<this.bottomLimit){
      return {len:this.bottomLimit-this.state.offset,d:dAndd.duration};
    }
    var len = 0 ;
    if(this.diff>0){
       len = (0-this.state.offset)<=maxLen?(0-this.state.offset):maxLen;
    }
    if(this.diff<0){
      len = (this.bottomLimit-this.state.offset)<(0-maxLen)?(0-maxLen):(this.bottomLimit-this.state.offset);
    }

    return {len:len,d:dAndd.duration};
  }


  getDistanceAndDurtion() {
      var diff_abs = Math.abs(this.diff);
      var duration = 30;
      var value = this.props.itemHeight * 3;
      if (diff_abs > this.wrapperHeight * 3 / 5) {
          value= this.scrollHeight ;
      }
      else if (diff_abs <= this.wrapperHeight * 3 / 5 && diff_abs >this.wrapperHeight* 2 / 5) {
          value= this.scrollHeight  * 0.7;
          duration =25;
      }
      else if (diff_abs <= this.wrapperHeight * 2 / 5 &&diff_abs > this.wrapperHeight * 1 / 5) {
          value= this.scrollHeight  * 0.6;
          duration = 30;
      }
      else {
          value= this.props.itemHeight * 3 ;
          duration = 35;
      }
      return {value:value,duration:duration};
  }
 


  render() {
    var ty = {};
    var child = [];
    for(var i=0,j=this.state.data.length;i<j;i++){
      var itemdata = this.state.data[i];
      child.push(<li key={i}>{itemdata.value}</li>);
    }
    ty[this.tranDict.transform] = "translate3d(0,"+(this.props.itemHeight*2+this.state.offset)+"px,0)";
    return (<ul style={ty} className='xz-selector-col'>
       {child}
      </ul>);
  }
}

//cascade
class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.itemHeight = Style.rem2px(1);
    this.instanceDict = {};
    this.itemWidth = Style.screen.width/props.columnKeys.length;
    this.state = {
      seed:1
    }
  }

  testClick(){
    this.setState({
      seed:2
    });
  }

  renderHeader(){
    return <div onClick={this.testClick.bind(this)}>xx</div>
  }

  onTouchStart(e){
    var columnIndex = Math.floor(e.touches[0].pageX/this.itemWidth);
    this.curColumnKey = this.props.columnKeys[columnIndex];
    this.curColumn = this.instanceDict[this.curColumnKey];
    this.curColumn.onTouchStart(e);
  }

  onTouchMove(e){
     this.curColumn.onTouchMove(e);
  }

  onTouchEnd(){
    this.curColumn.onTouchEnd();
  }
 


  render() {
    var columns =[];
    for(var i=0,j=this.props.columnKeys.length;i<j;i++){
      var curkey = this.props.columnKeys[i];
      var data = this.props.getColumnData({
        key:curkey,
        datasource:this.props.datasource,
        seed:this.state.seed
      });
      columns.push(<SelectorColumn data={data} parent={this} pkey={curkey} itemHeight={this.itemHeight} key={curkey}/>);
    }
    return (<div className='xz-selector xz-selector-show'>
        {this.renderHeader()}
        <div 
        ref={(wrapper)=>{this.wrapper = wrapper;}}
        onTouchStart={this.onTouchStart.bind(this)}
        onTouchMove={this.onTouchMove.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
        className="xz-selector-content">
          {columns}
        </div>
      </div>);
  }
}



export default Selector;
