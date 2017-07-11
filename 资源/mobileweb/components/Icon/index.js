var React = require("react");
import * as styleHelper from '../../common/styleHelper';

class Icon extends React.Component {
  constructor(props) {
    super(props)
  }

  clickHandle(e){
    if(this.props.tabclick){
      this.props.tabclick();
    }
		this.props.page_view.fireAction(this.props.config,{sender:this,e:e})
  }

  createMarkup(icon){
    return  {__html: '<i data-icon="&#x'+icon+';"></i>'};
  }

  render() {
    var config = this.props.config;
    var text = config.text||"";
    var styles = config.style||{};
    var textStyle = config.textStyle||{};
    var iconStyle =Object.assign({},config.iconStyle||{}) ;
    var textPos = config.textPos||"right";
    var icon;
    // fontFamily_fontcode
    var font = this.props.font||config.font;
    var child = [];

    if(font){
      var font_arr = font.split("_");
      if(font_arr.length == 2){
        iconStyle.fontFamily = font_arr[0];
        icon = font_arr[1];
      }
    }
    var selected = this.props.row_data?this.props.row_data.$$selected:this.props.selected;
    if(selected){
      iconStyle.color=this.props.config.selectedcolor||"blue";
      textStyle.color=this.props.config.selectedcolor||"blue";
      if(this.props.config.selectedicon){
        icon = this.props.config.selectedicon;
      }
    }



    if(icon!=""){
      child.push(<div key={this.props.com_ref+'icon'} dangerouslySetInnerHTML={this.createMarkup(icon)} style={styleHelper.process(iconStyle)} ></div>);
    }
    if(text!=""){
      child.push(<div key={this.props.com_ref+'text'} style={styleHelper.process(textStyle)}>{text}</div>);
    }
    if(textPos=="left" || textPos=="top")
    {
      child = child.reverse();
    }
    if(textPos == "top" || textPos =="bottom"){
      styles["flexDirection"] = "column";
    }else{
      styles["flexDirection"] = "row";
    }
    if(!styles.justifyContent){styles.justifyContent="center";}
    if(!styles.alignItems){styles.alignItems="center";}
    return (<div id={this.props.com_ref} data-ref={this.props.com_ref} ref='wrapper' data-role='xz.icon'  className='xz-icon' style={styleHelper.process(styles)} onClick={(e) => this.clickHandle(e)}>
      {child}
    </div>);
  }
}
module.exports = Icon;
