import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation} from "../../../../../index"


var seed = 0;
function getUniqueKey(){
  seed+=1;
  return "mc_"+seed;
}
@observer
class ContactsList extends React.Component {


  constructor(props) {
    super(props)
  }


  onSticky(params){
      this.props.store.stickyKey = params.instance.props.name;
  }

  renderRow(rowdata){
    var children = [];
    children.push(<div key="s">
      <xz.StickyView 
        name={rowdata.name}
        id={"contact_"+rowdata.name} 
        onSticky={this.onSticky.bind(this)}
        pageview={this.props.pageview} scrollKey={this.props.scrollKey}><div className='weichat-contact-secheader'>{rowdata.name}</div></xz.StickyView>
    </div>);
    var childData = rowdata.data||[];
    var groupchild = [];
    for(var i=0,j=childData.length;i<j;i++){
      var itemdata = childData[i];
      if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }
      groupchild.push(<div className="weichat-contact-row" key={itemdata._hxzuid}>
          <div className='weichat-contact-avatar'></div>
          <span>{itemdata.name}</span>
        </div>);
    }
    children.push(<div className='weichat-contact-group'>{groupchild}</div>);

    return children;
  }

  render() {
    var rows = [];
    var data = this.props.store.listData||[];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
      if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }
      rows.push(<div key={itemdata._hxzuid} className='weichat-contact-section'>
          {this.renderRow(itemdata)}
        </div>);
    }
    return (
       <div className='weichat-contact-list'>
        {rows}
       </div> 
       );
  }
}
export default ContactsList;
