import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"


var seed = 0;
function getUniqueKey(){
  seed+=1;
  return "pinyin_"+seed;
}
@observer
class PinYinList extends React.Component {


  constructor(props) {
    super(props)
    this.KeysArr = [];
    this.itemHeight = style.rem2px(.5);
    this.DomDict={};
  }

  renderRow(rowdata){
    return <span data-name={rowdata.name}>{rowdata.name}</span>;
  }

  setPosByName(name,index){
    if(this.props.store.stickyKey!==name){
      this.props.store.stickyKey = name;
      var id = "contact_"+name;
      if(!this.DomDict[id]){
        this.DomDict[id] = document.getElementById(id);
      }
      var indexDom = this.DomDict[id];
      if(indexDom){
        if(this.props.pageview.scrollInstance){
          var scrollTop = indexDom.offsetTop;
          if(name==="A"){
            scrollTop = 0;
          }
          this.props.pageview.scrollInstance.scrollarea.scrollTop = scrollTop;
          if(this.indicator){
            if(!this.rootTop){
              this.rootTop = this.root.getBoundingClientRect().top;
            }
            this.indicator.style["top"] = (index*this.itemHeight-this.itemHeight/2)+"px";
            this.indicator.children[0].innerHTML = name;
              console.log(name);

          }
        }
      }
    }
  }

  onTouchStart(e){
    this.curName = e.target.getAttribute("data-name");
    if(!this.curName){
      return;
    }
    if(this.indicator){
      this.indicator.className = 'weichat-pinyin-wrapper'
    }
    this.curIndex = this.KeysArr.indexOf(this.curName);

    this.setPosByName(this.curName,this.curIndex);
    var touches = e.touches[0];
    this.startY = touches.pageY;
  }

  onTouchEnd(){
    if(this.indicator){
      this.indicator.className = 'weichat-pinyin-wrapper weichat-pinyin-indicator-hide'
    }
  }
  onTouchMove(e){
    if(!this.curName){
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    var curIndex = this.curIndex;
    var touches = e.touches[0];
    var curY = touches.pageY;
    var diff = (curY-this.startY)/this.itemHeight; 
    curIndex = curIndex+diff;
    curIndex = Math.floor(curIndex);
    curIndex = curIndex<0?0:curIndex;
    curIndex = curIndex>=this.KeysArr.length?this.KeysArr.length-1:curIndex;

    this.setPosByName(this.KeysArr[curIndex],curIndex);
  }

  render() {
    var rows = [];
    var data = this.props.store.listData||[];
    this.KeysArr = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
      if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }
      var rowClass=["weichat-pinyin-row"];
      if(itemdata.name===this.props.store.stickyKey){
        rowClass.push("selected");
      }
      this.KeysArr.push(itemdata.name);
      rows.push(<div data-name={itemdata.name} key={itemdata._hxzuid} className={rowClass.join(" ")}>
          {this.renderRow(itemdata)}
        </div>);
    }
    return (
       <div 
       ref={(instance)=>{this.root = instance;}}
       onTouchStart = {this.onTouchStart.bind(this)}
       onTouchEnd= {this.onTouchEnd.bind(this)}
       onTouchMove = {this.onTouchMove.bind(this)}
       className='weichat-pinyin-list'>
        <div ref={(wrap)=>{this.indicator = wrap;}} className='weichat-pinyin-wrapper weichat-pinyin-indicator-hide'>
          <div className='weichat-pinyin-indicator'>
          </div>
        </div>
        {rows}
       </div> 
       );
  }
}
export default PinYinList;
