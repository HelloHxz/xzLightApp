import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'



var seed = 0;
function getUniqueKey(){
  seed+=1;
  return "left_"+seed;
}
@observer
class DianCaiLeftList extends React.Component {
  constructor(props) {
    super(props)
  }

  
  render() {
    var data = this.props.shopStore.diancaiData||[];
    var children = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemData = data[i];
      if(!itemData._uuuuid){
        itemData._uuuuid = getUniqueKey();
      }
      children.push(<li key={itemData._uuuuid}>{itemData.name}</li>);
    }
    return (
    	<ul className='meituan-diancai-leftlist'>
        {children}
    	</ul>);
  }
}
export default DianCaiLeftList;
