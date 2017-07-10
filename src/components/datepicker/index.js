import React from "react"
import "./index.less"
import Picker from '../picker'
import Style from "../../../utils/style"
import Time from "../../../utils/time"

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.halfYearCount = 40;
    this.yearHasTouchEnd = false;
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




  getColumnsDataAndSelectedValue(){
    var fmart = this.props.formart||"yyyy-MM-dd";
    var value = this.props.value ;
    var date = Time.getDateInfo(value);
    var data = [];
    var year = [];
    var yearStart = date.year-this.halfYearCount;
    var yearEnd = date.year+this.halfYearCount;
    for(var i=yearStart;i<=yearEnd;i++){
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
    return {data:data,selectedValues:[date.year,0,0]};
  }


  onTansitionEnd(params){
    if(params.columnIndex===0){
      if(this.yearHasTouchEnd){
        var itemData = params.columnInstance.state.data[params.itemIndex];
        var startYear = params.columnInstance.state.data[0].value;
        var curYear = itemData.value;
        var topNeedAddCount = 0-(curYear-startYear-this.halfYearCount);
        console.log(curYear);
        var s = curYear-this.halfYearCount;
        var e = curYear+this.halfYearCount;
        this.year = [];
        for(var i=s;i<=e;i++){
          this.year.push({label:i,value:i});
        }
        console.log(params.columnInstance.state.offset-topNeedAddCount*params.itemHeight);
        params.columnInstance.setState({
          data:this.year,
          offset:params.columnInstance.state.offset-topNeedAddCount*params.itemHeight
        });
      }

      this.yearHasTouchEnd = true;
    }
  }
  onTouchMove(params){
    if(params.columnIndex===0){
      if(this.year){
        // params.columnInstance.setState({
        //   data:this.year,
        // });
      }
    }
  }



  render() {
    
    //selectedValues={this.state.selectedValues}
    var dataAndS = this.getColumnsDataAndSelectedValue();
    return (<Picker 
      onTouchMove={this.onTouchMove.bind(this)}
      onTansitionEnd={this.onTansitionEnd.bind(this)}
      renderMidArea={this.renderMidArea.bind(this)}
      onBackLayerClick={this.onBackLayerClick.bind(this)} 
      show={this.state.show} 
      selectedValues={dataAndS.selectedValues}
      datasource={dataAndS.data}>
      </Picker>);
  }
}

export default DatePicker;
