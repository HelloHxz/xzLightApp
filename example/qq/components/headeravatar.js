import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../index"

@observer
class Avatar extends React.Component {

  constructor(props) {
    super(props)
  }


  onClick(){
    this.props.homestore.showPageConfig = {key:"USERSLIDE",direction:"left",cache:true}
  }


  render() {
  
    return (
        <xz.Image onClick={this.onClick.bind(this)} className='qq-header-avatar'/>
    	);
  }
}
export default Avatar;
