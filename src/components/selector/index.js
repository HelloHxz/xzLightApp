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
    this.selectedIndex = props.selectedIndex||0;
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
    if(this.diffTime>300){
      this.repairDistance();
      return;
    }

    var tad = this.getCanScrollDistance();
    this.goAuto(tad.len,tad.d);
  }

  goAuto(distance,time,){
    var t=0,b=this.state.offset;
      this.scrollEngine = Style.run(t, b,distance , time);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      },null,()=>{
        this.repairDistance();
        this.scrollEngine = null;
      });
  }

  repairDistance(){
      var index  =this.state.offset/this.props.itemHeight;
      index = (0- Math.round(index));
      index = index<0?0:index;
      index = index>this.state.data.length-1?this.state.data.length-1:index;
      var t=0,b=this.state.offset;
      var len = 0-index*this.props.itemHeight-this.state.offset;
      if(Math.abs(len)<=2){
        this.bindNextChildData(index);
        return;
      }
      this.scrollEngine = Style.run(t, b,len,10);
      this.scrollEngine.start((val)=>{
        this.setState({offset:val});
      },null,()=>{
        this.scrollEngine = null;
        this.bindNextChildData(index);
        console.log("end1");
      });
  }

  bindNextChildData(curSelectedIndex){
    this.selectedIndex = curSelectedIndex;
    if(!this.props.parent.isCascade||this.selectedIndex===curSelectedIndex){
      return;
    }
    if(this.props.columnIndex>=this.props.parent.columnsCount-1){
      return;
    }
    var data = this.state.data[curSelectedIndex].children||[];
    var nextKey ="column_"+(this.props.columnIndex+1);
    var nextInstance= this.props.parent.instanceDict[nextKey];
    if(nextInstance){
      nextInstance.bindData(data);
    }
  }

  bindData(data){
    this.selectedIndex = 0;
    this.setState({
      data:data,
      offset:0
    },()=>{
      this.bindNextChildData(0);
    });
    

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
      var duration = 20;
      var value = this.props.itemHeight * 3;
      if (diff_abs >= this.wrapperHeight * 4 / 5) {
          value= this.scrollHeight ;
      }
      else if (diff_abs <= this.wrapperHeight * 4 / 6 && diff_abs >this.wrapperHeight* 3 / 6) {
          value= this.scrollHeight  * 0.8;
          duration =30;
      }
      else if (diff_abs <= this.wrapperHeight * 3 / 6 &&diff_abs > this.wrapperHeight * 2 / 6) {
          value = this.scrollHeight  * 0.6;
          duration = 30;
      }
      else if (diff_abs <= this.wrapperHeight * 2 / 6 &&diff_abs > this.wrapperHeight * 1 / 6) {
          value = this.scrollHeight  * 3 ;
          duration = 20;
      }
      else {
          value= this.props.itemHeight*2/3 ;
          duration = 8;
      }
      return {value:value,duration:duration};
  }
 


  render() {
    var ty = {};
    var child = [];
    for(var i=0,j=this.state.data.length;i<j;i++){
      var itemdata = this.state.data[i];
      child.push(<li key={i}>{itemdata.label}</li>);
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
    this.isCascade = false;
    if(this.props.cascadeCount){
      if(isNaN(this.props.cascadeCount)){
        console.error("cascadeCount 必须为数字");
      }else{
        this.isCascade = true;
        this.cascadeCount = parseInt(this.props.cascadeCount);
      }
    }
    this.columnsCount = this.cascadeCount||this.props.datasource.length;

    this.colLength = this.cascadeCount||this.props.datasource.length;
    this.itemWidth = Style.screen.width/this.colLength;
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
    this.curColumnKey = "column_"+columnIndex;
    this.curColumn = this.instanceDict[this.curColumnKey];
    this.curColumn.onTouchStart(e);
  }

  onTouchMove(e){
     this.curColumn.onTouchMove(e);
  }

  onTouchEnd(){
    this.curColumn.onTouchEnd();
  }


  getSelectedIndexs(){
    var selectedIndexs= this.props.selectedIndexs||[0,0,0];
    return selectedIndexs;
  }

  bkClick(){
    this.props.onBackLayerClick&&this.props.onBackLayerClick();
  }

  componentWillReceiveProps(nextPros){
    if(nextPros.show!==this.state.show){
      this.setState({
        show:nextPros.show
      });
    }
  }
 


  render() {
    var columns =[];

    var selectedIndexs = this.getSelectedIndexs();

    if(this.isCascade){
      var preSelectedItemData = null;
      for(var i=0;i<this.columnsCount;i++){
        var curkey = "column_"+i;
        var data = [];
        if(i===0){
          data = this.props.datasource[0];
          preSelectedItemData = data[selectedIndexs[i]].children||[];
        }else{
          data = preSelectedItemData;
          preSelectedItemData = preSelectedItemData[selectedIndexs[i]].children||[];
        }
        columns.push(<SelectorColumn columnIndex={i} data={data} parent={this} pkey={curkey} itemHeight={this.itemHeight} key={curkey}/>);
      }
    }else{
      for(var i=0;i<this.columnsCount;i++){
        var curkey = "column_"+i;
        var data = this.props.datasource[i];
        columns.push(<SelectorColumn data={data} parent={this} pkey={curkey} itemHeight={this.itemHeight} key={curkey}/>);
      }
    }

    var bkArr = ["xz-drawlayout-bk"];
    var classArr = ["xz-selector"];
    if(this.state.show){
      this.hasShow = true;
      bkArr.push("xz-drawlayout-bk-show");
      classArr.push("xz-drawlayout-bottom-show");
    }else{
      bkArr.push("xz-drawlayout-bk-hide");
      classArr.push(this.hasShow?"xz-drawlayout-bottom-hide":"xz-drawlayout-bottom-hide-n");
    }
   
   var bk = <div onClick={this.bkClick.bind(this)} className={bkArr.join(" ")}></div>;
     // bkArr.push("xz-drawlayout-bk-hide");
 
    return (<div className="xz-drawlayout">
      {bk}
      <div className={classArr.join(" ")}>
        {this.renderHeader()}
        <div 
        ref={(wrapper)=>{this.wrapper = wrapper;}}
        onTouchStart={this.onTouchStart.bind(this)}
        onTouchMove={this.onTouchMove.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
        className="xz-selector-content">
        <div className="xz-selector-midarea"/>
        <div className="xz-se-gradient-layer"/>
          {columns}
        </div>
      </div></div>);
  }
}



export default Selector;
