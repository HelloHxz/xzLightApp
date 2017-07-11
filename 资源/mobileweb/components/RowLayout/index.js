import * as React from 'react';
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
require("./rowlayout.less");

/*
  行布局指的是从左到右s的那种布局  命名规范参照的是css flex的flex-direction

  在设计器的时候就计算一下 最大宽度的值设置为flex：1

  行布局和view的区别是列布局的第一级子容器必须是view控件 这样方便调整宽度
  而view控件可以包含不是view控件的其他组件
  所以在设计器的时候拖出一个行布局的时候 会自动给行布局默认的子view组件
*/
class RowLayout extends React.Component {
  constructor(props) {
    super(props)
  }
  fireAction(childConfig,params){
     this.props.fireAction(childConfig,params);
  }
  render() {
    var childviews = Helper.getLayout(this.props.config,this,this.props.page_state,this.props.row_data);
    return (<div id={this.props.com_ref} data-ref={this.props.com_ref} ref='wrapper' data-role='xz.rowlayout' className='xz-view' style={styleHelper.process(this.props.config.style)}>
      {childviews}
    </div>);
  }
}
module.exports = RowLayout;
