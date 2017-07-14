import React from "react"
import {observer} from 'mobx-react'
import SettingPage from '../setting'
import InBoxPage from '../InBox'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class DrawLayout extends React.Component {

  constructor(props) {
    super(props)
  }


  drawLayoutBKClick(){
    this.props.store.showPageConfig ={};
  }

  drawLayoutRenderItem(params){
    if(params.key==="INBOX"){
      return <InBoxPage/>
    }else if(params.key==="SETTING"){
      return <SettingPage/>
    }
    
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
