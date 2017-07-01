import React from "react"
import "./index.less"
import Style from "../../../utils/style"


var data = [
  {key:"11",value:"zhon",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"},
  {key:"11",value:"xxx",pkey:"0"}
];
class SelectorColumn extends React.Component{
   constructor(props) {
    super(props)
    props.parent.instanceDict[props.pkey] = this;
    this.tranDict = Style.getTransitionKeys();
    this.state={
      offset:0,
      data:data
    };
    this.bottomLimit = 0-this.props.itemHeight*(this.state.data.length-1);
  }

  onTouchStart(e){
    this.diff = 0;
    this.startY = e.touches[0].pageY;
    this.curOffset = this.state.offset;
    if(this.scrollEngine){
       this.setState({offset:this.scrollEngine.stop()});
    }
  }

  onTouchMove(e){
    this.curY = e.touches[0].pageY;
    this.diff = this.curY - this.startY;
    var offset = this.curOffset+this.diff;
    if(offset>0||this.state.offset<this.bottomLimit ){
      offset = this.curOffset+this.diff/3;
    }
    this.setState({
      offset:offset
    });
  }

  onTouchEnd(e){
    if(this.diff===0){
      return;
    }
    var t=0,b=this.state.offset,d=30;
      this.scrollEngine=  Style.run(t, b, this.getCanScrollDistance(), d);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      },null,()=>{
        console.log(">>>");
      });
  }

  getCanScrollDistance(){
    var maxLen = 600;
    if(this.state.offset>0){
      return 0-this.state.offset;
    }
    if(this.state.offset<this.bottomLimit){
      return this.bottomLimit-this.state.offset;
    }
    var len = 0 ;
    if(this.diff>0){
       len = (0-this.state.offset)<=maxLen?(0-this.state.offset):maxLen;
    }
    if(this.diff<0){
      len = (this.bottomLimit-this.state.offset)<(0-maxLen)?(0-maxLen):(this.bottomLimit-this.state.offset);
    }
    return len;
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


class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.itemHeight = Style.rem2px(1);
    this.instanceDict = {};
    this.itemWidth = Style.screen.width/props.columnKeys.length;
  }


  renderHeader(){
    return <div>xx</div>
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
      columns.push(<SelectorColumn parent={this} pkey={curkey} itemHeight={this.itemHeight} key={curkey}/>);
    }
    return (<div className='xz-selector xz-selector-show'>
        {this.renderHeader()}
        <div 
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
