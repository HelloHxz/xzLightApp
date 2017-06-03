import React from "react"


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }
  
  onPageResume(){
    // alert("one");
  }
  onPageBeforeLeave(){
    return true;
  }


  render() {
    return (<div className='full-screen'>
      <div className='app-header'>Segment</div>
    	</div>);
  }
}
export default PageView;
