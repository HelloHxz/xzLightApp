import React from "react"
import "../css/segmentdemo.less"
import {xz,style,shallowEqual,Navigation} from "../../../index"

class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      seletctTabKey :"tabbarpage/segmentdemo/horizontalsegment"
    }
  }

  renderIndicator(params){
    console.log(params.curIndex);
    var rect = params.rect;
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      top:"0",
      left:((params.curIndex)/params.itemCount*100+"%"),
      width:style.px2rem(rect.width)+"rem",
    };
    var arr = ["segment-switch-indi","segment-indi-nomal-ani"];
    return <div className={arr.join(" ")} style={indicatorStyle}></div>
  }
  onChange(params){
    var key = params.selectedKey;
    this.setState({
      seletctTabKey:key
    });
    this.props.pagemanager.replaceGo(key);
  }

  componentDidMount(){
    this.props.pagemanager.watchHashChange(this,(urlinfo)=>{
      var key  = urlinfo.pathArr.splice(0,3).join("/");
      this.setState({
        seletctTabKey:key
      });
    });
  }


  render() {
    return (<div className='full-screen'>
      <div className='app-header segment-header'>
        <xz.Segment className='segment-switch' onChange={this.onChange.bind(this)} renderIndicator={this.renderIndicator.bind(this)} selectedKey={this.state.seletctTabKey}>
          <xz.Segment.Item key='tabbarpage/segmentdemo/horizontalsegment'>水平</xz.Segment.Item>
          <xz.Segment.Item key='tabbarpage/segmentdemo/verticalsegment'>垂直</xz.Segment.Item> 
         </xz.Segment>
      </div>
      <Navigation.PageContainer className='full-screen' {...this.props}   owner={this}/>
    	</div>);
  }
}
export default PageView;
