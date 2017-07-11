import { createReducer } from './utils';
import Immutable from 'immutable';
/* Reduce 需要返回一个Immutable对象 如果返回的是同一个对象 即便对象的值改变 也不会触发render
内部机制判断两个对象是否相等 应该是通过内存地址去判断
 */
export function dynamicReducer(state,pageName) {
  return createReducer(state, {
    [pageName+"_modifypagestate"]:(state,payload)=>{
      var path = payload.path;
      var path_arr = path.split(".");
      if(pageName=="$$common"){
        path_arr = [payload["$$pagename"]].concat(path_arr);
        state = state.updateIn(path_arr, value => {return Immutable.fromJS(payload.value); });
      }else{
        state = state.updateIn(path_arr, value => {return Immutable.fromJS(payload.value); });
      }
      return state;
    },
    [pageName+"_modifyproperty"]:(state,payload)=>{
      if(pageName=="$$common"){
        if(payload.isModifyPageProperty){
          delete payload.isModifyPageProperty;
          for(var key in payload){
            if(key=="to"||key=='type'||key=='sender'||key=='page'||key=='$$pagename'){continue;};
            state = state.updateIn([payload["$$pagename"],key], value => {return payload[key]; });
          }
        }else{
          delete payload.isModifyPageProperty;
          for(var key in payload){
            if(key=="to"||key=='type'||key=='sender'||key=='page'||key=='$$pagename'){continue;};
            state = state.updateIn([payload["$$pagename"],'components', payload.to,key], value => {return payload[key]; });
          }
        }
      }else{
        if(payload.isModifyPageProperty){
          delete payload.isModifyPageProperty;
          for(var key in payload){
            if(key=="to"||key=='type'||key=='sender'||key=='page'||key=='$$pagename'){continue;};
            state = state.updateIn([key], value => {return payload[key]; });
          }
        }else{
          delete payload.isModifyPageProperty;
          for(var key in payload){
            if(key=="to"||key=='type'||key=='sender'||key=='page'||key=='$$pagename'){continue;};
            state = state.updateIn(['components', payload.to,key], value => {return payload[key]; });
          }
        }
      }



      return state;
    },
    [pageName+"_showpage"]:(state,payload)=>{
      if(pageName=="$$common"){
        state = state.updateIn([payload["page"],"$$showpage"], value => {return payload["to"]; });
        return state;
      }
      state = state.updateIn(["$$showpage"], value => {return payload["to"]; });
      return state;
    },[pageName+"_hidepage"]:(state,payload)=>{
      if(pageName=="$$common"){
        state = state.updateIn([payload["page"],"$$showpage"], value => {return null; });
        return state;
      }
      state = state.updateIn(["$$showpage"], value => {return null; });
      return state;
    },
    [pageName+"_modifysecondlevelproperty"]:(state,payload)=>{
      var stateJS = state.toJS();
      var stateJSStr = JSON.stringify(stateJS);
      var stateJSClone = JSON.parse(stateJSStr);
      for(var key in payload){
        if(key=="to"||key=='type'||key=='secondLevelKey'||key=='sender'||key=='page'){continue;};
        var secondLevelKey = payload.secondLevelKey;
        if(secondLevelKey==""){
          stateJSClone["components"][payload.to][key] = payload[key];
        }else{
          stateJSClone["components"][payload.to][secondLevelKey][key] = payload[key];
        }
      }
      return Immutable.fromJS(stateJSClone);
    },
    [pageName+"_modifystyle"]:(state,payload)=>{

      if(pageName=="$$common"){
        for(var key in payload){
          if(key=="to"||key=='type'||key=='page'||key=='$$pagename'){continue;};
          if(key=="sender"){
            state = state.updateIn([payload["$$pagename"],'components', payload.to,key], value => {return payload[key]; });
          }else{
            state = state.updateIn([payload["$$pagename"],'components', payload.to,"style",key], value => {return payload[key]; });
          }
        }
        return state;
      }

      for(var key in payload){
        if(key=="to"||key=='type'||key=='page'){continue;};
        if(key=="sender"){
          state = state.updateIn(['components', payload.to,key], value => {return payload[key]; });
        }else{
          state = state.updateIn(['components', payload.to,"style",key], value => {return payload[key]; });
        }
      }
      return state;
    },
    [pageName+"_receivedata"]:(state,payload)=>{
      var dataSourceKey = payload.dataSourceKey;
      var data = payload.data["data"]||[];
      if(pageName=="$$common"){
        state = state.updateIn([payload["$$pagename"],'dataSource', dataSourceKey,"data"], value => {return data; });
      }else{
        state = state.updateIn(['dataSource', dataSourceKey,"data"], value => {return data; });
      }
      return state;
    }
  });
}
