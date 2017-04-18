import * as React from 'react';
import * as Helper from '../../common/utils';
import * as styleHelper from '../../common/styleHelper';

var vStyle={
  display:"flex",
  flexDirection:"row",
  overflow:"hidden"
};

var width = window.innerWidth;
var pageStyle={
  width:width,
  display:"flex",
  overflow:"hidden"
};
class xzViewPager extends React.Component {
  constructor(props) {
    super(props)
    this.selectedIndex = props.selectedIndex||0;
    this.viewDict={};
    this.getLayout = this.getLayout.bind(this);
  }

  componentDidMount(){
    this.refs.scrollView.scrollLeft = width*this.selectedIndex;
  }

  // shouldComponentUpdate(nextProps,nextState){
  //   return this.props.config!=nextProps.config;
  // }
  componentWillReceiveProps(props){
    if(props.config.selectedIndex==undefined){return;}
    if(this.selectedIndex!=props.config.selectedIndex){
      this.selectedIndex =props.config.selectedIndex;
      this.refs.scrollView.scrollLeft = width*this.selectedIndex;
    }
  }

  getLayout(){
    var views = this.props.config.views||[];
    var Re = [];
    for(var i=0,j=views.length;i<j;i++){
      var view_key = views[i];
      var view = this.viewDict[i.toString()];
      if(!view&&this.selectedIndex==i){
        view = Helper.getLayoutByKey(view_key,this.props.page_view,this.props.row_data);
        this.viewDict[i.toString()] = view;
      }
      Re.push(<div key={"viewpager"+this.props.comf_ref+i} className='xz-scrolling' style={styleHelper.process(pageStyle)}>{view}</div>);
    }
    return Re;
  }

  render() {
    var style = this.props.config.style||{};
    var styles = styleHelper.process({...style,...vStyle});
    return (<div ref="scrollView" style={styleHelper.process(styles)}>
          {this.getLayout()}
      </div>);
  }
}
module.exports = xzViewPager;
