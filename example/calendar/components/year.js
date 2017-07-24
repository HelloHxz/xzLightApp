import React from "react"
import {observer} from 'mobx-react'
import Month from './month'
import Time from '../../../utils/time'
import {xz,style,shallowEqual,Navigation} from "../../../index"

@observer
class Year extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      year:this.getYear(props)
    }
  }

  getYear(props){
    if(isNaN(props.year)){
      console.error("year 组件没有提供争取的year属性");
    }
    return parseInt(props.year);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      year:this.getYear(nextProps)
    });
  }

  renderChildren(){
    var children=[];
    for(var i=1;i<=12;i++){
      children.push(<Month 
        onMonthClick={this.props.onMonthClick}
        renderMonthHeader={this.props.renderMonthHeader} key={i} year={this.state.year} month={i}/>);
    } 
    return children;
  }

  render() {
    var classNameArr = ["calendar-year-wrapper"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    var header = null;
    if(this.props.renderYearHeader){
      header = this.props.renderYearHeader(this.state.year);
    }
    return (
        <div className={classNameArr.join(" ")}>
          {header}
          <div>
            {this.renderChildren()}
          </div>
        </div>
    	);
  }
}
export default Year;
