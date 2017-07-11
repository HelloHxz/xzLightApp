var React = require("react");
var Helper = require('../../common/utils');
require("./drawerlayout.less");


// todo 支持 双边的抽屉
class DrawerLayout extends React.Component {
  constructor(props) {
    super(props)

  }
  fireAction(childConfig,params){
     this.props.fireAction(childConfig,params);
  }
  hideDrawer(e){
    this.props.fireAction({onClick:[{type:"modifyProperty",to:this.props.com_ref,show:false}]},{sender:this});
  }
  render() {
      var styles = this.props.config.style;
      return (<div>
        <div style={styles} className='xz-drawer-wrapper'>{Helper.getLayout(this.props.config,this,this.props.page_state,null)}</div>
      </div>);
  }
}
module.exports = DrawerLayout;
