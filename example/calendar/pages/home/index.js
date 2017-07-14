import React from "react"
import {observer} from 'mobx-react'


@observer
class PageView extends React.Component {



  constructor(props) {
    super(props)
  }
  
 

  render() {
    return (<div>
    	 Calendar
      </div>);
  }
}
export default PageView;
