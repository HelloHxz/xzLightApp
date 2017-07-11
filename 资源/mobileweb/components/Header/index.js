import * as React from 'react';
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
require("./index.less");

class xzHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  fireAction(childConfig,params){
     this.props.page_view.fireAction(childConfig,params);
  }
  render() {
      var styles = this.props.config.style||{};
      styles.alignItems="center";
      styles.flexDirection="row";

      var headerTopStyle={"height":13,backgroundColor:styles.backgroundColor||"transparent"};
      styles = styleHelper.process(styles);
      return (
      <div><div style={headerTopStyle}></div>
      <div id={this.props.com_ref} data-candrag={this.props.config.candrag} data-ref={this.props.com_ref} data-role='xz.header' className='xz-header' style={styles}>

        {Helper.getLayout(this.props.config,this.props.page_view,this.props.row_data)}
      </div></div>);
  }
}
module.exports = xzHeader;
