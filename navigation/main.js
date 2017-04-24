var React = require("react");
var PageView = require("./container/pageview");

/*
  路由需要支持：
    1. 多级路由
    2. 参数传递
    3. modifyparams deleteparams addparams 修改参数 页面不刷新
    4. 阻止后退 可以使用自身的UI进行阻止（刚进来的第一页也可以阻止）
    5. 默认的是keepAlive 可设置不保留 前一个页面的状态和dom
*/
var isWantToPreventRoute = false,isReplaceGo=false;

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.routeStack = [];
    var params = this.getParamsFromUrl();
    var r = 0;
    if(params.__r&&!isNaN(params.__r)){
      r = parseInt(params.__r);
    }
    var pr = 0;
    if(params.__pr&&!isNaN(params.__pr)){
      pr = parseInt(params.__pr);
    }
    this.seed = Math.max(pr,r);
    this.isForward = false;
    //浏览器并不会为第一个url记录hash记录 所以想禁止第一个页面离开 需要在第一次加载根路径的时候增加一个hash记录
    this.firstLoadToChangeHash = false;
    this.isInit = true;
    if(!this.props.config.root){
      console.error("没有指定root页面");
    }
    this.state={
        curpagename:this.props.config.root
        ,pages:[]}  

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

  prepareGo(pageKey, params,isNotForward,_isReplaceGo){
    if(isNotForward!==true){
      this.isForward = true;
    }
    params = params || {};
    var preUrlParams = this.getParamsFromUrl();
    var prePageName = this.getPageNameFromUrl();
    prePageName = prePageName.split("/").shift();
    var toPageName = pageKey.split("/").shift();
    if((_isReplaceGo&&this.prePathArr.length===0)||(toPageName===prePageName&&preUrlParams.__r!==undefined&&preUrlParams.__pr!==undefined&&preUrlParams.__pr!=='undefined')){
       //避免本不应该发生hashchange 被__r引发hashchange
       // 当是replace的时候也走这里 但是当前页面是多级的就不走了
       params.__pr = preUrlParams.__pr;
       params.__r = preUrlParams.__r;
    }else{
      if(preUrlParams.__r!==undefined){
        params.__pr = preUrlParams.__r;
      }
      params.__r = this.getUniqueSeed();

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


  hashChange(){
    if(isWantToPreventRoute){
      isWantToPreventRoute = false;
      this.firstLoadToChangeHash = false;
      return;
    }

    var curParams = this.getParamsFromUrl();

    var ToPageName = this.getPageNameFromUrl()||this.props.config.root;
    var ToPageNameArr = ToPageName.split("/");
    ToPageName = ToPageNameArr.shift();

    if(!curParams.__r&&this.isInit&&ToPageName.toLowerCase() === this.props.config.root.toLowerCase()){
        this.firstLoadToChangeHash = true;
    }
    if(!this.props.config.pages){
      console.error("没有配置pages属性");
    }

    this.FromPage = this.state.curpagename;

    var key = ToPageName+"_"+curParams.__r;
    if(!curParams.__r&&!this.isForward&&!this.isInit){
      ////禁止离开应用 todo 事件插件机制
      isWantToPreventRoute = true;
      window.history.go(1);
      return;
    }
    var action = '前进',animationAction = '不动';

    this.prePathArr = this.prePathArr||[];
    if(isReplaceGo&&ToPageName!==this.prePageName){
      this.routeStack.pop();
    }
    if(this.isForward){
      action = '前进';
      if(this.prePageName === ToPageName&&ToPageNameArr.length>0){
        this.routeStack[this.routeStack.length-1].page = 
        <PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>;
      }else{
        animationAction = '前进';
        this.routeStack.push({
          key:ToPageName,
          _key:key,
          page:<PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>
        });
      }
    }else{
      if(this.routeStack.length===0){
        action = '刷新';
        this.routeStack.push({
          key:ToPageName,
          _key:key,
          page:<PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>
        });
      }else{
        if(!this.preUrlParams.__r){
          
        }else{
          if(curParams.__pr===this.preUrlParams.__r){
            action = '前进';
            animationAction = '前进';
             this.routeStack.push({
              key:ToPageName,
              _key:key,
              page:<PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>
            });
          }else{
             action = '后退';
             if(this.routeStack.length===1){
                if(this.routeStack[0]._key !== key){
                    animationAction = '后退删除最后';
                    this.routeStack =[{
                      key:ToPageName,
                      _key:key,
                      page:<PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>
                    }].concat(this.routeStack);
                  }else{
                      this.routeStack[0].page = 
                      <PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>;
                      // if(this.preLastPageInstance&&this.routeStack.length){
                      //    animationAction = '后退删除最后';
                      // }
                  }
              }else{
                  
               if( this.prePageName === ToPageName&&ToPageNameArr.length>0){
                   this.routeStack[this.routeStack.length-1].page = 
                      <PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>;
                }else{
                   this.routeStack[this.routeStack.length-2].page = 
                      <PageView leftroute={ToPageNameArr} pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>;
                   animationAction = '后退删除最后';
                }
              }
          }
        }
        
      }
    }

    var pages = this.props.pagelayout(this.routeStack,action,animationAction,isReplaceGo);

    if(!pages){
      console.error("没有实现pagelayout！");
    }

    this.setState({pages:pages});
    this.isForward = false;
    this.isInit = false;
    isReplaceGo = false;

    //this.preLastPageInstance = this.routeStack[this.routeStack.length-1];


    if(this.firstLoadToChangeHash){
        var p = this.getParamsFromUrl()||{};
        p.__r = this.getUniqueSeed();
        isWantToPreventRoute = true;
        setTimeout(()=>{
          this.go(this.appConfig.root,p);
        },100);
    }

    this.preUrlParams = this.getParamsFromUrl();
    var prePath = this.getPageNameFromUrl();
    this.prePathArr = prePath.split("/");
    this.prePageName = this.prePathArr.shift();

  }



  render() {
    return (<div className='xz-pageview-outer'>{this.state.pages}</div>);
  }
}
module.exports = Navigation;
