import React from "react"
import "./index.less"
import Store from './store'
import Tabbar from './components/tabbar'
import StatusView from './components/statusview'

import {xz,Navigation} from "../../../../index"


class PageView extends React.Component {

  static connectStore(){
    return {store:Store}
  }

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    var urlParams = this.props.pagemanager.getUrlInfo();
    var pk = urlParams.params.pk||"weixin";
    if(["weixin","contacts","discover","me"].indexOf(pk)<0){
      pk = "weixin";
    }
    this.props.store.tabSelectedKey = pk;
  }

  render() {
    return (<div>
      <StatusView pageview={this} store={this.props.store}/>
      <Tabbar pageview={this} store={this.props.store}/>
      </div>);
  }
}
export default PageView;
