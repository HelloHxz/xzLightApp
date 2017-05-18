import React from "react"
import {XzComponents,Navigation} from "../../../index"

class Com extends React.Component {
  constructor(props) {
    super(props)
  	console.log("constructor");
  }

 

  render() {
    return (<div>third<Navigation.PageContainer {...this.props}  owner={this}/></div>);
  }
}
export default Com;
