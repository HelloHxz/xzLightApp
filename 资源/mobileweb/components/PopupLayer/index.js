var React = require("react");
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
require("./index.less");

class PopupLayer extends React.Component {
  constructor(props) {
    super(props)
  }

  fireAction(childConfig,params){
     this.props.fireAction(childConfig,params);
  }

  hideDialog(e){
    this.props.fireAction({onClick:[{type:"modifyProperty",to:this.props.com_ref,show:false}]},{sender:this});
  }

  

  render() {
    var styles = this.props.config.style;
    // config.mode  上弹出下弹出左 。。。。
    return (<div data-candrag="false" className={this.props.config.show?'xz-poplayer-show':'xz-poplayer-hide'} >
      <div className='xz_poplayer_bk' onClick={(e)=>this.hideDialog(e)}></div>
      <div style={styles} data-role='xz.popuplayer'  data-candrag="false"  ref='wrapper' data-ref={this.props.com_ref}
          id={this.props.com_ref} className='xz_poplayer_body'>
        {Helper.getLayout(this.props.config,this,this.props.page_state,this.props.row_data)}
      </div>
    </div>);
  }
}
module.exports = PopupLayer;
