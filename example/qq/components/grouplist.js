import React from "react"
import {observer} from 'mobx-react'
import './css/grouplist.less'
import {xz,style,shallowEqual,Navigation} from "../../../index"

/*
  [
    {
      xx:"xxx",
      xxx:"xxxx",
      data:[
        {xxx:xxx,xx:xx},
        {xxx:xxx,xx:xx},
      ]
    },
    {
      xx:"xxx",
      xxxx:"xxxx",
      data:[
        {xxx:xxx,xx:xx},
        {xxx:xxx,xx:xx},
      ]
    }
    ......
  ]

*/

var seed = 0;
function getUniqueKey(){
  seed+=1;
  return "gl_"+seed;
}

@observer
class GroupList extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    var data = this.props.datasource||[];
     var children = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
      if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }
      children.push(<Group parent={this} key={itemdata._hxzuid} itemdata={itemdata}/>);
    }
    return <div>{children}</div>;
  }
}

@observer
class SectionHeader extends React.Component {

  constructor(props) {
    super(props)
  }



  sectionHeaderClick(){
    this.props.parent.sectionHeaderClick();
  }

  render() {
    var classNameArr = ["qq-gl-sec-header"];
    if(this.props.showBody){
      classNameArr.push("qq-gl-sec-header-open");
    }else{
      classNameArr.push("qq-gl-sec-header-close");
    }
    return <div className={classNameArr.join(" ")}>
        {this.props.renderSectionHeader({data:this.props.itemdata,
          isOpen:this.props.showBody,
          headerInstance:this
        })}
      </div>;
  }
}

@observer
class Group extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      showBody:props.parent.props.sectionOpen||false
    }
  }
  renderHeader(){
    if(this.props.parent.props.renderSectionHeader){
      return <SectionHeader
       parent={this}
       renderSectionHeader={this.props.parent.props.renderSectionHeader}
       itemdata={this.props.itemdata}
       showBody={this.state.showBody}>
        
        </SectionHeader>;
    }
    return <div>todo...renderSectionHeader</div>;
  }

  sectionHeaderClick(){
    this.setState({
      showBody:!this.state.showBody
    });
  }
  renderBody(){
    var data = this.props.itemdata.data||[];
    var children = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
       if(!itemdata._hxzuid){
        itemdata._hxzuid = getUniqueKey();
      }

      children.push(<div className='qq-gl-row' key={itemdata._hxzuid}>{this.props.parent.props.renderRow({data:itemdata})}</div>);
    }
    return children;
  }

  render() {
    var bodyClassArr = ["qq-gl-body"];
    if(this.state.showBody){
      bodyClassArr.push("qq-gl-body-show");
    }else{
      bodyClassArr.push("qq-gl-body-hide");
    }
    return (
        <div>
          <div>
            {this.renderHeader()}
          </div>
          <div className={bodyClassArr.join(" ")}>
            {this.renderBody()}
          </div>
        </div>
      );
  }
}
export default GroupList;
