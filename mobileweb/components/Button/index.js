var React = require("react");
require("./index.less");

import * as styleHelper from '../../common/styleHelper';
class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  clickHandle(e){
		this.props.page_view.fireAction(this.props.config,{sender:this,e:e})
  }

  render() {
    var text = this.props.config.text||"";
    var styles = this.props.config.style||{};
    var textStyle = this.props.config.textStyle||{};
    for(var key in textStyle){
      styles[key] = textStyle[key];
    }
    if(!styles.backgroundColor){
      styles.backgroundColor = "transparent";
    }
    styles = styleHelper.process(styles);
    return (<button id={this.props.com_ref} data-ref={this.props.com_ref} data-role='xz.button' ref='wrapper' style={styles} className='xz-button' type='button' onClick={(e) => this.clickHandle(e)}>{text}</button>);
  }
}
module.exports = Button;
