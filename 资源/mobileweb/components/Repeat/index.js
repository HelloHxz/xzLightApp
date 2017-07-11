var React = require("react");
var Helper = require('../../common/utils');
require("./index.less");
import * as styleHelper from '../../common/styleHelper';

class RepeatItem extends React.Component {
  constructor(props) {
    super(props)
    this.pk = null;
    this.itemClick = this.itemClick.bind(this);
    if(props.config.selectedmode){
      var dataPrimaryKey = props.page_view.page_state.primaryKey;
      if(!dataPrimaryKey){
        alert("没有指定主键");
      }
      this.pk = dataPrimaryKey[props.parent.props.dataSourceKey];
      if(!this.pk){
        alert("没有指定主键");
      }
    }

  }
  fireAction(childConfig,params){
  }

  itemClick(){
    if(this.props.page_view.plugin){
      var com_key=this.props.parent.props.com_ref;
      var method = this.props.page_view.plugin[com_key+"_change"];
      method&&method(this,{rowData:this.props.row_data});
    }
    var sourceKey = this.props.parent.props.dataSourceKey;
    if(this.props.config.selectedmode=="s"){
      var dataSource = this.props.page_view.page_state.dataSource[sourceKey];
      for(var i=0,j=dataSource.length;i<j;i++){
        dataSource[i]["$$selected"] = dataSource[i][this.pk] == this.props.row_data[this.pk];
      }
      var path = "dataSource."+sourceKey;
      this.props.page_view.props.actions["modifyPageState"]({page:this.props.page_view.props.com_ref,path:path,value:dataSource});
     }else if(this.props.config.selectedmode=="m"){

     }
  }

  render() {
      var itemStyle  = this.props.parent.props.config.itemStyle||{};
      return (<div onClick={this.itemClick} className='xz-repeatitem displayflex' style={styleHelper.process(itemStyle)}>{Helper.getLayout(this.props.config,this.props.page_view,this.props.row_data)}</div>);
  }
}


class Repeat extends React.Component {
  constructor(props) {
    super(props)
    this.isInit = true;
    this.DataSouce = [];
    this.props.page_view.ctl_with_datasource[this.props.com_ref]= this;
  }
  loadData(){

  }

  componentWillReceiveProps(props){
    if(this.isInit){
      this.DataSouce = this.props.datasource||[];
      // this.DataSouce[0]["$$selected"] = true;
    }else{
      this.DataSouce = this.props.datasource||[];
    }
    this.isInit = false;
  }

  render() {
    var styles = this.props.config.style;
    var col = this.props.config.col||1;
    var rows = [];
    if(this.DataSouce instanceof Array){
      for(var i =0,j=this.DataSouce.length;i<j;i++){
         rows.push(<RepeatItem col={col} parent={this} config={this.props.config} page_view={this.props.page_view} row_data={this.DataSouce[i]} key={i}></RepeatItem>);
      }
    }else{
      console.error("Repeat 数据源必须为 数组类型");
    }
    return (<div className="xz-repeat displayflex" id={this.props.com_ref} data-ref={this.props.com_ref} data-role='xz.Repeat' ref='wrapper' style={styleHelper.process(styles)}>{rows}</div>);
  }
}


module.exports = Repeat;
