import * as React from 'react';
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
require("./columnlayout.less");

/*
  列布局指的是从上到下的那种布局  命名规范参照的是css flex的flex-direction

  列布局和view的区别是列布局的第一级子容器必须是view控件 这样方便调整高度
  而view控件可以包含不是view控件的其他组件
  所以在设计器的时候拖出一个列布局的时候 会自动给列布局默认的子view组件
*/
class ColumnLayout extends React.Component {
  constructor(props) {
    super(props)
  }
  fireAction(childConfig,params){
     this.props.fireAction(childConfig,params);
  }
  render() {
    for(var i=0,j=this.props.config.root.length;i<j;i++){
      var view = this.props.page_state.components[this.props.config.root[i]];
      if(!view){console.error("-----");}else{
        if(view.autoheight){
          view.style.flex = 1;
        }
      }
    }
    return (<div id={this.props.com_ref} data-ref={this.props.com_ref} ref='wrapper' data-role='xz.columnlayout' className='xz-column-view' style={styleHelper.process(this.props.config.style)}>
      {Helper.getLayout(this.props.config,this,this.props.page_state,this.props.row_data)}
    </div>);
  }
}
module.exports = ColumnLayout;
