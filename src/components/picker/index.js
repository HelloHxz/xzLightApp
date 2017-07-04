import React from "react"
import "./index.less"
import Style from "../../../utils/style"


class SelectorColumn extends React.Component{
   constructor(props) {
    super(props)
    props.parent.instanceDict[props.pkey] = this;
    this.tranDict = Style.getTransitionKeys();
    this.selectedIndex = props.selectedIndex||0;
    this.state={
      offset:0-this.selectedIndex*props.itemHeight,
      data:props.data
    };

    this.scrollHeight =this.props.itemHeight*(this.state.data.length-1);
    this.bottomLimit = 0-this.scrollHeight;
    this.wrapperHeight = this.props.itemHeight*5;
  }

  componentWillReceiveProps(nextPros){
     this.selectedIndex = nextPros.selectedIndex||0;
     console.log(this.selectedIndex);
     this.state={
      offset:0-this.selectedIndex*nextPros.itemHeight,
      data:nextPros.data
    };
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
      if(Math.abs(len)<=1){
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
    if(!this.props.parent.isCascade){
      return;
    }
    if(this.props.columnIndex>=this.props.parent.columnsCount-1){
      return;
    }
    this.selectedIndex = curSelectedIndex;
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
      if (diff_abs >= this.wrapperHeight * 4 / 6) {
          value = this.scrollHeight ;
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
          value = this.props.itemHeight  * 3 ;
          duration = 30;
      }
      else {
          value= this.props.itemHeight*2/3 ;
          duration = 8;
      }

      value = value> this.props.itemHeight *10? this.props.itemHeight *10:value;
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
    this.selectedIndexs = this.getSelectedIndexs(props);
    this.colLength = this.cascadeCount||this.props.datasource.length;
    this.itemWidth = Style.screen.width/this.colLength;
    this.state = {
      seed:1
    }
  
  }


  okMethod(){
    this.props.okMethod&&this.props.okMethod();
  }

  renderHeader(){
    return <div className='xz-picker-header'>
      <div className='xz-picker-cancel'>取消</div>
      <div className='xz-picker-title'>{this.props.title}</div>
      <div className='xz-picker-ok' onClick={this.okMethod.bind(this)}>确定</div>
    </div>
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


  getSelectedIndexs(props){
    //this.columnsCount
    var re = [];
   
    if(props.selectedValues){
      if(this.isCascade){

      }else{

      }
    }else if(props.selectedIndexs){
      if(!(props.selectedIndexs instanceof Array)){
         return this.getDefaultSelectedIndexs();
      }
      return this.getDefaultSelectedIndexs(props.selectedIndexs);
    }else{
      return this.getDefaultSelectedIndexs();
    }
    return this.getDefaultSelectedIndexs();
  }

  getDefaultSelectedIndexs(paramsArr){
    var re=[];
    paramsArr = paramsArr||[];
    for(var i=0;i<this.columnsCount;i++){
      var p = paramsArr[i]||0;
      if(isNaN(p)){
        p=0;
      }else{
        p=parseInt(p);
      }
      re.push(p);
    }
    return re;
  }

  bkClick(){
    this.props.onBackLayerClick&&this.props.onBackLayerClick();
  }

  componentWillReceiveProps(nextPros){

      this.selectedIndexs = this.getSelectedIndexs(nextPros);
      var newState = {
        show:nextPros.show
      }
      this.setState(newState);
    
  }


  renderMidArea(){
    if(this.props.renderMidArea){
      return this.props.renderMidArea();
    }
    return null;
  }



  repaireIndex(index,columData){
  
    if(index<0||index>=columData.length){
      return 0;
    }
    return index;

  }
 


  render() {
    var columns =[];

    if(this.isCascade){
      var preSelectedItemData = null;
      for(var i=0;i<this.columnsCount;i++){
        var curkey = "column_"+i;
        var data = [];
        var selectedIndexInCol = this.selectedIndexs[i];
        if(i===0){
          data = this.props.datasource[0];
          selectedIndexInCol = this.repaireIndex(selectedIndexInCol,data);
          preSelectedItemData = data[selectedIndexInCol].children||[];
        }else{
          data = preSelectedItemData;
          selectedIndexInCol = this.repaireIndex(selectedIndexInCol,data);
          if(!preSelectedItemData[selectedIndexInCol]){
            preSelectedItemData = [];
          }else{
           preSelectedItemData = preSelectedItemData[selectedIndexInCol].children||[];
          }
        }
        columns.push(<SelectorColumn selectedIndex={selectedIndexInCol} columnIndex={i} data={data} parent={this} pkey={curkey} itemHeight={this.itemHeight} key={curkey}/>);
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
        <div className="xz-selector-midarea">{this.renderMidArea()}</div>
        <div className="xz-se-gradient-layer"/>
          {columns}
        </div>
      </div></div>);
  }
}



export default Selector;
