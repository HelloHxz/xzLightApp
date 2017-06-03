import React from "react"
import {XzComponents,Navigation} from "../../../index"

class Com extends React.Component {
  constructor(props) {
    super(props)
  	console.log("constructor 》》》》》》》》");
  }

  onResume(){
  }


  render() {
  	console.log("render");
    return (<div className='full-screen'>第二级的内容
      <Navigation.PageContainer className='full-screen' {...this.props}   owner={this}/></div>);
  }
}
export default Com;
