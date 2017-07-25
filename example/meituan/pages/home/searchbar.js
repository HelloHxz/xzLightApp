import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class SearchBar extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    var status = this.props.store.searchBarStatus;
    var classNameArr = ["search-bar"];
    if(status==="show"){
      classNameArr.push("xz-fadein-show");
    }else if(status==="hide"){
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
      <div className={classNameArr.join(" ")}>
          <div className='search-bar-inner'><div className='search-bar-bk'></div>
            <div className='meituan-home-header-left'>水产工业园</div>
            <div className='meituan-home-header-right'></div>
            <span className='meituan-home-search-text'>搜索</span>
          </div>
        </div>
    	);
  }
}
export default SearchBar;
