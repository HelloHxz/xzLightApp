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
var isWantToPreventRoute = false;

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.routeStack = [];
    this.seed = (new Date()).valueOf();
    this.isForward = false;
    //浏览器并不会为第一个url记录hash记录 所以想禁止第一个页面离开 需要在第一次加载根路径的时候增加一个hash记录
    this.firstLoadToChangeHash = false;
    this.isInit = true;
    if(!this.props.config.root){
      console.error("没有指定root页面");
    }
    this.state={
        curpagename:this.props.config.root
        ,pagerenderseed:0}  

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
    if (!toPage) {
        this.go(config.root, this.getParamsFromUrl());
    } else {
        this.hashChange();
    }
  }

  prepareGo(pageKey, params){
    this.isForward = true;
    isPrevent = false;
    params = params || {};
    var preUrlParams = this.getParamsFromUrl();
    var prePageName = this.getPageNameFromUrl();
    if(prePageName===pageKey&&preUrlParams.__r!==undefined&&preUrlParams.__pr!==undefined&&preUrlParams.__pr!=='undefined'){
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

  go(pageKey, params) {
    var paramsArr = this.prepareGo(pageKey, params);
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
    var paramsArr = this.prepareGo(pageKey, params);
    isReplaceGo = true;
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
      return this.rootPageKey;
    }
    var sArr = s.split("?");
    return sArr[0];
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

    var ToPageName = this.getPageNameFromUrl();

    if(!curParams._r&&this.isInit&&ToPageName.toLowerCase() === this.props.config.root.toLowerCase()){
        this.firstLoadToChangeHash = true;
    }

    if(!this.props.config.pages){
      console.error("没有配置pages属性");
    }

    this.FromPage = this.state.curpagename;
    var key = ToPageName+"_"+this.routeStack.length;


    if(this.isForward){
      console.log("前进1");
      this.routeStack.push(<PageView pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>);
    }else{
      if(this.routeStack.length===0){
        console.log("刷新");
        this.routeStack.push(<PageView pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>);
      }else{
        if(curParams.__pr===this.preUrlParams.__r){
            console.log("前进");
            this.routeStack.push(<PageView pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>);
        }else{
           if(this.routeStack.length>1){
              console.log("后退 有前一个页面的引用");
              this.routeStack.splice(this.routeStack.length-1,1)
            }else{
              console.log("刷新后的后退 没有前一个页面的引用");
            }
        }
      }
    }


    this.setState({curpagename:ToPageName,pagerenderseed:this.state.pagerenderseed+1});
    this.isForward = false;
    this.isInit = false;

    if(this.firstLoadToChangeHash){
        var p = this.getParamsFromUrl()||{};
        p._f = this.getUniqueSeed();
        p.__r = this.getUniqueSeed();
        isWantToPreventRoute = true;
        this.go(this.appConfig.root,p);
    }

    this.preUrlParams = this.getParamsFromUrl();

  }



  render() {
    return (<div className='xz-pageview-outer'>{this.routeStack}</div>);
  }
}
module.exports = Navigation;
