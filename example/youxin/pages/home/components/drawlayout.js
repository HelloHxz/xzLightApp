import React from "react"
import {observer} from 'mobx-react'
import MorePage from '../morepage'
import {xz,style,shallowEqual,Navigation} from "../../../../../index"

@observer
class Com extends React.Component {

  constructor(props) {
    super(props)
  }


  drawLayoutBKClick(){
    this.props.store.showPageConfig ={};
  }

  drawLayoutRenderItem(params){
    if(params.key==="MORE"){
      return <MorePage></MorePage>
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
export default Com;
