import React from "react"
import "./index.less"
import HomeStore from './store'
import SearchBar from './searchbar'
import {xz,Navigation} from "../../../../index"


class PageView extends React.Component {

  static connectStore(){
    return {homeStore:HomeStore}
  }

  constructor(props) {
    super(props)
  }
  

  onRefreshClose(){
    this.props.homeStore.searchBarStatus = "show";
  }

  onTouchMove(params){
    var scrollTop = params.scroller.scrollTop;
    if(this.props.homeStore.searchBarStatus!=="hide"&&params.diff>100&&scrollTop===0){
      this.props.homeStore.searchBarStatus = "hide";
    }
  }

  onRefresh(){

  }

  onScroll(params){
    if(params.scroller.scrollTop<80&&!this.props.homeStore.searchBarIsOpacity){
      this.props.homeStore.searchBarIsOpacity = true;
    }

    if(params.scroller.scrollTop>200&&this.props.homeStore.searchBarIsOpacity){
      this.props.homeStore.searchBarIsOpacity = false;
    }
  }



  render() {
    return (<div>
      <SearchBar store={this.props.homeStore}/>
      <xz.ScrollView
      className='meituan-home-scroll'
      onScroll={this.onScroll.bind(this)}
      onTouchMove={this.onTouchMove.bind(this)}
      onRefreshClose = {this.onRefreshClose.bind(this)}
      onRefresh = {this.onRefresh.bind(this)}
      >
        <div style={{backgroundColor:"red",height:"4rem"}}/>
        A<br/>B<br/>C<br/>D<br/>E<br/>F<br/>
        A<br/>B<br/>C<br/>D<br/>E<br/>F<br/>
        <div style={{height:"30rem"}}></div>
      </xz.ScrollView>
    </div>);
  }
}
export default PageView;
