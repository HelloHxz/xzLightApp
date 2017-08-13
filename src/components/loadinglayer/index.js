import React from "react"
import "./index.less"
import Spin from "../spin"

class loadingLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status:props.status||"loading" // or error  or done or success or none 
    };
  }


  renderError(){
    return null;
  }

  renderSuccess(){
    if(this.props.successAutoHide!==false){

    }
    return null;
  }

  renderDone(){
    if(this.props.renderItem){
      var child = this.props.renderItem("done");
    }
    return null;
  }

  componentWillReceiveProps(nextPros){
    if(this.state.status!==nextPros.status){
      this.setState({
        status:nextPros.status
      });
    }
  }

  renderLoading(){
     if(this.props.renderItem){
      var child = this.props.renderItem("loading");
      if(child){
        return child;
      }
    }
    return <Spin type={this.props.type||"ios"}/>;
  }


  render() {
    var classNameArr = ["xz-loadinglayer"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    var status = this.state.status;
    var innerClassNameArr = ["xz-lol-t"];
    var child =null;
    if(status==="error"){
      child = this.renderError();
    }else if(status==="none"){
      classNameArr.push("xz-loadinglayer-none");
    }else if(status==="done"){
      child = this.renderDone();
      if(!child){
        innerClassNameArr.push("xz-loadinglayer-none");
      }
    }else if(status==="success"){
      child = this.renderSuccess();
    }else{
      child = this.renderLoading();
    }

    return (<div className={classNameArr.join(" ")}>
      <div className={innerClassNameArr.join(" ")}>{child}</div>
       {this.props.children}
      </div>);
  }
}

export default loadingLayer;
