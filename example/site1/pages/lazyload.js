import React from "react"



class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor :lazyload");
  }

  onPageResume(){
    
  }

  onPageBeforeLeave(){
    return true;
  }

  clickHandle(){
    this.props.base.showPage({
      pageKey:"one"
    });
  }


  render() {
    return (<div>lazyload
      <button onClick={this.clickHandle.bind(this)}>Show</button></div>);
  }
}
export default PageView;
