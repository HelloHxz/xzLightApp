import React from "react"
import "./index.less"



/*
  config:{
    key:"xxx",
    direction:"bottom" //top left right  bottom  pop,
    cache:false, //default true
  }
*/

var directionArr = ["bottom","top","right","left","pop"];

class DrawLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config:props.config||{}
    }

    this.childrenDict={};
  }


  componentWillReceiveProps(nextPros){
    if(JSON.stringify(this.state.config)!==JSON.stringify(nextPros.config)){
      this.setState({
        config:nextPros.config||{}
      });
    }
  }

  bkClick(){
    this.props.onBackLayerClick&&this.props.onBackLayerClick();
  }

  renderItem(config){
    if(!this.props.renderItem){
      console.error("DrawLayout 缺少renderItem");
    }
    return this.props.renderItem(config);
  }

  render() {
    // var bk =this.state.config.key? <div className="xz-drawlayout-bk"/>:null;
    var config = this.state.config;
    if(config.key&&!this.childrenDict[config.key]){
      this.childrenDict[config.key] = {
        key:config.key,
        config:config,
        instance:this.renderItem(config)
      };
    }
    var children = [];
    var bk = null;
    for(var key in this.childrenDict){
      var direction = (this.childrenDict[key].config.direction||"bottom").toLowerCase();
      if(directionArr.indexOf(direction)<0){
        direction = "bottom";
      }
      var itemClassArr =["xz-drawlayout-item"];
      if(config.key!==key){

        itemClassArr.push("xz-drawlayout-"+direction+"-hide");
      }else{
        itemClassArr.push("xz-drawlayout-"+direction+"-show");
        
      }
      children.push(
          <div className={itemClassArr.join(" ")} key={key+"_inner"}>
           {this.childrenDict[key].instance}
        </div>);
    }

    var bkArr = ["xz-drawlayout-bk"];
    if(config&&config.key){
      bkArr.push("xz-drawlayout-bk-show");
    }else{
      bkArr.push("xz-drawlayout-bk-hide");
    }

    bk = <div onClick={this.bkClick.bind(this)} className={bkArr.join(" ")}></div>;

   
    return (<div className="xz-drawlayout">
      {children}
      {bk}
    </div>);
  }
}

export default DrawLayout;
