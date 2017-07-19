import React from "react"
import "./index.less"
import Store from './store'
import DropDownGroup from './components/groupdropdown'
import {xz,Navigation} from "../../../../index"
import StatusView from './components/statusview'


class PageView extends React.Component {

  static connectStore(){
    return {store:Store}
  }

  constructor(props) {
    super(props)
  }
 

  render() {
    return (<div><DropDownGroup store={this.props.store} />
      <StatusView store={this.props.store}/>
      </div>);
  }
}
export default PageView;
