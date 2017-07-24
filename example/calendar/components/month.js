import React from "react"
import {observer} from 'mobx-react'
import Time from '../../../utils/time'
import './month.less'
import {xz,style,shallowEqual,Navigation} from "../../../index"

@observer
class Month extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      date:this.getFirstDayDate(props)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      date:this.getFirstDayDate(nextProps)
    });
  }

  getFirstDayDate(props){
    if(isNaN(props.year)||isNaN(props.month)){
      console.error("未指定正确的year属性和month属性");
    }
    var year = parseInt(props.year);
    var month = parseInt(props.month);
    month = month>12?12:month;
    return Time.convertStrToDate(year+"-"+month+"-"+"01");
  }

  renderChild(emptyCount){
    var children = [];
    var monthCount = Time.getMonthDayCount(this.state.date);
    for(var i=0;i<emptyCount;i++){
      children.push(<li className='calendar-empty-cell' key={"e_"+i}>&nbsp;</li>);
    }
    for(var i=1;i<=monthCount;i++){
      children.push(<li key={i}>{i}</li>);
    }
    return children;
  }

  onClick(){
     var dateInfo = Time.getDateInfo(this.state.date);
    this.props.onMonthClick(dateInfo);
  }

  render() {
    var classNameArr = ["calendar-month-wrapper"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    var header = null;
    var emptyCount = Time.getMonthFirstDayWhicDayInWeek(this.state.date);

    if(this.props.renderMonthHeader){
      var dateInfo = Time.getDateInfo(this.state.date);
      header = this.props.renderMonthHeader(dateInfo,emptyCount);
    }
    var ce = {};
    if(this.props.onMonthClick){
      ce.onClick = this.onClick.bind(this)
    }
    return (
      <div {...ce} className={classNameArr.join(" ")}>
        {header}
        <ul>{
          this.renderChild(emptyCount)
        }</ul>
        </div>
    	);
  }
}
export default Month;
