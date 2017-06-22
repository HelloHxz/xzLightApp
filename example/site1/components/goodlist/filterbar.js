import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class FilterBar extends React.Component {

  constructor(props) {
    super(props)
  }


  renderItem(key){
    if(key==="zhonghe"){
      return <div className='goodlis-filter-dp'></div>
    }
    return null;
  }

  zhongheClick(){
    var key = "zhonghe";
    if(this.props.store.filterSelectedKey===key){
      key ="";
    }else{
      this.props.store.conditionSelectedKey = "";
    }
    this.props.store.filterSelectedKey =key;
    
  }

  render() {
 
    return (
      <xz.DropDownGroup className="goodlis-filter-area"
        selectedKey={this.props.store.filterSelectedKey}
        pageview={this.props.pageview}
        renderItem = {this.renderItem.bind(this)}
      >
        <div onClick={this.zhongheClick.bind(this)} className='goodlis-filter-item'>综合</div>
        <div className='goodlis-filter-item'>销量</div>
        <div className='goodlis-filter-item'>价格</div>
        <div className='goodlis-filter-item'>过滤</div>
      </xz.DropDownGroup>
    );
  }
}
export default FilterBar;
