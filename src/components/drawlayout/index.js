import React from "react"
import "./index.less"



/*
  config:{
    key:"xxx",
    direction:"bottom" //top left right  bottom  pop,
    cache:true, //default false
  }
*/

var directionArr = ["bottom","top","right","left","pop","fadein"];

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

    var needreRender = false;
     if(!config.key||!config){
        for(var key in this.childrenDict){
          if(this.childrenDict[key].config.cache!==true){
             delete this.childrenDict[key];
             needreRender = true;
          }
        }
    }
    if(needreRender){
      setTimeout(()=>{this.setState({seed:1});},250);
    }
    var bkArr = ["xz-drawlayout-bk"];
    if(config&&config.key){
      bkArr.push("xz-drawlayout-bk-show");
      this.preConfig = config;
    }else{
      bkArr.push("xz-drawlayout-bk-hide");
    }

    if(config&&config.showBackCover!==false){
      bk = <div onClick={this.bkClick.bind(this)} className={bkArr.join(" ")}></div>;
    }

    if((!config||!config.key)&&this.preConfig&&this.preConfig.showBackCover===false){
      bk = null;
    }

    return (<div ref={(root)=>{this.root = root;}} className="xz-drawlayout">
      {children}
      {bk}
    </div>);
  }
}

export default DrawLayout;
