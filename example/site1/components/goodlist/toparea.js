import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"
import FilterBar from "./filterbar"
import ConditionBar from "./conditionbar"

@observer
class TopArea extends React.Component {

  constructor(props) {
    super(props)
  }

  searchBarClick(){
    this.props.pageview.props.base.showPage({
      pageKey:"search",
      animateType:"fadeIn",
      params:{
        from:"goodlist"
      }
    });
  }

  render() {
    var status = this.props.store.topAreaStatus;
    var classNameArr = ["goodlis-top-area"];
    classNameArr.push(status==="min"?"goodlis-top-area-min":"")
    return (
      <div className={classNameArr.join(" ")}>
        <div className="goodlis-search-area">
          <div onClick={this.searchBarClick.bind(this)} className='goodlis-input-area'></div>
        </div>
        <FilterBar/>
        <ConditionBar pageview={this.props.pageview} store={this.props.store}/>
      </div>
    );
  }
}
export default TopArea;
