import React from "react"
import globalStore from "../stores/global"
import {observer} from 'mobx-react'
import "../css/goodlist.less"
import {xz,style,shallowEqual} from "../../../index"

import goodListStore from "../stores/goodlist"
import TopArea from '../components/goodlist/toparea'




@observer
class PageView extends React.Component {

  static connectStore(){
    return {store:new goodListStore}
  }

  constructor(props) {
    super(props)
  }



  onScroll(params){
    if(!this.bkHeight&&this.coverInstance){
      this.bkHeight = this.coverInstance.offsetHeight;
    }
    if(this.bkHeight){
      if(params.scroller.scrollTop>=this.bkHeight&&this.props.store.topAreaStatus!=="min"){
        this.props.store.topAreaStatus="min"
      }

      if(params.scroller.scrollTop<=this.bkHeight&&this.props.store.topAreaStatus!=="max"){
        this.props.store.topAreaStatus="max"
      }
    
    }
  }



 
  

  render() {
    var list = [];
    for(var i=0;i<30;i++){
      list.push(<div key={i} className='testitem'>{"row_"+i}</div>);
    }
    return (<div>
        <TopArea store={this.props.store} pageview={this}/>
        <xz.ScrollView className="goodlis-scroll"
          onScroll={this.onScroll.bind(this)}>
          <div ref={(bk)=>{this.coverInstance = bk;}} className="goddlis-top-bk"></div>
              {list}
        </xz.ScrollView>
      </div>);
  }
}
export default PageView;
