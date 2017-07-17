import React from "react"
import {observer} from 'mobx-react'
import UserSlide from '../pages/userslide'
import {xz,style,shallowEqual,Navigation} from "../../../index"

@observer
class DrawLayout extends React.Component {

  constructor(props) {
    super(props)
  }


  drawLayoutBKClick(){
    this.props.store.showPageConfig ={};
  }

  drawLayoutRenderItem(params){
    if(params.key==="USERSLIDE"){
      return <UserSlide store={this.props.store} pageview={this.props.pageview}/>
    }

    return null;
    
  }

  render() {
  
    return (
        <xz.DrawLayout 

        onBackLayerClick = {this.drawLayoutBKClick.bind(this)}
        renderItem={this.drawLayoutRenderItem.bind(this)}
        config={this.props.store.showPageConfig}/>
    	);
  }
}
export default DrawLayout;
