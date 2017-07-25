import React from "react"
import {observer} from 'mobx-react'
import "./index.less"
import Store from './store'
import DrawLayout from './drawlayout'
import {xz,style} from '../../../../index'
import YearView from '../yearview'
import MonthView from '../monthview'


var seed = 0;

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
      if( this.props.store.statusViewKey === "month"){
         this.props.store.statusViewKey = "year";
         return false;
      }
    }
    return true;
  }

  componentDidMount(){
    this.props.store.statusViewKey = "year";
  }

  renderItem(config){
    var key = config.key;
    if(key==="year"){
      return <YearView homeStore={this.props.store}/>
    }else if(key==="month"){
      return <MonthView homeStore={this.props.store}/>
    }
    return <div>year</div>
  }
  showPage(pagename){
    seed+=1;
    xz.Toast.show({
      component:<div style={{backgroundColor:"green",color:"#fff",height:"1rem",lineHeight:"1rem"}}>asdas</div>,
      direction:"top",
      duration:1000,
      animation:"slide"
    });
    return;
  	this.props.store.showPageConfig = {key:pagename,direction:"bottom"};
  }
  
 

  render() {
  
    return (<div>
    	<DrawLayout store={this.props.store}/>
    	 <div className='calendar-header'></div>
    	 <xz.StatusView config={{key:this.props.store.statusViewKey,cache:true}} renderItem={this.renderItem.bind(this)} className='calendar-body'>

       </xz.StatusView>
    	 <div className='calendar-footer'>
    	 	<div className='toolbar-btn' >今天</div>
    	 	<div className='toolbar-btn' onClick={this.showPage.bind(this,"SETTING")}>日历</div>
    	 	<div className='toolbar-btn' onClick={this.showPage.bind(this,"INBOX")}>邮箱</div>
    	 </div>
      </div>);
  }
}
export default PageView;
