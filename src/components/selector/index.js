import React from "react"
import "./index.less"
import Style from "../../../utils/style"



class SelectorColumn extends React.Component{
   constructor(props) {
    super(props)
    props.parent.instanceDict[props.pkey] = this;
    this.tranDict = Style.getTransitionKeys();
    this.state={
      offset:0
    };
  }

  onTouchStart(e){
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
    this.setState({
      offset:offset
    });
  }

  onTouchEnd(e){
    var t=0,b=this.state.offset,c=300,d=30;
      this.scrollEngine=  Style.run(t, b, c, d);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      },null,()=>{
        console.log(">>>");
      });
  }

 


  render() {
    var ty = {};
    ty[this.tranDict.transform] = "translate3d(0,"+(this.props.itemHeight*2+this.state.offset)+"px,0)";
    return (<ul style={ty} className='xz-selector-col'>
        <li>xx</li>
        <li>xx</li>
        <li>xx</li>
        <li>xx</li>
        <li>xx</li>
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
