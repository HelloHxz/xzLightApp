import * as CF from './ComponentsFactory'

export function getLayout (containerCfg,pageViewInstance,rowData) {
 var Re=[];
 if(!containerCfg.root){return Re;}
 for(var i =0,j=containerCfg.root.length;i<j;i++){
   Re.push(getLayoutByKey(containerCfg.root[i],pageViewInstance,rowData));
 }
 return Re;
}


export function getLayoutByKey (key,pageViewInstance,rowData) {
 var child_cfg = pageViewInstance.page_state.components[key];
 if(!child_cfg){return null;}
 var child_obj = CF.getComponent(key,pageViewInstance,rowData);
 return child_obj;
}
