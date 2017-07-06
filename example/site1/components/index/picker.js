import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"



var selectorData=[[
  {
    label:"China",
    value:"0",
    children:[
      {label:"Cf2",value:"2",
        children:[
          {label:"CC",value:"2"},
          {label:"CC",value:"2"},
          {label:"CC",value:"2"}
        ]
      },
      {label:"C4",value:"2",
        children:[
          {label:"CC2",value:"2"},
          {label:"CC3",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"Cs",value:"2",
        children:[
          {label:"CC2",value:"2"},
          {label:"CC4",value:"2"},
          {label:"CC5",value:"2"}
        ]},
      {label:"Cds",value:"2",
        children:[
          {label:"CC6",value:"2"},
          {label:"CC3",value:"2"},
          {label:"CC",value:"2"}
        ]},
    ]
  },
  {
    label:"USA",
    value:"1",
    children:[
      {label:"USA1",value:"2",
        children:[
          {label:"USA1",value:"2"},
          {label:"CC",value:"2"},
          {label:"CC",value:"2"}
        ]},
      {label:"USA2",value:"2",
        children:[
          {label:"USA2",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"USA3",value:"2",
        children:[
          {label:"USA3",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"USA4",value:"2",
        children:[
          {label:"USA4",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
    ]
  }

],[
  {
    label:"xxx",
    value:"xxx"
  },
   {
    label:"x11xx",
    value:"xxx"
  },

]];

@observer
class Picker extends React.Component {

  constructor(props) {
    super(props)
  }


  selBackLayerClick(){
    this.props.store.isShowSelector = false;
  }


  pickerOk(){
    //this.props.store.pickerSelectedIndexs = [1,1,1];
    //
    this.props.store.pickerSelectedValues = [1,1,1];
  }


  render() {
    return (
        <xz.Picker 
        onBackLayerClick={this.selBackLayerClick.bind(this)}
        datasource={selectorData}
        cascadeCount={3}
        okMethod={this.pickerOk.bind(this)}
        selectedValues = {this.props.store.pickerSelectedValues}
        selectedIndexs={this.props.store.pickerSelectedIndexs}
        show={this.props.store.isShowSelector}
        loadData={[]}></xz.Picker>
    	);
  }
}
export default Picker;
