import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }
 

  render() {
    return (<div><xz.DropDownGroup className='weibo-header'>
          <span className='weibo-main-header-btn'>相机</span>
          <xz.Segment selectedKey="guanzhu" className='weibo-main-segment'>
            <xz.Segment.Item key='guanzhu'>关注</xz.Segment.Item>
            <xz.Segment.Item key='hot'>热门</xz.Segment.Item>
          </xz.Segment>
        <span className='weibo-main-header-btn'>扫描</span>
      </xz.DropDownGroup>weibolist</div>);
  }
}
export default PageView;
