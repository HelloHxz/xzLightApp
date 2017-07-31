import React from "react"
import "./refreshScroll.less"
import {xz,Navigation,style} from "../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
  }

  onRefresh(){

  }
   renderRefreshIndicator(params){
   	var child = null;
 	if(params.isInLoading){
    	child=( <div className="youliao-loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
    </div>);
 	}else{
 		child=( <div className="youliao-preloading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
    </div>);
 	}
 	return child;
 }

  render() {
  	var className = this.props.className||"youliao-scroll";
    return (<xz.ScrollView
    	limitOffset = {this.props.limitOffset||style.rem2px(2)}
    	className={className}
    	renderRefreshIndicator={this.renderRefreshIndicator.bind(this)}
    	onRefresh = {this.onRefresh.bind(this)}
    	>
    	 	{this.props.children}
    	</xz.ScrollView>);
  }
}
export default PageView;
