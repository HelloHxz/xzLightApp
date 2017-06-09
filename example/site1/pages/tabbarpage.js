import React from "react"
import "../css/tabbarpage.less"

import tabbarPageStore from "../stores/tabbarpage"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../index"

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


  tabbarChange(params){
    var key = params.itemInstance.props.url||params.selectedKey;
     this.props.store.tabSelectedKey =  key;
    this.props.pagemanager.replaceGo(key);
  }

  componentDidMount(){
    this.props.pagemanager.watchHashChange(this,(urlinfo)=>{
      this.props.store.tabSelectedKey =urlinfo.pathArr.splice(0,2).join("/");
    });
  }




  render() {
    return (<div className='full-screen'>
       <Navigation.PageContainer {...this.props}  className='tabbarpage-content'  owner={this}/>
        <xz.Segment onChange={this.tabbarChange.bind(this)} className="tabbarpage-tabbar" selectedKey={this.props.store.tabSelectedKey}>
          <xz.Segment.Item key='tabbarpage/segmentdemo' url='tabbarpage/segmentdemo/horizontalsegment'>首页</xz.Segment.Item>
          <xz.Segment.Item key='tabbarpage/dpdcdemo'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='4'>设置</xz.Segment.Item>
         </xz.Segment>
      </div>);
  }
}
export default PageView;
