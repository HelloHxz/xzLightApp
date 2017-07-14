import React from "react"
import {observer} from 'mobx-react'
import "./index.less"
import Store from './store'
import DrawLayout from './drawlayout'


@observer
class PageView extends React.Component {

  static connectStore(){
  	return {store:new Store}
  }

  constructor(props) {
    super(props)
  }

  onPageBeforeLeave(params){
    if(params.action!=="前进"){
      if(this.props.store.showPageConfig&&this.props.store.showPageConfig.key){
        this.props.store.showPageConfig= {};
        return false;
      }
    }
    return true;
  }

  showPage(pagename){
  	this.props.store.showPageConfig = {key:pagename,direction:"bottom"};
  }
  
 

  render() {
    return (<div>
    	<DrawLayout store={this.props.store}/>
    	 <div className='calendar-header'></div>
    	 <div className='calendar-body'></div>
    	 <div className='calendar-footer'>
    	 	<div className='toolbar-btn' >今天</div>
    	 	<div className='toolbar-btn' onClick={this.showPage.bind(this,"SETTING")}>日历</div>
    	 	<div className='toolbar-btn' onClick={this.showPage.bind(this,"INBOX")}>邮箱</div>
    	 </div>
      </div>);
  }
}
export default PageView;
