import React from "react"
import globalStore from "../stores/global"

import {observer} from 'mobx-react'




@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }
  
  onPageResume(){
    // alert("one");
  }
  onPageBeforeLeave(){
    return true;
  }

  

  render() {
    return (<div className='full-screen'>
    	slide</div>);
  }
}
export default PageView;
