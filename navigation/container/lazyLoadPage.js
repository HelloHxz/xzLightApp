import React from "react";
import {XzComponents} from "../index"
import PageView from "./pageview"


class LazyPageView extends React.Component {
  constructor(props) {
    super(props)
    this.state={innerChild:null};
    this.load();
  }

  load(){
    var pagename = this.props.pagename||"";
    var realpagename = pagename.split("_")[0];
    var Fuc = this.props.pagemanager.props.config.pages[realpagename];
    Fuc((Com)=>{
      this.props.pagemanager.props.config.pages[realpagename] = Com;
      this.setState({innerChild:<PageView {...this.props}/>});
    });
  
  }

  render() {
  		
    return (<div className="xz-page-inner"><div className='xz-lazy-page-warp full-screen'>{this.state.innerChild}</div></div>);
  }
}
export default LazyPageView;
