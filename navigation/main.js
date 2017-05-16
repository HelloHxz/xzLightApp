import React from "react";
import PageView from "./container/pageview";


function NoAnimation(routeStack,pages){
  for(var i=0,j=routeStack.length;i<j;i++){
    var _key = routeStack[i]._key+"_wrapper";
    var instance = routeStack[i].page;

    if(i===j-1){
      pages.push(<div className='xz-page-route-wrapper' key={_key}>{instance}</div>);
      }else{
        pages.push(<div className='xz-page-route-wrapper'  style={{left:"-120%",visibility:"hidden"}} key={_key}>{instance}</div>);

      }
  }
}

function findPageIndex(key,routeStack){
  var Re = null;
  for(var i=0,j=routeStack.length;i<j;i++){
    if(routeStack[i]._key===key){
      Re = i;
      break;
    }
  }
  return Re;
}

function GoPreOrNext(isGoNext,lastClass,preClass,routeStack,pages,isReplaceGo,goPageKey){
  var deleteIndex = -1,deleteArr=[],realIndex=-1;
  for(var i=routeStack.length-1,j=routeStack.length;i>=0;i--){
    var _key = routeStack[i]._key+"_wrapper";
    var instance = routeStack[i].page;
    if(i===j-1){
        pages.push(<div className={lastClass} key={_key}>{instance}</div>);
    }else if(i===j-2||i===realIndex){
      if(!isGoNext){
        if(goPageKey!==routeStack[i]._key){
          //修复relacego之后回退路径不正确
          var index  = findPageIndex(goPageKey,routeStack);
          if(index||index===0){
            realIndex = index;
          }
          deleteIndex = i;
          continue;
        }
      }
      pages.push(<div className={preClass} key={_key}>{instance}</div>);
    }else{
      pages.push(<div className='xz-page-route-wrapper' key={_key} style={{left:"-120%",visibility:"hidden"}}>{instance}</div>);
    }
  }
  if(deleteIndex!==-1){
    routeStack.splice(deleteIndex,1);
  }
}

