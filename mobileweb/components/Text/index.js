var React = require("react");
require("./text.less");
import * as styleHelper from '../../common/styleHelper';
import Immutable from 'immutable';

class Text extends React.Component {
  constructor(props) {
    super(props)

  }

  clickHandle(e){
		this.props.page_view.fireAction(this.props.config,{sender:this,e:e})
  }

  shouldComponentUpdate(nexpros){
    return !Immutable.is(nexpros.immu_config, this.props.immu_config);
  }

  render() {
      //numberOfLines
      console.log("textreder");
      var styles =styleHelper.process(this.props.config.style);
      var text = this.props.text||this.props.config.text|| " ";
      return (<span data-ref={this.props.com_ref} ref='wrapper' data-role='xz.text' onClick={(e) => this.clickHandle(e)} className='xz-text' style={styles}>{text}</span>);
  }
}
module.exports = Text;
