var React = require("react");
var Helper = require('../../common/utils');
require("./index.less");
import * as styleHelper from '../../common/styleHelper';

class ListRow extends React.Component {
  constructor(props) {
    super(props)
    this.rowClick = this.rowClick.bind(this);

  }
  fireAction(childConfig,params){
  }

  rowClick(){
    if(this.props.page_view.plugin){
      var com_key=this.props.list_view.props.com_ref;
      var method = this.props.page_view.plugin[com_key+"_rowclick"];
      method&&method(this,{rowData:this.props.row_data});
    }
  }
  // clickHandle(e){
  //   this.props.page_view.fireAction(this.props.config,{"sender":this})
  // }
  render() {
      var com = Helper.getLayout(this.props.config,this.props.page_view,this.props.row_data);
      var rowstyle  = this.props.list_view.props.config.rowStyle||{};
      if(this.props.col>1){
        rowstyle["float"]="left";
        rowstyle["width"]=(100/this.props.col)+"%";
      }
      if(this.props.config.onClick){

      }
      return (<div onClick={this.rowClick} className='xz_listrow' style={styleHelper.process(rowstyle)}>{com}</div>);
  }
}


class ListView extends React.Component {
  constructor(props) {
    super(props)


    this.props.page_view.ctl_with_datasource[this.props.com_ref]= this;
  }
  loadData(){

  }

  render() {
    var styles = this.props.config.style;
    var DataSouce = this.props.datasource||[];
    var col = this.props.config.col||1;
    var rows = [];
    if(DataSouce instanceof Array){
      for(var i =0,j=DataSouce.length;i<j;i++){
         rows.push(<ListRow col={col} list_view={this} config={this.props.config} page_view={this.props.page_view} row_data={DataSouce[i]} key={i}></ListRow>);
      }
    }else{
      console.error("listview 数据源必须为 数组类型");
    }
    return (<div className="xz_listview" id={this.props.com_ref} data-ref={this.props.com_ref} data-role='xz.listview' ref='wrapper' style={styleHelper.process(styles)}>{rows}</div>);
  }
}


module.exports = ListView;
