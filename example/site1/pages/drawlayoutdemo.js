import React from "react"
import DrawLayouStore from "../stores/drawlayout"
import {observer} from 'mobx-react'
import DrawLayout from '../components/index/drawlayout'
import {xz,style,shallowEqual} from "../../../index"




@observer
class PageView extends React.Component {
  static connectStore(params){
    return {store:new DrawLayouStore};
  }
  constructor(props) {
    super(props)
  }

  showDraw(direction){
      this.props.store.drawLayoutConfig ={"key":"from"+direction,"direction":direction,cache:false};
  }
  

  render() {
    return (<div style={{backgroundColor:"#f1f2f3"}}><div className='detail-header'>~DrawLayout Demo~</div>
      <DrawLayout store={this.props.store}/>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"left")} type="flat">FromLeft</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"bottom")} type="flat">FromBottom</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"top")} type="flat">FromTop</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"right")} type="flat">FromRight</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"pop")} type="flat">pop</xz.Button>
      <br/>
      </div>);
  }
}
export default PageView;
