import * as React from 'react';
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
require("./view.less");

class View extends React.Component {
  constructor(props) {
    super(props)
  }

  clickHandle(e){
    this.props.page_view.fireAction(this.props.config,{sender:this,e:e})
  }


  render() {
    var style = this.props.config.style||{};
    if(!style.flexDirection){
      style.flexDirection = "column";
    }
    if(this.props.config.scrollEnabled){
      style.overflow="auto";
      style.WebkitOverflowScrolling= "touch";
    }
    var styles = styleHelper.process(style);
      return (<div
         ref="wrapper"
         onClick={(e) => this.clickHandle(e)}
         id={this.props.com_ref} data-candrag={this.props.config.candrag} data-ref={this.props.com_ref} data-role='xz.view' className='xz-view displayflex' style={styles}>
        {Helper.getLayout(this.props.config,this.props.page_view,this.props.row_data)}
      </div>);
  }
}
module.exports = View;
