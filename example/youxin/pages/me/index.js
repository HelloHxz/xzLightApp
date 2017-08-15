import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import HomeStore from '../home/store'

class PageView extends React.Component {
  static connectStore(){
    return {homeStore:HomeStore}
  }
  constructor(props) {
    super(props)
  }
 
   onPageBeforeLeave(params){
    if(params.action!=="前进"){
      if(this.props.homeStore.showPageConfig&&this.props.homeStore.showPageConfig.key){
        this.props.homeStore.showPageConfig = {};
        return false;
      }
    }
    return true;
  }

  render() {
    return (<div><div className='weibo-header'>
        </div>Me</div>);
  }
}
export default PageView;
