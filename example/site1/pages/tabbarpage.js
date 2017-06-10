
import React from "react"
import "../css/tabbarpage.less"

import tabbarPageStore from "../stores/tabbarpage"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../index"

import TabBar from '../components/tabbarpage/tabbar'

@observer
class PageView extends React.Component {

  static connectStore(params){
    return {store:new tabbarPageStore};
  }

  constructor(props) {
    super(props)
    this.props.store.tabSelectedKey = "tabbarpage/segmentdemo/horizontalsegment";
  }

  onPageResume(){
    // alert("one");
  }

  onPageBeforeLeave(){
    return true;
  }



  componentDidMount(){
    this.props.pagemanager.watchHashChange(this,(urlinfo)=>{
      this.props.store.tabSelectedKey =urlinfo.pathArr.splice(0,2).join("/");
    });
  }




  render() {
    return (<div className='full-screen'>
       <Navigation.PageContainer {...this.props}  className='tabbarpage-content'  owner={this}/>
       <TabBar store={this.props.store} pagemanager={this.props.pagemanager}/>
      </div>);
  }
}
export default PageView;

