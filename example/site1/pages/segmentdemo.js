import React from "react"
import "../css/segmentdemo.less"
import {xz,style,shallowEqual,Navigation} from "../../../index"

class PageView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      demo2SelectedKey:"1"
    }
  }

  demo2Select(){
    this.setState({demo2SelectedKey:"2"});
  }
  
  onPageResume(){
    // alert("one");
  }
  onPageBeforeLeave(){
    return true;
  }

  renderIndicatorOne(params){
    var rect = params.rect;
    // var indicatorStyle = {
    //   position:"absolute",
    //   bottom:"0",
    //   left:rect.left,
    //   width:style.px2rem(rect.width),
    //   height:style.px2rem(5),
    // };
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:rect.left,
      right:style.screen.width-rect.right,
      height:style.px2rem(5),
    };
    var className = params.curIndex>params.preIndex?"segement-indi-ltr":"segement-indi-rtl";
    return <div className={className} style={indicatorStyle}></div>
  }


  render() {
    return (<div className='full-screen'>
      <div className='app-header'>Segment</div>
        <xz.Segment  selectedKey="1" scroll={true}>
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='4'>设计</xz.Segment.Item>
          <xz.Segment.Item key='5'>设置</xz.Segment.Item>
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
         </xz.Segment>

        <xz.Segment selectedKey="1">
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
         </xz.Segment>


         <xz.Segment className="segement-demo-2" renderIndicator={this.renderIndicatorOne.bind(this)} selectedKey={this.state.demo2SelectedKey} scroll={true}>
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='4'>设计</xz.Segment.Item>
          <xz.Segment.Item key='5'>设置</xz.Segment.Item>
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
         </xz.Segment>
         <div>
         <xz.Button onClick={this.demo2Select.bind(this)}>selected</xz.Button>
         </div>



    	</div>);
  }
}
export default PageView;
