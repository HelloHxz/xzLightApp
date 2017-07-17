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

  render() {
    var rows = [];
    var data = this.props.store.multiChatData||[];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
      if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }
      rows.push(<li key={itemdata._hxzuid}>{itemdata.name}</li>);
    }
    return (
      <div>
       <div className='create-group-btn'>
        <span>创建多人聊天</span>
       </div>
       <ul>
        {rows}
       </ul> 
      </div>);
  }
}
export default MultiChat;
