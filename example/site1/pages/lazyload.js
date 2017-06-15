import React from "react"
import globalStore from "../stores/global"
import lazyloadStore from "../stores/lazyload"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual} from "../../../index"


@observer
class PageView extends React.Component {
   static connectStore(params){
    return {globalStore:globalStore,lazyloadStore:lazyloadStore};
  }

  constructor(props) {
    super(props)
  }

  onPageResume(){
    
  }

  onPageBeforeLeave(){
    return true;
  }

  clickHandle(){
    this.props.base.showPage({
      pageKey:"one"
    });
  }


  render() {
    return (<div>
        <xz.Button type="plat">goto tabbar</xz.Button><br/>
          <div className='btn-wrap'>
            <xz.Button type="primary">primary Button</xz.Button>
            <xz.Button>default button</xz.Button>
            <xz.Button type="none">none button</xz.Button>
          </div>
          <br/>
          <div><xz.Button>跳转</xz.Button>
          <xz.Button type='primary'>去三级</xz.Button>
          <xz.Button>去二级</xz.Button>
          <xz.Button>GoSame</xz.Button>
          <xz.Button>我已审批</xz.Button></div>
      <xz.Button onClick={this.clickHandle.bind(this)}>Show</xz.Button></div>);
  }
}
export default PageView;
