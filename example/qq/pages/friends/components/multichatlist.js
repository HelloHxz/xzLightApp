import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"

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
      rows.push(<li>{itemdata.name}</li>);
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
