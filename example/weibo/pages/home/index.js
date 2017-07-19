import React from "react"
import "./index.less"
import HomeTabbar from './tabbar'
import {xz,Navigation} from "../../../../index"
import HomeStore from "./store"


class PageView extends React.Component {

  static connectStore(){
    return {store:HomeStore}
  }
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.pagemanager.watchHashChange(this,(urlinfo)=>{
      this.props.store.tabSelectedKey =urlinfo.pathArr.splice(0,2).join("/");
    });
  }

  render() {
    return (<div>
      <Navigation.PageContainer {...this.props} owner={this}/>
      <HomeTabbar pagemanager={this.props.pagemanager} store={this.props.store}/>
      </div>);
  }
}
export default PageView;

