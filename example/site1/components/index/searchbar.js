import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }


  showSearchPage(){
    this.props.pageview.props.base.showPage({
      pageKey:"search",
      animateType:"fadeIn"
    });
  }


  render() {
    var state = this.props.store.searchBarStatus;
    var classNameArr = ["search-bar"];
    if(state==="show"){
      classNameArr.push("xz-fadein-show");
    }else if(state==="hide"){
      classNameArr.push("xz-fadein-hide");
    }
    return (
      <div className={classNameArr.join(" ")} onClick={this.showSearchPage.bind(this)}>
          <div className='search-input'></div><span>消息</span>
        </div>
    	);
  }
}
export default PageView;
