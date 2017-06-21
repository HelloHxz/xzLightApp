import React from "react"
import "./index.less"

class DropDownGroupList extends React.Component {
  constructor(props) {
    super(props)
    this.itemDict = {};
    this.isInit = true;
   

    this.preSelectedKey = this.props.selectedKey;
    
  }

  componentDidMount(){
    document.body.appendChild(this.list);
  }

  componentWillUnmount(){
    document.body.removeChild(this.list);
  }


  renderDropDownChildren(){
    if(!this.itemDict[this.props.selectedKey]){
      if(this.props.renderItem){
        this.itemDict[this.props.selectedKey] = this.props.renderItem(this.props.selectedKey);
      }else{
        this.itemDict[this.props.selectedKey] = null;
      }
    }
    var child = [];
    for(var key in this.itemDict){
      if(key==="null"){
        continue;
      }
      var classArr = ["xz-dropdown-item"];
      if(key===this.props.selectedKey){
        var showClassName = (!this.preSelectedKey||this.preSelectedKey==="")?"xz-dd-item-show-ani":"xz-dd-item-show";
        classArr.push(showClassName);
      }else{
        var hideClassName = ((!this.props.selectedKey||this.props.selectedKey===""))?"xz-dd-item-hide-ani":"xz-dd-item-hide";
        classArr.push(hideClassName);
      }
      child.push(<div key={"dd_"+key} className={classArr.join(" ")}>{this.itemDict[key]}</div>);
    }
    return <div className="xz-dropdown-inner">
      {child}
    </div>;
  }

  render() {
    return (
       <div ref={(list)=>{
        this.list = list;
       }} style={this.props.style} className={this.props.className}>
          {this.renderDropDownChildren()}
        </div>
    );
  }
}

export default DropDownGroupList;
