import React from "react"
import "./index.less"

import Style from "../../../utils/style"

class Popover extends React.Component {
  constructor(props) {
    super(props)
    this.isInit = true;
    this.state={
      target:props.target,
      direction:props.direction
    }
    this.dirArr = ["bottom","top","left","right"];
  }

  componentWillReceiveProps(nextPros){
    this.isInit = false;
    var config = nextPros.config||{};
    this.setState({target:config.target,direction:nextPros.direction});
  }

  componentDidMount(){
    var pN = this.root.parentNode,Re;
    while(pN&&pN.tagName&&pN.tagName.toLowerCase()!=="body"){
      if(pN.className.indexOf("xz-page-route-wrapper")>=0){
        Re = pN;
        break;
      }
      pN = pN.parentNode;
    }
    if(Re){
      Re.insertBefore(this.root,null);
    }
  }

  renderChild(){
    if(this.isInit){
      return null;
    }
    var contentArr = ["xz-popover-content"];
    var bkArr = ["xz-popover-bk"];
    if(this.state.target){
      contentArr.push("xz-popover-content-temp-show");
      bkArr.push("xz-popover-bk-show");
    }else{
      contentArr.push("xz-popover-content-hide");
      bkArr.push("xz-popover-bk-hide");
    }
    var bkClick={};
    if(this.props.onBackLayerClick){
      bkClick.onClick = this.onBackLayerClick.bind(this);
    }
    var child = [];

    child.push(<div key="xz-popover-bk" {...bkClick} ref={(bkLayer)=>{this.bkLayer = bkLayer;}} className={bkArr.join(" ")}></div>);
    child.push(<div ref={(content)=>{
      this.content = content;
      this.showContent(content);
     
    }} key="xz-popover-content" 
      className={contentArr.join(" ")}><div className='xz-popover-inner-content'>
      <i ref={(tri)=>{
        this.tri = tri;
      }}></i>{this.props.renderItem()}</div></div>);
    return child;
      
  }

  showContent(content){

    if(content&&this.state.target){
      var rect = this.state.target.getBoundingClientRect();

      // console.log();
      this.tri.className='xz-popover-tri xz-popover-tri-top';
      var direction = (this.state.direction||"").toLowerCase();
      if(this.dirArr.indexOf(direction)<0){
        direction = "bottom";
        if(rect.top-content.offsetHeight>=0){
          direction = "top";
        }else if(rect.bottom+content.offsetHeight<=Style.screen.height){
          direction = "bottom";
        }else if(rect.left-content.offsetWidth>=0){
          direction = "left";
        }else if(rect.right+content.offsetWidth<=Style.screen.width){
          direction = "right";
        }
      }
      var cssText = "";
      switch(direction){
        case "top":
          cssText= "bottom:" +rect.top+"px;";
          cssText = this._getLeft(cssText,rect,content);
        break;
        case "bottom":
          cssText= "top:" +rect.bottom+"px;";
          cssText = this._getLeft(cssText,rect,content);
        break;
        case "right":
          cssText = "left:"+rect.right+"px;";
          cssText = this._getTop(cssText,rect,content);
        break;
        case "left":
          cssText = "right:"+rect.left+"px;";
          cssText = this._getTop(cssText,rect,content);
        break;
        default:
          cssText= "bottom:" +rect.top+"px;";
          cssText = this._getLeft(cssText,rect,content);
        break;
      }
      //dirArr
      content.style.cssText = cssText;
    }
  }

  _getTop(cssText,rect,content){
    //this.tri
    var top = rect.top+rect.width/2-content.offsetHeight/2;
    if(top){

    }
    cssText = cssText+"top:"+top+"px";
    return cssText;
  }

  _getLeft(cssText,rect,content){
    //this.tri
    var ow = content.offsetWidth;
    var left = rect.left+rect.width/2-ow/2;
    if(left+ow>Style.screen.width){
      left = Style.screen.width - ow;
    }
    cssText = cssText+"left:"+left+"px";
    return cssText;
  }

  onBackLayerClick(){
    this.props.onBackLayerClick();
  }

  getPos(){
    if(!this.state.target){
      return {top:0,left:0}
    }
   
    return {top:rect.bottom+"px",left:(rect.left-350)+"px"};
  }

  render() {
   
    return (<div ref={(root)=>{this.root = root;}} className="xz-popover">
        {this.renderChild()}
      </div>);
  }
}

export default Popover;
