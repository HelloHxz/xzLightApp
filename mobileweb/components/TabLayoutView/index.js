var React = require("react");
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';
import Segment from '../Segment';
 require("./tablayoutview.less");

class TabLayoutView extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      selectedIndex:0
    };
  }

  componentWillReceiveProps(props){
    var selectedIndex = props.config.selectedIndex||0;
    this.setState({selectedIndex:selectedIndex});
  }

  fireAction(childConfig,params){
     this.props.fireAction(childConfig,params);
  }
  render() {
    var text = this.props.config.text||"";
    var styles = this.props.config.style;
    return (<div data-ref={this.props.com_ref} data-role='xz.tabbarlayoutview' ref='wrapper' style={styles} className='xz-tabbar-layoutview' >
    <div>
      <Segment selectedIndex={this.state.selectedIndex} items={ this.props.config.items} config={{"tablayout":this.props.com_ref,"fireAction":(e,params) => this.fireAction(e,params)}}></Segment>
    </div>
    <div className='xz-segment-body'>
      {Helper.getLayoutByIndex(this.props.config,this,this.props.page_state,this.props.row_data,this.state.selectedIndex)}
    </div>
    </div>);
  }
}
module.exports = TabLayoutView;
