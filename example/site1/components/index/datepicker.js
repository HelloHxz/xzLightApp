import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class DatePicker extends React.Component {

  constructor(props) {
    super(props)
  }

  hideDatePicker(){
    this.props.store.showDatePicer = false;
  }

  render() {
    return (
       <xz.DatePicker 
         onBackLayerClick={this.hideDatePicker.bind(this)}
         show={this.props.store.showDatePicer}/>
    	);
  }
}
export default DatePicker;
