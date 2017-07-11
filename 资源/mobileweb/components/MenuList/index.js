var React = require("react");

class MenuLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var text = this.props.config.text||"";
    var styles = this.props.config.style||{};
    // var textStyle = this.props.config.textStyle||{};
    // var iconStyle = this.props.config.iconStyle||{};
    // var textPos = this.props.config.textPos||"left";
    // var icon = this.props.config.icon || "";

    return (<div  data-ref={this.props.com_ref} ref='wrapper' data-role='xz.menulist' style={styles}>
       MenuList
    </div>);
  }
}
module.exports = MenuLayout;
