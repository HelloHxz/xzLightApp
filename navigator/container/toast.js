import React from "react"


    /*{
      text:"xx",
      component:<div></div>,
      direction:"top/bottom/center",
      action:"slidein/fadein/none"

    }*/

    // this.toastManager.setState({
      
    // })
class ToastItem extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (<div className='xz-toast-top-slide-show'>test</div>);
  }
}

class Toast extends React.Component {

  constructor(props) {
    super(props)
  }

  test(){
    this.setState({
      test:"ss"
    });
  }


  render() {
    var children = [];
    children.push(<ToastItem key="1"/>);
    return (<div className='xz-toast-wrapper'>{children}</div>);
  }
}
export default Toast;
