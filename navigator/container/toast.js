import React from "react"


    /*{
      text:"xx",
      component:<div></div>,
      direction:"top/bottom/center",
      action:"slidein/fadein/none"

    }*/

var zIndex = 1000;
class ToastItem extends React.Component {

  constructor(props) {
    super(props)
    this.zIndex= zIndex;
    zIndex+=1;
  }

  componentDidMount(){
    setTimeout(()=>{
      this.root.className="xz-toast-top-slide-hide";
      delete this.props.parent.Dict[this.props.pkey];
    },2000)    
  }

  render() {
    return (<div 
      ref={(root)=>{this.root = root;}}
      style={{zIndex:this.zIndex}} className='xz-toast-top-slide-show'>{this.props.config.text}</div>);
  }
}

var seedkey = 0;

class Toast extends React.Component {

  constructor(props) {
    super(props);
    this.Dict = {};
  }

  show(config){
    seedkey+=1;
    var key = "toast_"+seedkey;
    this.Dict[key] = <ToastItem pkey={key} parent={this} config={config} key={key}/>
    this.setState({seed:1})
  }

  tip(){

  }


  render() {
    var children = [];
    for(var key in this.Dict){
      children.push(this.Dict[key]);
    }
    return (<div className='xz-toast-wrapper'>{children}</div>);
  }
}
export default Toast;
