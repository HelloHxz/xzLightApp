var React = require("react");
require("./datetimepicker.less");
var DateTimePicker = React.createClass({
  
  render: function() {
    let TestStr = "Woleu";
    var value = this.props.value||"2015-10-10";
    return (<div>{value}</div>);
  }
});

module.exports = DateTimePicker;
