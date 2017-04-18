import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import {dynamicReducer,dataReduce} from './reducer/dynamicReducer';
import { PageView } from './container/PageView';
import { TabBarPageView } from './container/TabBarPageView';
import createHistory from 'history/lib/createHashHistory';
import * as pageActions from './reducer/actions';
var app_config = require("./app_config");
import * as PluginBridge from './pluginBridge';
import * as pagesBridge from "./registrator/pageRegistrator"

require("./common/less/common.less");

// import FastClick from 'fastclick';
//
// window.addEventListener('load', () => {
//   FastClick.attach(document.body);
// });

pagesBridge.add("buttons",require("./pages/buttons"));
pagesBridge.add("home",require("./pages/home"));
pagesBridge.add("goodsdetail",require("./pages/goodsDetail"));
pagesBridge.add("page0",require("./pages/page0"));
pagesBridge.add("tabbarpage",require("./pages/tabbarpage"));
pagesBridge.add("page1",require("./pages/page1"));
pagesBridge.add("saoyisao",require("./pages/saoyisao"));
pagesBridge.add("setting",require("./pages/setting"));
pagesBridge.add("sliderP",require("./pages/sliderP"));
pagesBridge.add("what",require("./pages/what"));
pagesBridge.add("why",require("./pages/why"));


PluginBridge.add("page1",require("./logicPlugins/page1"));
PluginBridge.add("goodsdetail",require("./logicPlugins/goodsDetail"));

function getParamsFromUrl(){
  var Arr = window.location.hash.split("?");
  if(Arr.length!=2){
    return null;//返回{}的话 会触发render
  }
  var re = null;
  var paramsArr = Arr[1].split("&");
  for(var i=0,j=paramsArr.length;i<j;i++){
    var key_value_arr = paramsArr[i].split("=");
    if(key_value_arr.length==2){
      re=re||{};
      re[key_value_arr[0]] = key_value_arr[1];
    }
  }
  return re;
}

