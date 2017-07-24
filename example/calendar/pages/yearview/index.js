import React from "react"
import {observer} from 'mobx-react'
import "./index.less"
import Year from '../../components/year'


@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }

  
  renderYearHeader(year){
    return <div className='year-header'>{year}</div>
  }

  renderMonthHeader(dateinfo){
    return <div className='month-header'>{dateinfo.month+"月"}</div>
  }


  onMonthClick(dateinfo){
    this.props.homeStore.statusViewKey = "month";
  }
 

  render() {
    var years = [];
    for(var i=2014;i<2019;i++){
      years.push(<Year 
        onMonthClick={this.onMonthClick.bind(this)}
        key={i}
        renderMonthHeader = {this.renderMonthHeader.bind(this)}
        renderYearHeader = {this.renderYearHeader.bind(this)}
        className='calendar-year-view' year={i}/>);
    }
    return (<div className='calendar-year-view-wrapper'>{years}</div>);
  }
}
export default PageView;
