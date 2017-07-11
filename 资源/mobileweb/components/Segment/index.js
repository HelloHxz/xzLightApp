var React = require("react");
import * as styleHelper from '../../common/styleHelper';
require("./index.less");


var styles1={
  style:{
    flexDirection:"row",
    display:"flex",
    border:0,
    justifyContent:"space-around",
    borderStyle:"solid",
    borderWidth:1,
    borderColor:"red",
    borderRadius:20,
    overflow:"hidden",
  },
  firstItemStyle:{
    borderLeftWidth:0
  },
  selectedItemStyle:{
    backgroundColor:"red"
  },
  itemStyle:{
    display:"flex",
    alignItems:"center",
    flex:1,
    border:0,
    borderStyle:"solid",
    height:26,
    borderLeftWidth:1,
    borderLeftColor:"red",
    justifyContent:"center"
  },
  selectedTextStyle:{
    color:"#fff"
  },
  textStyle:{
    spanAlign:"center"
  }
}

var styles2={
  style:{
    display:"flex",
    border:0,
  },
  firstItemStyle:{

  },
  selectedItemStyle:{
  },
  itemStyle:{
    display:"flex",
    alignItems:"center",
    border:0,
    overflow:"hidden",
    height:36,
    justifyContent:"center"
  },
  selectedTextStyle:{
    color:"red",
    fontSize:15
  },
  textStyle:{
    spanAlign:"center",
    fontSize:14
  },
  indicatorStyle:{
    position:"absolute",
    bottom:0,
    left:0,
    height:2,
    backgroundColor:"red"
  }
};
class xzSegment extends React.Component {
  constructor(props) {
    super(props)
    this.styletype = props.config.styletype||"1";
    this.state={
      selectedIndex:props.selectedIndex||0
    }
  }

  componentDidMount(){
  }

  // shouldComponentUpdate(nextProps,nextState){
  //   return this.props.config!=nextProps.config;
  // }
  componentWillReceiveProps(props){
  }
  change(i,e){
    this.setState({"selectedIndex":i});
    var changewith = this.props.config.changewith;
    if(changewith){
      this.props.page_view.props.actions.modifyProperty({sender:null,math:(Math.random()*1000),selectedIndex:i,page:this.props.page_view.props.com_ref,to:changewith})
    }
  }

  processStyle(defaultStyle,config){
    for(var key in defaultStyle){
      if(config[key]){
        defaultStyle[key] =({...defaultStyle[key],...config[key]});
      }
      if(key=="itemStyle"){
        if(defaultStyle[key]["width"]&&defaultStyle[key]["flex"]){
          delete defaultStyle[key]["flex"];
        }
      }
      defaultStyle[key] = styleHelper.process(defaultStyle[key]);
      if(key=="itemStyle"||key=="selectedItemStyle"||key=="firstItemStyle"){
        delete defaultStyle[key]["position"];
      }


    }
    return defaultStyle;
  }

  render() {
    var styles={};
    var items = this.props.config.items||["首页","新闻","资讯"];
    var tabs = [];
    if(this.styletype=="1"){
      styles=Object.assign({},styles1);
    } else if(this.styletype=="2"){
      styles=Object.assign({},styles2);
    }else if(this.styletype=="3"){
      styles=Object.assign({},styles1);
    }

    styles = this.processStyle(styles,this.props.config);
    var ctlWidth = styles.style.width||document.body.offsetWidth;

    if(!styles.itemStyle.width){
      styles.itemStyle.flex=1;
    }
    for(var i=0,j=items.length;i<j;i++){
      var itemstyle=i==0?{...styles.itemStyle,...styles.firstItemStyle}:styles.itemStyle;
      var itemspan = items[i];
      if(i==this.state.selectedIndex){
        var curitemstyle ={...itemstyle,...styles.selectedItemStyle};
        var curtextstyle = {...styles.textStyle,...styles.selectedTextStyle};
        tabs.push(<div key={this.props.com_ref+"_"+i} style={curitemstyle}><span style={curtextstyle}>{itemspan}</span></div>);
      }else{
        tabs.push(<div onClick={this.change.bind(this,i)} key={this.props.com_ref+"_"+i} style={itemstyle}><span style={styles.textStyle}>{itemspan}</span></div>);
      }
    }

    if(this.styletype=="1"){
      return (<div style={styles.style}>{tabs}</div>);
    } else if(this.styletype=="2"){
        var itemWidth = styles.itemStyle.width||ctlWidth/items.length;
        var curIndicatorStyle = {...styles.indicatorStyle,...{width:itemWidth,left:this.state.selectedIndex*itemWidth}};
        if(styles.itemStyle.flex){
          var wrapperStyle = {...styles.style,...{flexDirection:"row"}};
          return (<div style={wrapperStyle}><div className='xz-segment-indicator' style={curIndicatorStyle}></div>{tabs}</div>);
        }else{
          styles.style.overflow="auto";
          return (<div className='xz-segment-wrapper' style={styles.style}><div className='xz-segment-indicator' style={curIndicatorStyle}></div>{tabs}</div>);
        }
    }else if(this.styletype=="3"){
    }
    return (<div style={styles.style}>{tabs}</div>);
  }
}
module.exports = xzSegment;
