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

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.routeStack = [];
    this.isForward = false;
    if(!this.props.config.root){
      console.error("没有指定root页面");
    }
    this.state={
        curpagename:this.props.config.root
        ,pagerenderseed:0}  

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

  go(pageKey, params) {
    this.isForward = true;
    isPrevent = false;
    params = params || {};
    var paramsArr = [];
    for (var key in params) {
        paramsArr.push(key + "=" + params[key]);
    }
    if (paramsArr.length > 0) {
        location.hash = pageKey + "?" + paramsArr.join("&");
    } else {
        location.hash = pageKey;
    }

  }
  replaceGo(pageKey, params) {
    this.isForward = true;
    isPrevent = false;
    params = params || {};
    var paramsArr = [];
    for (var key in params) {
        paramsArr.push(key + "=" + params[key]);
    }
    isReplaceGo = true;
    if (paramsArr.length > 0) {
        location.replace(location.href.split("#")[0] + '#' + pageKey + "?" +  paramsArr.join("&"));
    } else {
        location.replace(location.href.split("#")[0] + '#' + pageKey);
    }

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
    var ToPageName = this.getPageNameFromUrl();
    if(!this.props.config.pages){
      console.error("没有配置pages属性");
    }

    this.FromPage = this.state.curpagename;
    var key = ToPageName+"_"+this.routeStack.length;

    if(this.isForward){
      console.log("前进");
      this.routeStack.push(<PageView pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>);
    }else{
      if(this.routeStack.length===0){
        console.log("刷新");
        this.routeStack.push(<PageView pagename={ToPageName} pagemanager={this} key={key} pkey={key}></PageView>);
      }else{
        if(this.routeStack.length>1){
          this.routeStack.splice(this.routeStack.length-1,1)
        }else{
          alert("s");
        }
        console.log("后退");
      }
    }
   
 

    this.setState({curpagename:ToPageName,pagerenderseed:this.state.pagerenderseed+1});
    this.isForward = false;
  }

  render() {
    return (<div className='xz-pageview-outer'>{this.routeStack}</div>);
  }
}
module.exports = Navigation;
