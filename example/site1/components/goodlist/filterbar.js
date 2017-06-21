import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class FilterBar extends React.Component {

  constructor(props) {
    super(props)
  }


  renderItem(key){

  }

  render() {
 
    return (
      <xz.DropDownGroup className="goodlis-filter-area"
        selectedKey=""
        renderItem = {this.renderItem.bind(this)}
      >
        <div className='goodlis-filter-item'>综合</div>
        <div className='goodlis-filter-item'>销量</div>
        <div className='goodlis-filter-item'>价格</div>
        <div className='goodlis-filter-item'>过滤</div>
      </xz.DropDownGroup>
    );
  }
}
export default FilterBar;
