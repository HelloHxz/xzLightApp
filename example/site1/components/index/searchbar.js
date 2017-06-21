import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class SearchBar extends React.Component {

  constructor(props) {
    super(props)
  }


  showSearchPage(){
    this.props.pageview.props.base.showPage({
      pageKey:"search",
      animateType:"fadeIn",
      params:{
        from:"home"
      }
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
    var searchBarIsOpacity = this.props.store.searchBarIsOpacity;
    var bkClassNameArr = ["search-bar-bk"];
    if(searchBarIsOpacity){
      classNameArr.push("searchbar-opacity-none");
    }else{
      classNameArr.push("searchbar-opacity-show");
    }
    return (
      <div className={classNameArr.join(" ")} onClick={this.showSearchPage.bind(this)}>
          <div className='search-bar-inner'><div className='search-bar-bk'></div><div className='search-input'></div><span className='messiconspan'>消息</span></div>
        </div>
    	);
  }
}
export default SearchBar;
