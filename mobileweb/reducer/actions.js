import 'babel-core/polyfill';
import fetch from 'isomorphic-fetch'

/*
  约定：控件的ID标识  {pagename}_{componentid}
*/

export function modifyPageState(payload){
  //_modifypagestate  params : path  value pagename
  var targetPageName = payload.page;
  if(targetPageName.split("$$").length==2){
    payload.$$pagename = targetPageName;
    return  { type: "$$common_modifypagestate", payload:payload }
  }
  return {type:targetPageName+"_modifypagestate",payload:payload};
}

export function showpage(payload){
  var targetPageName = payload.page;
  if(!targetPageName){
    console.log("action 没有制定目标页面名称｛page:pagename,type:'sss',to:componentref,.....｝");
  }
  if(targetPageName.split("$$").length==2){
    payload.$$pagename = targetPageName;
    return  { type: "$$common_showpage", payload:payload }
  }
  return {type:targetPageName+"_showpage",payload:payload};
}
export function hidepage(payload){
  var targetPageName = payload.page;
  if(!targetPageName){
    console.log("action 没有制定目标页面名称｛page:pagename,type:'sss',to:componentref,.....｝");
  }
  if(targetPageName.split("$$").length==2){
    payload.$$pagename = targetPageName;
    return  { type: "$$common_hidepage", payload:payload }
  }
  return {type:targetPageName+"_hidepage",payload:payload};
}
export function modifyProperty( payload ) {
  var targetPageName = payload.page;
  if(!targetPageName){
    console.log("action 没有制定目标页面名称｛page:pagename,type:'sss',to:componentref,.....｝");
  }
  var targetComponent = payload.to;
  payload.isModifyPageProperty = targetComponent==null||targetComponent=="";

  if(targetPageName.split("$$").length==2){
    payload.$$pagename = targetPageName;
    return  { type: "$$common_modifyproperty", payload:payload }
  }

  return { type: targetPageName+"_modifyproperty", payload:payload }
}

export function modifySecondLevelProperty(payload){
  var targetPageName = payload.page;
  if(!targetPageName){
    console.log("action 没有制定目标页面名称｛page:pagename,type:'sss',to:componentref,.....｝");
  }
  var targetComponent = payload.to;
  return { type: targetPageName+"_modifysecondlevelproperty", payload:payload }
}

export function modifyStyle( payload ) {
  var targetPageName = payload.page;
  if(!targetPageName){
    console.log("action 没有制定目标页面名称｛page:pagename,type:'sss',to:componentref,.....｝");
  }
  var targetComponent = payload.to;
  if(targetPageName.split("$$").length==2){
    payload.$$pagename = targetPageName;
    return  { type: "$$common_modifystyle", payload:payload }
  }
  return { type: targetPageName+"_modifystyle", payload:payload }
}

export function addEventToComponent(com_ref,eventCfg){
  var targetPageName = com_ref.split("_")[0];
  return { type: targetPageName+"_addeventtocomponent", payload:{com_ref:com_ref,eventCfg:eventCfg} }

}


export function fetchData( payload ){
  var dataSourceKey = payload.dataSouceKey;
  var config = payload.config;
  var pageName = payload.pagename;
  //?pagesize=10&pageindex=1&sorttype=5&category=010041JZ28DL153TP045
  var type = config.type||"GET";
  var url = config.url;
  var fetchConfig = {
    method: type,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  };
  type = type.toUpperCase();
  //处理参数过滤器
  var params = config.params||{};
  // plugin.beforeload()
  if(type=="POST"){
    fetchConfig.body = JSON.stringify(params);
  }else if(type=="GET"){
    var paramsArr=[] ;
    for(var key in params){
      paramsArr.push(key+"="+params[key]);
    }
    if(paramsArr.length>0){
      url = url+"?"+paramsArr.join("&");
    }
  }else{
    console.error("请指定网络请求为GET或者POST");
  }
  return (dispatch,getState) => {
    return fetch(url,fetchConfig)
      .then(response => response.json())
      .then(json =>{dispatch(receiveData(payload,dataSourceKey,json))}
    ).catch(e => { Promise.resolve()})
  }
}


export function receiveData(payload,dataSourceKey,json){
  var pageName = payload.pagename;
  if(pageName.split("$$").length==2){
      return {type:"$$common_receivedata",payload:{$$pagename:pageName,dataSourceKey:dataSourceKey,data:json}}
  }
  return {type:pageName+"_receivedata",payload:{dataSourceKey:dataSourceKey,data:json}}
}


/*
  DataSouce
  beforeLoadData
  loadingData
  loadDataSuceess loadDataError

*/
