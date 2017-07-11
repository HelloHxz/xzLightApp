import * as React from 'react';
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
// require("./view.less");

var splitLineStyle = {
  height:1,
  position:"relative",
  backgroundColor:"#eee"
}

var middleLineStyle = {
  height:1,
  position:"relative",
  backgroundColor:"#eee",
  marginLeft:10
}

class MenuLayout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var children = Helper.getLayout(this.props.config,this.props.page_view,this.props.row_data);
    var realChildren = [];
    for(var i=0,j=children.length;i<j;i++){
      if(i==0){
        realChildren.push(<div key={this.props.com_ref+"line"+i} style={splitLineStyle}></div>);
      }
      realChildren.push(children[i]);
      if(i==j-1&&i>0){
        realChildren.push(<div key={this.props.com_ref+"line"+i}  style={splitLineStyle}></div>);
      }
      if(children.length==1){
        realChildren.push(<div key={this.props.com_ref+"linelast"+i}  style={splitLineStyle}></div>);
      }
      if(i<j-1){
        realChildren.push(<div key={this.props.com_ref+"mline"+i} style={middleLineStyle}></div>);
      }
    }
    return (<div id={this.props.com_ref} data-candrag={this.props.config.candrag} data-ref={this.props.com_ref} data-role='xz.menulayout' className='xz-menulayout' style={styleHelper.process(this.props.config.style)}>
      {realChildren}
    </div>);
  }
}
module.exports = MenuLayout;
