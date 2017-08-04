import React from "react"
import "./index.less"
import {xz,Navigation,style} from "../../../../index"


class PageView extends React.Component {

  constructor(props) {
    super(props)
  }


  goBack(){
    this.props.pagemanager.goBack();
  }


  render() {
    return (<div>
        <div className='addp-header'>
          <span onClick={this.goBack.bind(this)} className='close-btn'>关闭</span>
          <span>选择音乐</span>
          <span className='start-btn'>直接开拍</span>
        </div>
    	</div>);
  }
}
export default PageView;
