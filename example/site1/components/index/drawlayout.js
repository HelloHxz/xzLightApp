import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class DrawLayout extends React.Component {

  constructor(props) {
    super(props)
  }


  drawLayoutBKClick(){
    this.props.store.drawLayoutConfig ={};
  }

  drawLayoutRenderItem(params){
    if(params.key==="fromtop"){
      return <div style={{height:"5rem"}}>x</div>;
    }else if(params.key==="frombottom"){
      return <div style={{height:"5rem"}}>x</div>;
    }else if(params.key==="fromleft"){
      return <div style={{width:"8rem"}}>x</div>;
    }else if(params.key==="fromright"){
      return <div style={{width:"8rem"}}>x</div>;
    }else if(params.key==="frompop"){
       return <div style={{width:"6.25rem",height:"6.25rem"}}>x</div>;
    }
    
  }

  render() {
  
    return (
        <xz.DrawLayout 
        onBackLayerClick = {this.drawLayoutBKClick.bind(this)}
        renderItem={this.drawLayoutRenderItem.bind(this)}
        config={this.props.store.drawLayoutConfig}/>
    	);
  }
}
export default DrawLayout;
