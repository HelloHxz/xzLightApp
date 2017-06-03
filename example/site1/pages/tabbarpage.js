import React from "react"
import "../css/tabbarpage.less"
import {xz,style,shallowEqual,Navigation} from "../../../index"

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
       <Navigation.PageContainer className='tabbarpage-content' {...this.props}   owner={this}/>
        <xz.Segment className="tabbarpage-tabbar" selectedKey="1" scroll={true}>
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='4'>设计</xz.Segment.Item>
          <xz.Segment.Item key='5'>设置</xz.Segment.Item>
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
         </xz.Segment>
      </div>);
  }
}
export default PageView;
