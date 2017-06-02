import React from "react"


class PageView extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor :one");
  }
  
  onPageResume(){
    // alert("one");
  }
  onPageBeforeLeave(){
    return true;
  }

  clickHandle(params){
     this.props.pagemanager.go("threelevelroute/twolevelroute/two");
  }
  testClick(){
  	this.props.pagemanager.go("twolevelroute/one_a",{test:"1"});
  }
  replaceGo(){
    //this.props.pagemanager.replaceGo("threelevelroute/twolevelroute/one_b",{test:"1111"});
    this.props.pagemanager.replaceGo("one");
  }

  render() {
    return (<div className='full-screen'>
    	{this.props.params.test||"没有"}
    	<button onClick={this.testClick.bind(this)}>GotoSame</button>
      <button onClick={this.replaceGo.bind(this)}>replaceGo</button>
    	<button onClick={this.clickHandle.bind(this)}>GoTwo</button></div>);
  }
}
export default PageView;
