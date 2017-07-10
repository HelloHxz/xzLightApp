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
    var dict = {
      "yyyy":'年',
      "MM":'月',
      "dd":'日',
      "hh":'时',
      "mm":'分',
      "ss":'秒',
    };
    var arr = [
      [0],
      [270],
      [100,100],
      [50,60,60],
      [40,50,50,50],
      [25,40,40,40,40],
      [10,30,30,30,30,30]
    ];
    var columnsCount = this.formatArr.length;
    var columnsWidth = Style.screen.width/columnsCount;
    var child = [];
    var diff = arr[columnsCount];
    for(var i=0,j=this.formatArr.length;i<j;i++){
      var item = this.formatArr[i];
      var label = dict[item]||"";
      child.push(<span key={item} style={{left:(columnsWidth*(i+1)-Style.px2px(diff[i]))+"px"}}>{label}</span>);
    }
    return <div className='xz-datepicker-mid'>
      {child}</div>
  }


  
  

  getColumnsDataAndSelectedValue(){
    var format = (this.props.format||"yyyy-MM-dd");
    if("yyyy-MM-dd hh:mm:ss".indexOf(format)<0){
      format = "yyyy-mm-dd";
      console.warn("时间格式必需为yyyy-MM-dd hh:mm:ss或者其中的部分截取");
    }
    var format_arr = format.split(" ");
    var ymd = format_arr[0]||"";
    var hms = format_arr[1]||"";
    if(ymd.indexOf("-")<0&&ymd!=="yyyy"){
      if(ymd.indexOf(":")>0){
        hms = ymd;
      }else{
        ymd = "yyyy-MM-dd";
        hms = "";
      }
    }
    var ymd_arr = ymd.split("-");
    var hms_arr = hms.split(":");
    this.formatArr = [];
    for(var i=0,j=ymd_arr.length;i<j;i++){
      var item = ymd_arr[i];
      if(item.length===0){
        continue;
      }
      if(["yyyy","MM","dd"].indexOf(item)<0){
        console.error("格式错误 参考yyyy-MM-dd hh:mm:ss");
      }
      this.formatArr.push(item);
    }

    for(var i=0,j=hms_arr.length;i<j;i++){
      var item = hms_arr[i];
      if(item.length===0){
        continue;
      }
      if(["hh","mm","ss"].indexOf(item)<0){
        console.error("格式错误 参考yyyy-MM-dd hh:mm:ss");
      }
      this.formatArr.push(item);
    }

    var value = this.props.value ;
    var date = Time.getDateInfo(value);
    var daycount =Time.getMonthDayCount(date);
    var data = [];
    for(var n=0,m=this.formatArr.length;n<m;n++){
      var key = this.formatArr[n];
      if(key==="yyyy"){
        var year = [];
        var yearStart = date.year-this.halfYearCount;
        var yearEnd = date.year+this.halfYearCount;
        for(var i=yearStart;i<=yearEnd;i++){
          year.push({label:i,value:i});
        }
        data.push(year);
      }else if(key==="MM"){
        var month = [];
        for(var i=1;i<13;i++){
          month.push({label:Time._processtime(i),value:i});
        }
        data.push(month);
      }else if(key==="dd"){
        var day = [];
        for(var i=1;i<=daycount;i++){
          day.push({label:Time._processtime(i),value:i});
        }
        data.push(day);
      }else if(key==="hh"){
        var hours = [];
        for(var i=0;i<24;i++){
          hours.push({label:Time._processtime(i),value:i});
        }
        data.push(hours);
      }else if(key==="mm"||key==="ss"){
        var mins = [];
        for(var i=0;i<60;i++){
          mins.push({label:Time._processtime(i),value:i});
        }
        data.push(mins);
      }
    }
  
    return {data:data,selectedValues:[date.year,date.month,date.day]};
  }


  onTansitionEnd(params){
    if(params.columnIndex===0){
      if(this.yearHasTouchEnd){
        var itemData = params.columnInstance.state.data[params.itemIndex];
        var startYear = params.columnInstance.state.data[0].value;
        var curYear = itemData.value;
        var topNeedAddCount = 0-(curYear-startYear-this.halfYearCount);
        var s = curYear-this.halfYearCount;
        var e = curYear+this.halfYearCount;
        this.year = [];
        for(var i=s;i<=e;i++){
          this.year.push({label:i,value:i});
        }
        params.columnInstance.setState({
          data:this.year,
          offset:params.columnInstance.state.offset-topNeedAddCount*params.itemHeight
        });
      }

      this.yearHasTouchEnd = true;
    }
  }
 


  render() {
    var dataAndS = this.getColumnsDataAndSelectedValue();
    return (<Picker 
      valueIsInt={true}
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
