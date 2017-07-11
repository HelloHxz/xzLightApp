const keys = {
  "flexDirection":{
    "row":{
      "WebkitBoxDirection":"normal",
      "WebkitFlexDirection":"row",
      "WebkitBoxOrient":"horizontal"
    },"column":{
      "WebkitBoxDirection":"normal",
      "WebkitFlexDirection":"column",
      "WebkitBoxOrient":"vertical"
    }
  }
};

const keys2 = {
  "flexShrink":["WebkitFlexShrink"],
  "justifyContent":["WebkitJustifyContent","MozJustifyContent"],
  "alignItems":["WebkitAlignItems"],
  "alignSelf":["WebkitAlignSelf"],
  "flex":["WebkitBoxFlex","WebkitFlex","MozBoxFlex","MozFlex","MsFlex"]
};

const keys3={
  "justifyContent":{
    "valuemap":{"center":"center","flexStart":"start","flexEnd":"end","space-between":"justify","space-around":"justify"},
    "key":"WebkitBoxPack"
  },
  "alignItems":{
    "valuemap":{"center":"center","stretch":"stretch","flexStart":"start","flexEnd":"end","baseline":"baseline"},
    "key":"WebkitBoxAlign"
  }
}
const os = "web";
export function process(styles) {
  if(!styles){return {};}
  if(!isNaN(styles["lineHeight"])){
    styles["lineHeight"] = styles["lineHeight"]+"px";
  }
  for(var key in styles){
    var keyArr = key.split("_");
    if(keyArr.length==2){
      if(keyArr[0]==os){
        styles[keyArr[1]]=styles[key];
      }
      delete styles[key];
      continue;
    }
  }

  for(var key in keys){
    var val_in_styles = styles[key];
    var extend_key_info = keys[key];
    if(val_in_styles){
      var extend_styles_maps = extend_key_info[val_in_styles];
        for(var stylekey in extend_styles_maps){
          styles[stylekey] = extend_styles_maps[stylekey];
        }
    }
  }

  for(var key in keys2){
    var val_in_styles = styles[key];
    var extend_key_Arr = keys2[key];
    if(val_in_styles){
      for(var i=0,j=extend_key_Arr.length;i<j;i++){
        styles[extend_key_Arr[i]] = val_in_styles;
      }
    }
  }

  for(var key in keys3){
    var val_in_styles = styles[key];
    if(val_in_styles){
      var extend_key = keys3[key]["key"];
      var real_val = keys3[key]["valuemap"][val_in_styles];
      styles[extend_key]=real_val;
    }
  }

  if(!styles["position"]){
    styles["position"] = "relative";
  }
  return styles;
}
