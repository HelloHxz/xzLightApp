import React from "react"
import {xz,Navigation,style} from "../../../../../index"
import {observer} from 'mobx-react'


var seed = 0;
function getUniqueKey(){
  seed+=1;
  return "right_"+seed;
}
@observer
class DianCaiRightList extends React.Component {
  constructor(props) {
    super(props)
  }


  renderGroup(data,children){
    for(var i=0,j=data.length;i<j;i++){
      var itemData = data[i];
      if(!itemData._uuuuid){
        itemData._uuuuid = getUniqueKey();
      }
      children.push(<div key={itemData._uuuuid} className='mt-dc-row'>{itemData.name}</div>
        );
    }
  }

  
  render() {
    var data = this.props.shopStore.diancaiData||[];
    var children = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemData = data[i];
      if(!itemData._uuuuid){
        itemData._uuuuid = getUniqueKey();
      }
      children.push(<xz.StickyView 
        scrollKey={this.props.scrollKey}
        pageview={this.props.pageview}
        key={itemData._uuuuid}>
        <div className='mt-dc-secheader'><span>{itemData.name}</span></div>
        </xz.StickyView>);
      this.renderGroup(itemData.data,children);
    }
    return (
      <div className='meituan-diancai-rightlist'>
        {children}
      </div>);
  }
}
export default DianCaiRightList;
