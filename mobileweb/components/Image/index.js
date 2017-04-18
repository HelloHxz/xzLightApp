import * as React from 'react';
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
require("./index.less");

class xzImage extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandle=this.clickHandle.bind(this);
  }

  clickHandle(e){
    this.props.page_view.fireAction(this.props.config,{sender:this,e:e})
  }

  render() {
    this.config = this.props.config;
    var pc = this.config ;
    var styles = styleHelper.process(this.config.style);
    var src = this.props.src||pc.src;
    return (<div style={styles} onClick={this.clickHandle} className='xz-image'><img src={src}/></div>);
  }
}
module.exports = xzImage;
