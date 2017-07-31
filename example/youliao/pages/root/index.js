import React from "react"
import "./index.less"
import HomeTabbar from './tabbar'
import {xz,Navigation} from "../../../../index"
import RootStore from "./store"

class PageView extends React.Component {
  static connectStore(){
    return {rootStore:RootStore}
  }
  constructor(props) {
    super(props)
  }

   componentDidMount(){
    this.props.pagemanager.watchHashChange(this,(urlinfo)=>{
      this.props.rootStore.tabSelectedKey =urlinfo.pathArr.splice(0,2).join("/");
    });
  }

  render() {
    return (<div>
    	  <Navigation.PageContainer {...this.props} owner={this}/>
    	  <HomeTabbar pagemanager={this.props.pagemanager} rootStore={this.props.rootStore}/>
    	</div>);
  }
}
export default PageView;
