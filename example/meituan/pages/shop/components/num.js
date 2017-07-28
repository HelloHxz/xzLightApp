import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import "./num.less"

class Num extends React.Component {
  constructor(props) {
    super(props)

    this.state={
    	value:this._getValue(props.value)
    }
  }

  _getValue(val){
  	if(!val||isNaN(val)){
  		val = 0;
  	}
  	return parseInt(val);
  }

  add(){
  	this.props.onAdd&&this.props.onAdd({
  		instance:this,
  		value:this.state.value+1
  	});
  }
  
  componentWillReceiveProps(nextPros){
  	this.setState({
  		value:this._getValue(nextPros.value)
  	})
  }

  subtra(){
  	var value = this.state.value - 1;
  	value = value<0?0:value;
  	
  	this.props.onSubtra&&this.props.onSubtra({
  		instance:this,
  		value:value
  	});
  }
  
  render() {
  	var subClassArr = ["meituan-num-subtra"];
  	if(this.state.value>0){
  		subClassArr.push("meituan-num-subtra-show");
  	}else{
  		subClassArr.push("meituan-num-subtra-hide");
  	}
    return (
    	<div className='meituan-num-wrapper'>
    	<div onTouchStart={this.subtra.bind(this)} className={subClassArr.join(" ")}>-</div>
    	<span className='meituan-num-val'>{this.state.value||""}</span>
    	<div className='meituan-num-plus' onTouchStart={this.add.bind(this)}>+</div>
    	</div>);
  }
}
export default Num;