class RootNav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state={curpagename:null}
    this.isPrevent = false;
    this.isForward = true;
    this.FromPage = this.getPageNameFromUrl();
    this.getUniquePageKey = this.getUniquePageKey.bind(this);
    this.routeCardStack = {};
    this.keyMapping = {};
    this.canGo = true;
    this.Go = this.Go.bind(this);
  }

  componentDidMount(){
    var _this = this;
    this.pagekeySeed = 0;
    this.TabSelected = this.TabSelected.bind(this);
    window.onhashchange=function(){

      if(_this.isPrevent){
        //阻止回退的时候改变url会再次触发hashchange事件 使用一个开关变量阻止
        _this.isPrevent = false;
        _this.isForward = false;
        return;
      }

      // if(_this.isForward){
      //   console.log("前进");
      // }else{
      //   console.log("后退");
      // }
      if(_this.state.curpagename&&_this.state.curpagename!=""){
        _this.FromPage = _this.state.curpagename;
      }
      var ToPageName = _this.getPageNameFromUrl();
      //在这里模拟阻止回退 （阻止前进更简单）
      // if(ToPageName=="home"){
      //   _this.isPrevent = true;
      //   window.history.go(-1); //把url修复回去
      //   return;
      // }

      _this.setState({curpagename:ToPageName});
      _this.isForward = false;
    }
  }

  goBack(){
    this.isForward = false;
    window.history.go(-1);
  }


  getUniquePageKey(pagekey){
    //routeCardStack
    var hasSameKeyInStack = false;
    for(var key in this.routeCardStack){
      var key_arr = key.split("$$");
      if(key_arr[0]==pagekey){
        this.pagekeySeed += 1;
        hasSameKeyInStack = true;
        break;
      }
    }
    return hasSameKeyInStack?(pagekey+"$$"+this.pagekeySeed):pagekey;
  }

  Go(action){
    var _this = this;
    if(!this.canGo){
      return;
    }
    this.canGo = false;
    window.setTimeout(function(){
      _this.canGo = true;
    },400);
    var pagekey = this.getUniquePageKey(action.to);
    var params = action.params||{};

    this.isForward = true;

    var paramsArr = [];
    for(var key in params){
      paramsArr.push(key+"="+params[key]);
    }
    if(paramsArr.length>0){
      location.hash = pagekey+"?"+paramsArr.join("&");
    }else{
      location.hash = pagekey;
    }
  }



  Replace(pagekey,params){
    this.isForward = true;
    // window.location.hash.replace("#"+pagekey);
    location.replace(location.href.split("#")[0] + '#' + pagekey);
  }

  TabSelected(pagekey,params){
      //使用tabbar的时候不使用hashchange进行渲染 避免像侧滑栏不必要的render  tabbar内部使用自己的setState
    this.isPrevent = true;
    this.isForward = true;
    location.replace(location.href.split("#")[0] + '#' + pagekey);
  }

  getPageLayoutMes(pagekey){
    //  tabbar_pageview$$seed
    var layoutMes = {
      tabbar:null,
      pageview:null
    };
    var pagename_arr = pagekey.split("$$")[0].split("_");
    if(pagename_arr.length==2){
      return {
        tabbar:pagename_arr[0],
        pageview:pagename_arr[1]
      };
    }
    return {
      tabbar:null,
      pageview:pagekey
    };

  }

  getScene(pagename){
        var layoutMes = this.getPageLayoutMes(pagename);
        var params = getParamsFromUrl();
        if(!layoutMes.pageview){
          console.error("你要跳转的页面没有具体的pageview～以后再把错误信息描述清楚");
        }

        var PageInstance = PageView(layoutMes.pageview);
        if(layoutMes.tabbar!=null){
          var TabbarInstance = TabBarPageView(layoutMes.tabbar);
          return (
              <TabbarInstance params={params} com_ref={layoutMes.tabbar} rootNav={this} pagename={layoutMes.pageview}>
              </TabbarInstance>
          );
        }
        return (<PageInstance params={params} com_ref={layoutMes.pageview}  rootNav={this}></PageInstance>);
  }


  renderScene(pagename){
    // console.log(this.isForward?"前进到":"后退到");
    this.routeCardStack[pagename]=this.getScene(pagename);
    var needDeletePageName=null;
    if(!this.isForward){
      window.setTimeout(
        () => {
          delete this.routeCardStack[this.FromPage];
          delete this.keyMapping[this.FromPage];
        },
        300
      );
    }
    if(!this.keyMapping[pagename]){
      this.keyMapping[pagename] = 'rw_'+pagename+'_'+((new Date()).valueOf());
    }
    var Arr=[];
    for(var key in this.routeCardStack){
      if(key==pagename&&this.FromPage!=pagename){
        var c = this.isForward?"xz-page-route-wrapper right-in":"xz-page-route-wrapper left-in";
        Arr.push(<div className={c} key={this.keyMapping[key]}>{this.routeCardStack[key]}</div>);
      }else if(key==this.FromPage&&this.FromPage!=pagename){
        var c = this.isForward?"xz-page-route-wrapper right-out":"xz-page-route-wrapper left-out";
        Arr.push(<div className={c} key={this.keyMapping[key]}>{this.routeCardStack[key]}</div>);
      }else if(this.FromPage==pagename){
        Arr.push(<div className='xz-page-route-wrapper' key={this.keyMapping[key]}>{this.routeCardStack[key]}</div>);
      }else{
        Arr.push(<div className='xz-page-route-wrapper' key={this.keyMapping[key]} style={{left:"-120%"}}>{this.routeCardStack[key]}</div>);
      }
    }
    // this.FromPage;
    return (<div className='xz-page-out-wrapper'>{Arr}</div>);

  }

  getPageNameFromUrl(){
    var nameArr = window.location.hash.split("#");
    if(nameArr.length!=2){
      return this.props.pages_mapping.root;
    }
    var s = nameArr[1];
    var sArr = s.split("?");
    return sArr[0];
  }



  render(){
    var curpagename = this.state.curpagename||this.getPageNameFromUrl();

    // console.log(this.FromPage+"   "+(this.FromPage==curpagename?"自刷新":(this.isForward?"前进到":"后退到"))+"   "+curpagename);
    return this.renderScene(curpagename);
  }
}



var appConfigClone =Object.assign({},app_config);

function getCtlByKeyFromCtlPool(key){
  if(appConfigClone.ctlpool){
    var keyArr =key.split("-");
    if(keyArr.length<2){
      return null;
    }
    var config = appConfigClone.ctlpool[keyArr[0]];
    if(config){
      return Object.assign({},config);
    }
  }
  return null;
}

function copyCommonCtlConfigFromCthPool(root,pageConfig){
  if(!root){return;}
  const page_components = pageConfig.components;

  //1. 实现配置文件控件代码共享
  for(var i=0,j=root.length;i<j;i++){
    var ctlKey = root[i];
    var rootCtlConfig = page_components[ctlKey];
    if(!rootCtlConfig){
      var ctlCfg = getCtlByKeyFromCtlPool(ctlKey);
      if(ctlCfg){
       pageConfig.components[ctlKey] = ctlCfg;
      }
    }
  }
}


