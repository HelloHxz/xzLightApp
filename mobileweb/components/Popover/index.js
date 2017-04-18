var React = require("react");
require("./popover.less");

class Popover extends React.Component {
  constructor(props) {
    super(props)
    this.hidePopover = this.hidePopover.bind(this);
  }

  itemClick(){
		// this.props.fireAction && this.props.fireAction(this.props.config,{sender:this})
  }

  hidePopover(e){
    // this.props.fireAction({onClick:[{type:"modifyProperty",to:this.props.com_ref,show:false}]},{sender:this});
    this.props.page_view.props.actions.modifyProperty({sender:this,page:this.props.page_view.props.com_ref,to:this.props.com_ref,show:false});
  }
  render() {
    var styles = this.props.config.style;
    // 根据 this.props.config.sender 获取到位置 决定弹出位置
    styles.width = 100;
    styles.borderRadius = 4;
    styles.backgroundColor = "#fff";

    var triangleStyles = {

    };
    if(this.props.config.show){
      // 可做缓存  并根据不同策略显示不同的位置 暂时显示在下方
      // var clientRect = this.props.config.sender.refs["wrapper"].getBoundingClientRect();
      // styles.left = clientRect.left+clientRect.width/2-styles.width/2;
      // triangleStyles.left = styles.left + styles.width/2 - 5 ;
      // triangleStyles.top  = clientRect.bottom;
      // styles.top =  triangleStyles.top +5 ;
      styles.left = 200;
      styles.top = 50;
      triangleStyles.left = 230;
      triangleStyles.top = 45;


    }else{
      this.props.config.show = false;
    }
    return (<div className={this.props.config.show?'xz-popover-show':'xz-popover-hide'} ref='wrapper'>
        <div onClick={(e)=>this.hidePopover(e)} className='xz-popover-bk'></div>
        <div className='xz-popover-triangle' style={triangleStyles}></div>
        <div id={this.props.com_ref} className='xz-popover' style={styles}>
          <div>Item1</div>
          <div>Item2</div>
        </div>
    </div>);
  }
}
module.exports = Popover;
