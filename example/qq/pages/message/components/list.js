import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"


var seed = 0;
function getUniqueKey(){
  seed+=1;
  return "mc_"+seed;
}
@observer
class MultiChat extends React.Component {


  constructor(props) {
    super(props)
  }

  renderRow(rowdata){
    var children = [];
    children.push(<div key='avatar' className='qq-mes-avatar-wrapper'>
      <div className='qq-mes-avatar'/>
      </div>);
    children.push(<div key='content' className='qq-mes-row-content'></div>);
    return children;
  }

  render() {
    var rows = [];
    var data = this.props.store.messageListData||[];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
      if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }
      rows.push(<li key={itemdata._hxzuid} className='qq-mes-row'>
          {this.renderRow(itemdata)}
        </li>);
    }
    return (
       <ul className='qq-mes-list'>
        {rows}
       </ul> 
       );
  }
}
export default MultiChat;
