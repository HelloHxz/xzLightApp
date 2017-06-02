import React from "react"
import "../css/tabbarpage.less"
import {xz,style,shallowEqual} from "../../../index"

class PageView extends React.Component {
  constructor(props) {
    super(props)
  }

  onPageResume(){
    // alert("one");
  }

  onPageBeforeLeave(){
    return true;
  }


  render() {
    return (<div className='full-screen'>
    	 <div className="tabbarpage-content"></div>
       <div className="tabbarpage-tabbar">
        <xz.Segment scroll={true}>
          <xz.Segment.Item>首页</xz.Segment.Item>
          <xz.Segment.Item>商城</xz.Segment.Item> 
          <xz.Segment.Item>应用</xz.Segment.Item>  
          <xz.Segment.Item>设计</xz.Segment.Item>
          <xz.Segment.Item>设置</xz.Segment.Item>
          <xz.Segment.Item>我的</xz.Segment.Item>
         </xz.Segment>
       </div>
      </div>);
  }
}
export default PageView;
