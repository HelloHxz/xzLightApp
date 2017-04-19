var React = require("react");
const {XzComponents} = require("../../../index").default


class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.state={innerChild:null};
    this.load();
  }

  load(){
  	var _this = this;
	require.ensure([], function(require) {
		var Com = require("./_delayload");
    	_this.setState({innerChild:<Com/>});
	});
  }



  render() {
  		
    return (<div>{this.state.innerChild}</div>);
  }
}
module.exports = PageView;
