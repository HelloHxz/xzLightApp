import React from "react"
import "./index.less"
import Picker from '../picker'
import Style from "../../../utils/style"

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      show:props.show
    }
  }


  onBackLayerClick(){
    this.props.onBackLayerClick&&this.props.onBackLayerClick();
  }

  componentWillReceiveProps(nextPros){
    this.setState({
      show:nextPros.show
    });
  }

  renderMidArea(){
    var columnsCount = 3;
    var columnsWidth = Style.screen.width/columnsCount;
    return <div className='xz-datepicker-mid'>
      <span style={{left:(columnsWidth-Style.px2px(55))+"px"}}>年</span>
      <span style={{left:(columnsWidth*2-Style.px2px(80))+"px"}}>月</span>
      <span style={{left:(columnsWidth*3-Style.px2px(80))+"px"}}>日</span></div>
  }

  onTansitionEnd(params){
    console.log(params);
  }


  getColumnsData(){
    var fmart = this.props.formart||"yyyy-MM-dd";
    var data = [];
    var year = [];
    for(var i=1900;i<2100;i++){
      year.push({label:i,value:i});
    }
    var month = [];
    for(var i=1;i<13;i++){
      month.push({label:i,value:i});
    }
    var day = [];
     for(var i=1;i<30;i++){
      day.push({label:i,value:i});
    }
    data.push(year);
    data.push(month);
    data.push(day);
    return data;
  }



  render() {
    
    //selectedValues={this.state.selectedValues}

    return (<Picker 
      onTansitionEnd={this.onTansitionEnd.bind(this)}
      renderMidArea={this.renderMidArea.bind(this)}
      onBackLayerClick={this.onBackLayerClick.bind(this)} 
      show={this.state.show} 
      datasource={this.getColumnsData()}>
      </Picker>);
  }
}

export default DatePicker;
