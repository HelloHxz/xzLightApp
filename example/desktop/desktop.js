import React from "react";
import "./index.less"
import Swiper from "../../src/components/swiper"
import Image from "../../src/components/image"



var siwperData = [
 {apps:[]},
 {apps:[
    {name:"日历",icon:"",key:"calendar"},
    {name:"邮件",icon:"",key:"email"},
    {name:"美团",icon:"",key:"meituan"},
    {name:"QQ",icon:"",key:"qq"},
    {name:"WeiChat",icon:"",key:"weichat"},
    {name:"微博",icon:"",key:"weibo"},
    {name:"支付宝",icon:"",key:"zhifubao"},
    {name:"京东",icon:"",key:"site1"},
  ]},
 {apps:[
    {name:"手机淘宝",icon:"",key:"site1"},
    {name:"短信",icon:"",key:"site1"},
    {name:"饿了么",icon:"",key:"site1"},
    {name:"美团外卖",icon:"",key:"site1"},
    {name:"拉钩",icon:"",key:"site1"},
    {name:"知乎",icon:"",key:"site1"},
    {name:"百度云",icon:"",key:"site1"},
  ]},
];

var toobardata=[
  {name:"电话",icon:"",key:"site1"},
  {name:"safari",icon:"",key:"site1"},
  {name:"信息",icon:"",key:"site1"},
  {name:"音乐",icon:"",key:"site1"},
];

class DeskTop extends React.Component {
  constructor(props) {
    super(props)
  }

  renderSwiperItem(params){
    var child = [];
    if(params.index===0){
      child.push(<div key="main">todo... searchpage</div>);
    }else{
      var appsData = params.data.apps;
      var apps = [];
      for(var i=0,j=appsData.length;i<j;i++){
        var item = appsData[i];
        apps.push(<li onClick={this.appClick.bind(this,item)} className='desktop-list-item' key={item.name}><div className='desktop-icon'></div><span className="desktop-name">{item.name}</span></li>);
      }
      child.push(<ul className='desktop-list' key="list">{apps}</ul>);
    }
   

    return (<div className='desktop-swiper-item'>
        {child}
      </div>);
  }

  appClick(data){
    window.location.href = "./"+data.key+".html";
  }


  renderIndicator(params){
    var len = params.length;
    var curIndex = params.curIndex;
    var point = [];
    for(var i=0;i<len;i++){
      point.push(<span className={i===curIndex?"desktop-sel-indi":"desktop-indi"} key={i}></span>);
    }
    return <div className="desktop-indwrap">{point}</div>;
  }


  render() {
    var toolbarapps=[];
    for(var i=0;i<toobardata.length;i++){
      var item = toobardata[i];
      toolbarapps.push( <div  onClick={this.appClick.bind(this,item)}  key={item.name} className='desktop-list-item'>
              <div className='desktop-icon'/>
              <div className='desktop-name'>{item.name}</div>
            </div>);
    }
    return (<div className='desktop-inner'> <Swiper ref={(instance)=>{this.topswiper = instance;}} 
            className="desktop-swiper"
            lazyrender={false} 
            renderIndicator={this.renderIndicator.bind(this)}
            selectedIndex={1}
            cache={true} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </Swiper>
          <div className='desktop-toolbar' key="toolbar">
            <div className='desktop-toolbar-inner'>{toolbarapps}</div>
          </div>
          </div>);
  }
}
export default DeskTop;
