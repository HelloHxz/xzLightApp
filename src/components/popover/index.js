import React from "react"
import "./index.less"

import Style from "../../../utils/style"

class Popover extends React.Component {
  constructor(props) {
    super(props)
    this.isInit = true;
    this.state={
      target:props.target
    }
  }

  componentWillReceiveProps(nextPros){
    this.isInit = false;
    var config = nextPros.config||{};
    this.setState({target:config.target});
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

      // console.log(this.tri);
      this.tri.className='xz-popover-tri xz-popover-tri-top';

      content.style.cssText = "top:"+rect.bottom+"px;left:"+(rect.right-content.offsetWidth)+"px;"
    }
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
