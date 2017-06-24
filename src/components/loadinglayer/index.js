import React from "react"
import "./index.less"
import Spin from "../spin"

class loadingLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status:props.status||"loading" // or error  or done or success
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

  componentWillReceiveProps(nextPros){
    if(this.state.status!==nextPros.status){
      this.setState({
        status:nextPros.status
      });
    }
  }

  renderLoading(){
    return <Spin type={this.props.type||"ios"}/>;
  }


  render() {
    var classNameArr = ["xz-loadinglayer"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    var status = this.state.status;
    var child =null;
    if(status==="error"){
      child = this.renderError();
    }else if(status==="done"){
      classNameArr.push("xz-loadinglayer-done");
    }else if(status==="success"){
      child = this.renderSuccess();
    }else{
      child = this.renderLoading();
    }

    return (<div className={classNameArr.join(" ")}>{child}</div>);
  }
}

export default loadingLayer;
