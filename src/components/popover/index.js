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

  renderItem(){
    if(this.isInit){
      return null;
    }
    return this.props.renderItem();
  }

  onBackLayerClick(){
    this.props.onBackLayerClick();
  }

  getPos(){
    return {top:0,left:0};
  }

  render() {
    var popClassArr = ["xz-popover"];
    var bkArr = ["xz-popover-bk"];
    if(this.state.target){
      popClassArr.push("xz-popover-show");
      bkArr.push("xz-popover-bk-show");
    }else{
      popClassArr.push("xz-popover-hide");
      bkArr.push("xz-popover-bk-hide");
    }
    var bkClick={};
    if(this.props.onBackLayerClick){
      bkClick.onClick = this.onBackLayerClick.bind(this);
    }
    return (<div style={this.getPos()} ref={(root)=>{this.root = root;}} className={popClassArr.join(" ")}>
      <div {...bkClick} ref={(bkLayer)=>{this.bkLayer = bkLayer;}} className={bkArr.join(" ")}></div>
      <div className='xz-popover-content'>{this.renderItem()}</div></div>);
  }
}

export default Popover;
