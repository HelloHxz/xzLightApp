import React from "react"
import "./index.less"
import DropDownList from "./dropdownlist"

class DropDownGroup extends React.Component {
  constructor(props) {
    super(props)
    this.isInit = true;
    this.state={
      selectedKey:this.props.selectedKey
    }
    this.preSelectedKey = this.state.selectedKey;

  }

  componentWillReceiveProps(nextPros){
    this.preSelectedKey = this.state.selectedKey;

    if(nextPros.selectedKey!==this.state.selectedKey){

      this.setState({selectedKey:nextPros.selectedKey});
    }
  }

  componentDidMount(){
    if(!!this.state.selectedKey&&this.state.selectedKey!==""){
      this.setState({seed:1})
    }
  }


  onBkClick(){
    this.props.onBackLayerClick&&this.props.onBackLayerClick();
  }



  render() {
    var classNameArr = ["xz-dropdpwn-group"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }

    var dropDonwListClassArr = ["xz-dropdown-list"];
    if(!this.state.selectedKey||this.state.selectedKey===""||!this.wrapper){
      dropDonwListClassArr.push("xz-displaynone");
    }
    var bkStyle = {};
    if(this.wrapper){
      bkStyle.top = this.wrapper.getBoundingClientRect().bottom+"px";
    }
    var list = null;
    if(this.wrapper){
      list = <DropDownList onBkClick={this.onBkClick.bind(this)} preSelectedKey={this.preSelectedKey} pageview={this.props.pageview} renderItem={this.props.renderItem} selectedKey={this.state.selectedKey} style={bkStyle} className={dropDonwListClassArr.join(" ")}/>;
    }
    return (
      <div 
      ref={(wrapper)=>{this.wrapper = wrapper;}}
      className={classNameArr.join(" ")}>
        {this.props.children}
        {list}
      </div>
    );
  }
}

export default DropDownGroup;
