import React from "react"
import {observer} from 'mobx-react'
import "./index.less"
import {xz,style} from '../../../../index'


@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }
  
 

  render() {
    return (<div style={{width:"100%",height:style.screen.height+"px"}}>
    	  <div className='calendar-header'>Setting</div>
      </div>);
  }
}
export default PageView;