var defaultkeys=["style","iconStyle","textStyle"];
function copyCommonStyleConfigFromStylePool(com_config){
  if(!appConfigClone.stylepool){
    return com_config;
  }

  for(var index in defaultkeys){
    var stylekey = defaultkeys[index];
    var style = com_config[stylekey];

    if(!style||!style["common"]){
      continue;
    }

    var commonStyleKeys = style["common"];
    var realStyle = {};

    if(typeof(commonStyleKeys)==="string"){
      commonStyleKeys = [commonStyleKeys];
    }

    if((commonStyleKeys instanceof Array)){
      for(var i=0,j=commonStyleKeys.length;i<j;i++){
        var commonkey = commonStyleKeys[i];
        var commonStyles = appConfigClone.stylepool[commonkey];
        if(!commonStyles){
          continue;
        }
        for(var key in commonStyles){
          realStyle[key] = commonStyles[key];
        }
      }
    }
    for(var key in style){
      if(key=="common"){
        continue;
      }
      realStyle[key] = style[key];
    }

    com_config[stylekey] = realStyle;

  }
  return com_config;
}


const middleware = applyMiddleware(thunk);
let createStoreWithMiddleware = compose(middleware);

//根据app_config的结构 构建Store  ctlpool
//Store包括行为样式部分以及数据部分
const reduceMapping ={};
const pages = Object.assign({},pagesBridge.dict());
const temp_datasource_mapping = {};
let pages_ID_Dict={};
let pages_mapping={};
/*
  pages_mapping:{
    root:"page1",
    page0:{tabbar:"tabbarpage",drawerlayout:"sliderP"},
    home:{tabbar:"tabbarpage",drawerlayout:"sliderP"},
    why:{tabbar:"tabbarpage",drawerlayout:"sliderP"},
    setting:{tabbar:"tabbarpage",drawerlayout:"sliderP"}
  }
*/
let seed = 0;
for(const pagename in pages){
  if(pagename.indexOf("_")>0){
    console.error("页面名称不允许存在下划线_");
  }
  let pageConfig = pages[pagename];
  const page_components = pageConfig.components;
  let pageType = pageConfig.type;
  if(!pageConfig.root){
    console.error("页面缺少root属性 root为数组");
  }
  if(!page_components){
    console.error("页面缺少components属性 components为字典");
  }

  copyCommonCtlConfigFromCthPool(pageConfig.root,pageConfig);
  //1. 实现配置文件控件代码共享

  for(var i=0,j=pageConfig.root.length;i<j;i++){
    var ctlKey = pageConfig.root[i];
    var rootCtlConfig = page_components[ctlKey];
    if(!rootCtlConfig){
      var ctlCfg = getCtlByKeyFromCtlPool(ctlKey);
      if(ctlCfg){
       pageConfig.components[ctlKey] = ctlCfg;
      }
    }
  }

  if(page_components){
    for(const com_ref in page_components){
      let com_config = page_components[com_ref];
      //1. 实现配置文件控件代码共享
      copyCommonCtlConfigFromCthPool(com_config.root,pageConfig);
      //2. 数据源的相关配置
      com_config = copyCommonStyleConfigFromStylePool(com_config);


    }
  }

  reduceMapping[pagename] = dynamicReducer(pageConfig,pagename);

  //构建pages_mapping
  if(pageType=="pageview"){
    if(seed==0){
      pages_mapping.root=pagename;
    }
    if(pageConfig.isRoot==="true"||pageConfig.isRoot===true){
      pages_mapping.root=pagename;
    }
  }else if(pageType=="tpageview"){
    let tabbar_com_ref = pageConfig.root[0];
    if(!tabbar_com_ref){
      console.error(pagename+"  页面缺少root配置");
    }
    let tabbar_config = pageConfig.components[tabbar_com_ref];
    if(!tabbar_config||tabbar_config.type!="xz.tabbar"){
      console.error(pagename+"  页面缺少tabbar控件的配置(xz.tabbar)");
    }
    if(!tabbar_config.root){
      console.error(tabbar_com_ref+" 控件缺少root配置");
    }
    for(var i = 0,j=tabbar_config.root.length;i<j;i++){
      var tabitem_com_ref = tabbar_config.root[i];
      var tabitem_com_config = pageConfig.components[tabitem_com_ref];
      if(!tabitem_com_config){
        console.error(tabbar_com_ref+" 控件缺少"+tabitem_com_ref+"子组件配置");
      }
      var tabpage = tabitem_com_config.tabpage;
      if(tabpage){
        pages_mapping[tabpage] = pages_mapping[tabpage]||{};
        pages_mapping[tabpage].tabbar = pagename;
      }
    }
  }else{
    console.error("无效的页面类型配置或者没有配置页面的pagetype属性pageview||tpageview||dpageview");
  }
  seed+=1;

}

// for(const datasourcekey in temp_datasource_mapping){
//   reduceMapping[datasourcekey] =dataReduce(temp_datasource_mapping[datasourcekey],datasourcekey);
// }
reduceMapping["$$common"] = dynamicReducer({},"$$common");
const store = createStoreWithMiddleware(createStore)(
    combineReducers(reduceMapping)
);
render((
  <Provider store={store}>
    <RootNav pages_mapping={pages_mapping} app_pages={pages}/>
  </Provider>
), document.getElementById('root_container'))
