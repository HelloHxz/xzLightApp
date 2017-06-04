import React from "react"
import globalStore from "../stores/global"
import lazyloadStore from "../stores/lazyload"
import {observer} from 'mobx-react'


@observer
class PageView extends React.Component {
   static connectStore(params){
    return {globalStore:globalStore,lazyloadStore:lazyloadStore};
  }

  constructor(props) {
    super(props)
  }

  onPageResume(){
    
  }

  onPageBeforeLeave(){
    return true;
  }

  clickHandle(){
    this.props.base.showPage({
      pageKey:"one"
    });
  }


  render() {
    return (<div>lazyload
      <button onClick={this.clickHandle.bind(this)}>Show</button></div>);
  }
}
export default PageView;
