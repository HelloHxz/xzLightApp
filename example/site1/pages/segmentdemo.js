import React from "react"
import "../css/segmentdemo.less"
import {xz,style,shallowEqual,Navigation} from "../../../index"
import SegmentDemoStore from "../stores/segmentdemo"
import {observer} from 'mobx-react'
import TabBar from '../components/segmentdemo/tabbar'

@observer
class PageView extends React.Component {

  static connectStore(){
    return {store:new SegmentDemoStore}
  }

  constructor(props) {
    super(props)
    props.store.tabSelectedKey = "tabbarpage/segmentdemo/horizontalsegment";
  }

 

  componentDidMount(){
    this.props.pagemanager.watchHashChange(this,(urlinfo)=>{
      var key  = urlinfo.pathArr.splice(0,3).join("/");
      this.props.store.tabSelectedKey = key;
    });
  }


  render() {
    console.log("render segmentdemo");
    return (<div>
      <div className='app-header segment-header'>
           <TabBar store={this.props.store} pagemanager={this.props.pagemanager}/>
      </div>
      <Navigation.PageContainer className='full-screen' {...this.props}   owner={this}/>
    	</div>);
  }
}
export default PageView;
