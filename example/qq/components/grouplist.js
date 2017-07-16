import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../index"

/*
  [
    {
      id:"xxx",
      xxx:"xxxx",
      data:[
        {xxx:xxx,xx:xx},
        {xxx:xxx,xx:xx},
      ]
    },
    {
      id:"xxx",
      xxxx:"xxxx",
      data:[
        {xxx:xxx,xx:xx},
        {xxx:xxx,xx:xx},
      ]
    }
    ......
  ]

*/

@observer
class GroupList extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    var data = this.props.datasource||[];
     var children = [];
    for(var i=0,j=data.length;i<j;i++){
      children.push(<Group key={i} itemdata={data[i]}/>);
    }
    return <div>{children}</div>;
  }
}

@observer
class Group extends React.Component {

  constructor(props) {
    super(props)
  }
  renderHeader(){
    return <div>{this.props.itemdata.name}</div>;
  }
  renderBody(){
    var data = this.props.itemdata.data||[];
    var children = [];
    for(var i=0,j=data.length;i<j;i++){
      children.push(<div  key={i}>xx</div>);
    }
    return children;
  }

  render() {
  
    return (
        <div>
          <div>
            {this.renderHeader()}
          </div>
          <div>
            {this.renderBody()}
          </div>
        </div>
      );
  }
}
export default GroupList;
