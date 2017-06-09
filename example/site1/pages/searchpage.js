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

  componentDidMount(){
    this.input.focus();
  }

  

  render() {
    return (<div className='full-screen'>
    	search
      <input type="search" ref={(input)=>{this.input = input;}}/>
      </div>);
  }
}
export default PageView;
