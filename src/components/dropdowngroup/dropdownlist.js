import React from "react"
import "./index.less"

class DropDownGroupList extends React.Component {
  constructor(props) {
    super(props)
    this.itemDict = {};
    this.isInit = true;
  }

  componentDidMount(){
    var wrapper = document.body;
    if(this.props.pageview){
      wrapper = this.props.pageview.props.base.wrapper;
    }
    wrapper.appendChild(this.list);
  }

  componentWillUnmount(){
    if(!this.props.pageview){
      document.body.removeChild(this.list);
    }
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
      if(key==="null"||key===""||!key){
        continue;
      }
      var classArr = ["xz-dropdown-item"];
      if(key===this.props.selectedKey){
        var showClassName = (!this.props.preSelectedKey||this.props.preSelectedKey==="")?"xz-dd-item-show-ani":"xz-dd-item-show";
        classArr.push(showClassName);
        this.lastSelectedKey = key;
      }else{
        var hideClassName = (this.lastSelectedKey===key&&(!this.props.selectedKey||this.props.selectedKey===""))?"xz-dd-item-hide-ani":"xz-dd-item-hide";
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
