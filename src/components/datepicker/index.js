import React from "react"
import "./index.less"
import Picker from '../picker'

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
    if(nextPros.show!==this.state.show){
      this.setState({
        show:nextPros.show
      });
    }
  }



  render() {
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
    return (<Picker onBackLayerClick={this.onBackLayerClick.bind(this)} show={this.state.show} datasource={data}></Picker>);
  }
}

export default DatePicker;
