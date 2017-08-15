import React from "react"
import {observer} from 'mobx-react'

import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class TabBar extends React.Component {

  constructor(props) {
    super(props)
  }


 
  tabbarChange(params){
     this.props.store.pageisInBohao = params.selectedKey==='home/bohao'; 
    if(params.preSelectedKey===params.selectedKey&&params.selectedKey==='home/bohao'){
      if(this.props.store.bohaoStatusConfig.key!=="recent"){
         this.props.store.bohaoStatusConfig={key:"recent",cache:true};
      }else{
        this.props.store.showKeyBord = !this.props.store.showKeyBord;
      }
    }

    var key = params.itemInstance.props.url||params.selectedKey;
    this.props.pagemanager.replaceGo(key);
  }

  render() {
    var tabText = this.props.store.pageisInBohao?(this.props.store.showKeyBord?"收起号盘":"展开号盘"):"拨号";
    return (
    	 <xz.Segment selectedKey={this.props.store.tabSelectedKey} 
    	 onChange={this.tabbarChange.bind(this)} className="weibo-home-tabbar">
          <xz.Segment.Item key='home/bohao'>{tabText}</xz.Segment.Item>
          <xz.Segment.Item key='home/zhibo'>直播</xz.Segment.Item>
          <xz.Segment.Item key='home/me'>我</xz.Segment.Item> 
         </xz.Segment>);
  }
}
export default TabBar;