/*
  路由需要支持：
    1. 多级路由
    2. 参数传递
    3. modifyparams deleteparams addparams 修改参数 页面不刷新
    4. 阻止后退 可以使用自身的UI进行阻止（刚进来的第一页也可以阻止）
    5. 默认的是keepAlive 可设置不保留 前一个页面的状态和dom
*/
var isWantToPreventRoute = false,isReplaceGo=false,splitchar='_',systemseedname='_hxz';

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.routeStack = [];
    this.events={};
      
    this.seed = this.getMaxSeed();
    this.isForward = false;
    //浏览器并不会为第一个url记录hash记录 所以想禁止第一个页面离开 需要在第一次加载根路径的时候增加一个hash记录
    this.firstLoadToChangeHash = false;
    this.isInit = true;
    if(!this.props.config.root){
      console.error("没有指定root页面");
    }
    this.pageInstanceDict={};
    this.state={
        curpagename:this.props.config.root,
        renderseed:0
        ,pages:[]}  

  }

  getMaxSeed(){
    var seedObj = this.getUrlSeedObj();

    return Math.max(seedObj.__r,seedObj.__pr);
  }

  getUniqueSeed(){
    this.seed+=1;
    return this.seed;
  }

  componentDidMount(){
    var _this = this;
    window.onhashchange=function(){
      _this.hashChange();
    };

    this.start();
  }

  goBack() {
        this.isForward = false;
        window.history.go(-1);
  }
 

  start() {
    let config = this.props.config;
    this.appConfig = config;
    var toPage = this.getPageNameFromUrl();
   this.hashChange();
  }


  getUrlSeedStr(){
    var params =  this.getParamsFromUrl();
    return params[systemseedname]||("1"+splitchar+"0");
  }



  convertUrlSeedToObj(str){
    str = str||"";
    var arr = str.split(splitchar);
    var re =  {
      __r:arr[0],
      __pr:arr[1],
    };

    if(isNaN(re.__r)||!re.__r){
      re.__r = 0;

    }else{
       re.__r = parseInt(re.__r);
    }

    if(isNaN(re.__pr)||!re.__pr){
      re.__pr = 0;
    }else{
       re.__pr = parseInt(re.__pr);
    }

   
    return re;
  }

  getUrlSeedObj(){
    var seedStr = this.getUrlSeedStr();
    return this.convertUrlSeedToObj(seedStr);
  }

  getNewSeedStr(preSeedObj){
    var Re = [this.getUniqueSeed(),preSeedObj.__r]

    return Re.join(splitchar);
  }
  prepareGo(pageKey, params,isNotForward,_isReplaceGo){
    if(isNotForward!==true){
      this.isForward = true;
    }
    params = params || {};
    var preUrlParams = this.getParamsFromUrl();
    var prePageName = this.getPageNameFromUrl();
    prePageName = prePageName.split("/").shift();
    var toPageName = pageKey.split("/").shift();
    var seedStr = this.getUrlSeedStr();
    if(!seedStr){
      seedStr = [this.getUniqueSeed(),0].join(splitchar);
    }
    if((_isReplaceGo&&this.prePathArr.length===0)){
       //避免本不应该发生hashchange 被__r引发hashchange
       // 当是replace的时候也走这里 但是当前页面是多级的就不走了
       params[systemseedname] =seedStr;
    }else{
      var paramsIsNotSame = false;
      if(prePageName===toPageName){
        if(this.prePathArr.length===0){
          for(var key in params){
            var curkeyValue = (params[key]||"").toString();
            var prekeyValue = (preUrlParams[key]||"").toString();
            if(key!==systemseedname&& curkeyValue!==prekeyValue){
              paramsIsNotSame = true;
              break;
            }
          }
        }else{
          paramsIsNotSame = false;
        }
        
      }else{
        paramsIsNotSame = true;
      }

      if(!paramsIsNotSame){
         params[systemseedname] =seedStr;
      }else{
         var seedObj = this.convertUrlSeedToObj(seedStr);
          params[systemseedname] = this.getNewSeedStr(seedObj);
      }

    }
    
    var paramsArr = [];
    for (var key in params) {
        paramsArr.push(key + "=" + params[key]);
    }
    return paramsArr;
  }

  go(pageKey, params,isNotForward) {
    var paramsArr = this.prepareGo(pageKey, params,isNotForward);
    if (paramsArr.length > 0) {
        location.hash = pageKey + "?" + paramsArr.join("&");
    } else {
        location.hash = pageKey;
    }

    //当没有出发hashchange的时候
    setTimeout(()=>{
      this.isForward = false;
    },200);

  }
  replaceGo(pageKey, params) {
    isReplaceGo = true;
    var paramsArr = this.prepareGo(pageKey, params,false,true);
    this.isForward = true;
    if (paramsArr.length > 0) {
        location.replace(location.href.split("#")[0] + '#' + pageKey + "?" +  paramsArr.join("&"));
    } else {
        location.replace(location.href.split("#")[0] + '#' + pageKey);
    }

    //当没有出发hashchange的时候
    setTimeout(()=>{
      this.isForward = false;
    },200);
  }


  getPageNameFromUrl() {
    var nameArr = window.location.hash.split("#");
    // if (nameArr.length != 2) {
    //     return this.rootPageKey;
    // }
    var s = nameArr[1];
    if(!s){
      return this.props.config.root;
    }
    var sArr = s.split("?");
    return sArr[0]||"";
  }

  getParamsStrFromUrl() {
    var Arr = window.location.href.split("?");
    var str = Arr[Arr.length - 1];
    if (!str) {
        return null;
    }
    var str_arr = str.split("#");
    return str_arr[0];
  }

  getParamsFromUrl() {
    var paraStr = this.getParamsStrFromUrl();
    if (!paraStr) {
        return null;
    }
    var re = {};
    var paramsArr = paraStr.split("&");
    for (var i = 0, j = paramsArr.length; i < j; i++) {
        var key_value_arr = paramsArr[i].split("=");
        if (key_value_arr.length == 2) {
            re = re || {};
            re[key_value_arr[0]] = key_value_arr[1];
        } else if (key_value_arr.length > 2) {
            var pk = key_value_arr.shift();
            re[pk] = key_value_arr.join("=");
        }
    }
    return re;
  }

  /*seed格式  id_preid*/
  hashChange(){
    if(isWantToPreventRoute){
      isWantToPreventRoute = false;
      this.firstLoadToChangeHash = false;
      return;
    }

    var curParams = this.getParamsFromUrl();

    var curseedStr = this.getUrlSeedStr();
    var curSeedObj =  this.convertUrlSeedToObj(curseedStr);

    var ToPagePath = this.getPageNameFromUrl()||this.props.config.root;
    var ToPageNameArr = ToPagePath.split("/");
    var ToPageName = ToPageNameArr.shift();

    if(!curParams[systemseedname]&&this.isInit&&ToPagePath.toLowerCase() === this.props.config.root.toLowerCase()){
        this.firstLoadToChangeHash = true;
    }
    if(!this.props.config.pages){
      console.error("没有配置pages属性");
    }
    console.log(this.prePageName+"_"+this.preseedStr)

    this.FromPage = this.state.curpagename;
    var r = curSeedObj.__r;
    var key = ToPageName+"_"+curseedStr;


    if(!curParams[systemseedname]&&!this.isForward&&!this.isInit){
      ////禁止离开应用 todo 事件插件机制
      isWantToPreventRoute = true;
      window.history.go(1);
      return;
    }
    var action = '前进',animationAction = '不动';

    this.prePathArr = this.prePathArr||[];
  
    if(isReplaceGo){
      if(this.prePathArr.length===0){
        var popRoute=  this.routeStack.pop();
      }else{
        //this.routeStack.pop();
        this.routeStack[this.routeStack.length-1].isDelete = true;
      }
    }

    if(this.isForward){
      action = '前进';
      if(this.prePageName === ToPageName&&ToPageNameArr.length>0){
        this.routeStack[this.routeStack.length-1].page = 
        <PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>;
      }else{
        animationAction = '前进';
        this.routeStack.push({
          pagename:ToPageName,
          r:r,
          _key:key,
          page:<PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>
        });
      }
    }else{
      if(this.routeStack.length===0){
        action = '刷新';
        this.routeStack.push({
          pagename:ToPageName,
          _key:key,
          r:r,
          page:<PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>
        });
      }else{
        if(!this.preUrlParams[systemseedname]){
          
        }else{
          if(curSeedObj.__pr===this.preSeedObj.__r){
            action = '前进';
            animationAction = '前进';
             this.routeStack.push({
              pagename:ToPageName,
              _key:key,
              r:r,
              page:<PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>
            });
          }else{
             action = '后退';
             if(this.routeStack.length===1){
                if(this.routeStack[0]._key !== key){
                    animationAction = '后退删除最后';
                    this.routeStack =[{
                      pagename:ToPageName,
                      _key:key,
                      r:r,
                      page:<PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>
                    }].concat(this.routeStack);
                  }else{
                      this.routeStack[0].page = 
                      <PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>;
                  }
              }else{

               if( this.prePageName === ToPageName&&ToPageNameArr.length>0){
                   this.routeStack[this.routeStack.length-1].page = 
                      <PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>;
                }else{
                    var _pi = this.pageInstanceDict[key];
                    //修复多级别的时候replacego 回来之后显示页面需要显示正确
                    if(_pi){
                        _pi.instance.props.pageview.repaireUrlWhenRepalceGo({
                          leftroute:ToPageNameArr,
                          pagename:ToPageName
                        });
                    }

                   // this.routeStack[this.routeStack.length-2].page = 
                   //    <PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>;
                   animationAction = '后退删除最后';
                }
              }
          }
        }
        
      }
    }




    var pages = this.pagelayout({
      manager:this,
      action:action,
      animationAction:animationAction,
      isReplaceGo:isReplaceGo,
      key:key
    });

    if(!pages){
      console.error("没有实现pagelayout！");
    }


    this.isForward = false;
    this.isInit = false;
    isReplaceGo = false;





    var ppprePath = this.prePath;
    this.prePath = this.getPageNameFromUrl();
    this.preUrlParams = this.getParamsFromUrl();
    var ppstr =this.preseedStr;
    this.preseedStr = this.getUrlSeedStr();
    this.preSeedObj =  this.convertUrlSeedToObj(this.preseedStr);
    this.prePathArr = this.prePath.split("/");
    this.prePageName = this.prePathArr.shift();



    if(!this.callBeforeLeave(this.prePath,ppstr||"",ppprePath||"",action)){
      return;
    }


    this.setState({pages:pages});
    

    if(this.firstLoadToChangeHash){
        var p = this.getParamsFromUrl()||{};
        isWantToPreventRoute = true;
        setTimeout(()=>{
          this.go(this.appConfig.root,p);
        },100);
    }

    this.callResume(this.prePath,ppstr||"",ppprePath||"");
    this.callLeave(this.prePath,ppstr||"",ppprePath||"");


    this.triggerEvent("routechange",{
      path:this.prePath,
      params:this.preUrlParams,
      pagename:this.prePageName
    });

  }

  addListener(eventname,uniqueID,callback){
    var events = this.events[eventname];
    if(!events){
      this.events[eventname]={};
    }
    this.events[eventname][uniqueID] = callback;

  }

  removeListener(eventname,uniqueID){

  }

  triggerEvent(eventname,params){
    var events = this.events[eventname];
    if(events){
      for(var key in events){
        try{
          events[key](params);
        }catch(e){

        }
      }
    }
  }

  pagelayout(params){
        var manager = params.manager;
        var action = params.action;
        var animationAction = params.animationAction;
        var isReplaceGo = params.isReplaceGo;
        var pages = [];
        var routeStack = manager.routeStack;
        var len = routeStack.length;
          console.log(animationAction+" "+" "+action +" "+len);
          if(len>1){
            if(animationAction==='前进'){
              if(params.isWeb){
                NoAnimation(routeStack,pages);
              }else{
                GoPreOrNext(true,'xz-page-route-wrapper right-in','xz-page-route-wrapper left-out',routeStack,pages,isReplaceGo,params.key);
              }
            }else if(animationAction==="后退删除最后"){
              if(params.isWeb){
                NoAnimation(routeStack,pages);
              }else{
                GoPreOrNext(false,'xz-page-route-wrapper right-out','xz-page-route-wrapper left-in',routeStack,pages,false,params.key);
              }
              routeStack.pop();
            }else{
              NoAnimation(routeStack,pages);
            }

          }else{
            NoAnimation(routeStack,pages);
          }
          //因为动画 页面没有清楚干净 
          if(animationAction!=='前进'){

          setTimeout(()=>{
              var lastPages = [];
              NoAnimation(routeStack,lastPages);
              manager.setState({pages:lastPages});
            },250);
          }

          setTimeout(()=>{
            var seedObj = manager.getUrlSeedObj();
            var r = seedObj.__r;
            if(r){
              r = parseInt(r);
              for(var i=routeStack.length-1;i>=0;i--){
                var rr = routeStack[i].r;
                if(rr&&routeStack[i].isDelete){
                  rr = parseInt(rr);
                  if(rr>r){
                    routeStack.splice(i,1); 
                  }
                }
              }
            }
          },300);
          return pages;

  }

  callBeforeLeave(goPath,curSeedStr,curPath,action){
    var goSeedStr = this.preseedStr;
    console.log(curSeedStr+"-----beforeleave------"+this.preseedStr);
    console.log(curPath+" >> "+goPath);

    var goPathArr = goPath.split("/");
    var curPathArr = curPath.split("/");

    var crKey = "",pcKey = "";

    // for(var i=0,j=curPath.length;i<j;i++){
    //   if(i===0){
    //     crKey = prePathArr[0]+"_"+this.preseedStr;
    //     pcKey = ppPathArr[0]+"_"+goSeedStr;
    //   }else{
    //     crKey = crKey + "_" +prePathArr[i];
    //     pcKey = pcKey+"_"+(ppPathArr[i]||"");
    //   }

    //   var instanceInfo = this.pageInstanceDict[crKey];
    //   if(instanceInfo){
    //     if(instanceInfo.isInit){
    //       instanceInfo.isInit = false;
    //     }else{
    //       if(crKey!==pcKey){
    //         console.log(crKey+" >>>beforeleave");
    //       }
    //     }
    //   }
    // }
    // isWantToPreventRoute = true;
    // window.history.go(1);
    return true;
  }

  callLeave(curPath,preSeedStr,prePath){
    //this.preseedStr
  }

  callResume(prePath,ppSeedStr,ppprePath){
    if(this.props.config.isWeb){
      this._callResume(prePath,ppSeedStr,ppprePath);
    }else{
      setTimeout(()=>{
        this._callResume(prePath,ppSeedStr,ppprePath);
      },200);
    }
  }

  _callResume(prePath,ppSeedStr,ppprePath){
    
      var prePathArr = prePath.split("/");
      var ppPathArr = ppprePath.split("/");

      var crKey = "",pcKey = "";

      for(var i=0,j=prePathArr.length;i<j;i++){
        if(i===0){
          crKey = prePathArr[0]+"_"+this.preseedStr;
          pcKey = ppPathArr[0]+"_"+ppSeedStr;
        }else{
          crKey = crKey + "_" +prePathArr[i];
          pcKey = pcKey+"_"+(ppPathArr[i]||"");
        }

        var instanceInfo = this.pageInstanceDict[crKey];
        if(instanceInfo){
          if(instanceInfo.isInit){
            instanceInfo.isInit = false;
          }else{

            if(crKey!==pcKey){
              console.log(crKey+" >>>resume");
              instanceInfo.instance.onResume&&instanceInfo.instance.onResume();
            }
          }
        }
      }
     

      for(var i=0,j=ppPathArr.length;i<j;i++){
        if(i===0){
          pcKey = ppPathArr[0]+"_"+ppSeedStr;
        }else{
          pcKey = pcKey+"_"+(ppPathArr[i]||"");
        }
        var instanceInfo = this.pageInstanceDict[pcKey];
        if(instanceInfo){
          if(instanceInfo.isInit){
            //第一次实例化不走resume
            instanceInfo.isInit = false;
          }else{

          }
        }

      }
  }



  render() {
    return (<div className='xz-pageview-outer'>{this.state.pages}</div>);
  }


  getUrlInfo(){
    var path = this.getPageNameFromUrl();
    return {
      path:path,
      pathArr:path.split("/"),
      seed:this.getUrlSeedStr(),
      params:this.getParamsFromUrl()
    };
  }
}
export default Navigation;
