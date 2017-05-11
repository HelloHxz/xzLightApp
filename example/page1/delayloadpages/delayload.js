import React from "react";
import {XzComponents} from "../../../index"


class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.state={innerChild:null};
    this.load();
  }

  load(){
  	var _this = this;
	require.ensure([], function(require) {
		var Com = require("./_delayload").default;
    	_this.setState({innerChild:<Com {..._this.props}/>});
	},'delayloadpage');
  }



  render() {
  		
    return (<div>{this.state.innerChild}</div>);
  }
}
export default PageView;
