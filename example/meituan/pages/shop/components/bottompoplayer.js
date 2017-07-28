import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"

@observer
class DrawLayout extends React.Component {

  constructor(props) {
    super(props)
  }


  drawLayoutBKClick(){
    this.props.shopStore.showCartPopLayer ={};
  }

  drawLayoutRenderItem(params){
    if(params.key==="CARTLIST"){
      return <div style={{height:"4rem"}}>adasd</div>
    }

    return null;
    
  }

  render() {
  
    return (
        <xz.DrawLayout 

        onBackLayerClick = {this.drawLayoutBKClick.bind(this)}
        renderItem={this.drawLayoutRenderItem.bind(this)}
        config={this.props.shopStore.showCartPopLayer}/>
    	);
  }
}
export default DrawLayout;
