import * as React from 'react';
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
// require("./view.less");

class Line extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      return (<div id={this.props.com_ref} data-ref={this.props.com_ref} data-role='xz.line' className='xz-line' style={styleHelper.process(this.props.config.style)}>
      </div>);
  }
}
module.exports = Line;
