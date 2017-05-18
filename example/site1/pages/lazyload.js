import React from "react"



class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor :lazyload");
  }

  onPageResume(){
    
  }

  onPageBeforeLeave(){
    alert("s");
  }


  render() {
    return (<div>lazyload</div>);
  }
}
export default PageView;
