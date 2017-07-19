import React from "react"
import "./index.less"
import Store from './store'
import DropDownGroup from './components/groupdropdown'
import {xz,Navigation} from "../../../../index"
import StatusView from './components/statusview'
import HomeStore from '../home/store'


class PageView extends React.Component {

  static connectStore(){
    return {store:Store,homeStore:HomeStore}
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

  componentDidMount(){
    this.props.store.loadData();
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
