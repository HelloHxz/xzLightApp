var React = require("react");
require("./index.less");

import * as styleHelper from '../../common/styleHelper';
class Switch extends React.Component {
  constructor(props) {
    super(props)
  }

  clickHandle(e){
		this.props.page_view.fireAction(this.props.config,{sender:this,e:e})
  }

  render() {
    return (<div>Switch</div>);
  }
}
module.exports = Switch;
