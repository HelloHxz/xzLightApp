var React = require("react");

import * as styleHelper from '../../common/styleHelper';
import * as CF from '../../common/ComponentsFactory'

require("./index.less");
class TabBar extends React.Component {
  constructor(props) {
    super(props)

  }

  itemClick(e,href){
    var href = e.target.getAttribute("data-href");
    if(!href){
      href = e.target.parentNode.getAttribute("data-href");
    }
    if(href){
      this.props.page_view.TabSelectedChange(href);
    }
  }

  render() {
    var tabs = [];
    var p = this.props;
    var style =p.config.style;

    var tabbarStyle ={
      height: 50,
      position:"absolute",
      bottom:0,
      left:0,
      right:0,
      backgroundColor:"#eee",
      flexDirection: 'row',
      justifyContent:"space-around",
      alignItems:"stretch"
    };
    if(style){
      for(var key in style){
        tabbarStyle[key] = style[key];
      }
    }
    var _this = this;
    var selectedpagename = this.props.selectedpagename;
    for(var i=0,j=p.config.root.length;i<j;i++){
      var tabkey = p.config.root[i];
      var tabconfig = p.page_view.page_state.components[tabkey];
      var tabpagename = tabconfig.tabpage||"";
      (
        function(_i,_p,_tabkey,_selectedpagename,_tabpagename,_tabs){
          var tab;
          if(_tabpagename==_selectedpagename){
             tab = CF.getComponent(_tabkey,_p.page_view,null,{selected:true,tabclick:(e)=>{
               alert("选中了又点");
             }});
          }else{
             tab = CF.getComponent(_tabkey,_p.page_view,null,{tabclick:(e)=>{
               _p.page_view.TabSelectedChange(_tabpagename);
             }});
          }
          _tabs.push(tab);
        }
      )(i,p,tabkey,selectedpagename,tabpagename,tabs);
    }

    return (
      <div className='xz-tab-nav' style={styleHelper.process(tabbarStyle)}>
        {tabs}
      </div>
    );
  }
}
module.exports = TabBar;
