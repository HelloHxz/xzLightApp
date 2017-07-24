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

  renderMonthHeader(dateinfo,emptycount){
    var marginleft = (emptycount/7)*100+"%";
    return <div className='month-header'><span style={{marginLeft:marginleft,width:"14.28%",display:"inline-block",textAlign:"center"}}>{dateinfo.month+"月"}</span></div>
  }


  render() {
    var years = [];
    for(var i=2014;i<2019;i++){
      years.push(<Year 
        key={i}
        renderMonthHeader={this.renderMonthHeader.bind(this)}
        className='calendar-month-view' year={i}/>);
    }
    return (<div className='calendar-month-view-wrapper'>{years}</div>);
  }
}
export default PageView;
