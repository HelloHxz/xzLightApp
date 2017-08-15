import React from "react"
import "./index.less"
import Store from './store'
import HomeStore from '../home/store'
import {xz,Navigation} from "../../../../index"
import StatusView from './components/statusview'
import Header from './components/header'


class PageView extends React.Component {

  static connectStore(){
    return {store:Store,homeStore:HomeStore}
  }

 
  constructor(props) {
    super(props)
  }
 

  render() {
    return (<div><Header store={this.props.store} homeStore={this.props.homeStore}/>
        <StatusView store={this.props.store} homeStore={this.props.homeStore} pageview={this}/>
      </div>);
  }
}
export default PageView;
