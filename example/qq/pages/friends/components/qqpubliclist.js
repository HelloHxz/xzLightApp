import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"


var seed = 0;
function getUniqueKey(){
  seed+=1;
  return "qpl_"+seed;
}


@observer
class QQPublicList extends React.Component {


  constructor(props) {
    super(props)
  }

  renderGroup(datasource){
    var data = datasource.data;
    var rows = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
       if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }
      rows.push(<li className='qq-fri-list-row' key={itemdata._hxzuid}>
          <div className='qq-fri-avatar'>
            <xz.Image className='qq-list-avatar'/>
          </div>
          <div className='qq-fri-rowcontent'>
            <span className='qq-fri-content-name'>{itemdata.name}</span>
          </div>
        </li>);
    }
    return <ul>{rows}</ul>;
  }

  render() {
    var rows = [];
    var data = this.props.store.qqPublicData||[];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
       if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }
      rows.push(
          <xz.StickyView key={itemdata._hxzuid}
            scrollKey={this.props.listkey} pageview={this.props.pageview}>
            <div className='qq-public-section-header'>{itemdata.name}</div>
          </xz.StickyView>);
      rows.push(<div key={itemdata._hxzuid+"_group"}>{this.renderGroup(itemdata)}</div>);
    }
    return (
       <div>
        {rows}
       </div>);
  }
}
export default QQPublicList;
