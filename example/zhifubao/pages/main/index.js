import React from "react"
import "./index.less"
import {xz,Navigation} from "../../../../index"
import MainScroll from './components/mainscroll'
import HomeStore from "../home/store"


class PageView extends React.Component {
 
 static connectStore(){
    return {homeStore:HomeStore}
 }

 constructor(props) {
    super(props)
  }



  render() {
    return (<div>
    	<div className='zfb-min-header'>支付宝</div>
    	<div className='zfu-main-topv'>
    	</div>
    	<MainScroll store={this.props.homeStore}/>

    	</div>);
  }
}
export default PageView;
