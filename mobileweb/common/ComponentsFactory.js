import * as React from 'react'

var components_dict = {
    "xz.button":require("../components/Button"),
    "xz.popuplayer":require("../components/PopupLayer"),
    "xz.datetimepicker":require("../components/DateTimePicker"),
    "xz.tabbar":require("../components/TabBar"),
    "xz.drawerlayout":require("../components/DrawerLayout"),
    "xz.view":require("../components/View"),
    "xz.text":require("../components/Text"),
    "xz.rowlayout":require("../components/RowLayout"),
    "xz.columnlayout":require("../components/ColumnLayout"),
    "xz.listview":require("../components/ListView"),
    "xz.icon":require("../components/Icon"),
    "xz.popover":require("../components/Popover"),
    "xz.menulist":require("../components/MenuList"),
    "xz.tablayoutview":require("../components/TabLayoutView"),
    "xz.line":require("../components/Line"),
    "xz.menulayout":require("../components/MenuLayout"),
    "xz.header":require("../components/Header"),
    "xz.swiper":require("../components/Swiper"),
    "xz.image":require("../components/Image"),
    "xz.segment":require("../components/Segment"),
    "xz.viewpager":require("../components/ViewPager"),
    "xz.switch":require("../components/Switch"),
    "xz.repeat":require("../components/Repeat")
};

function getValueByPath(data,path){
  if(!data){return null;}
  var r = data;
  for(var i=0,j=path.length;i<j;i++){
    var pathkey = path[i];
    r = r[pathkey]
    if(!r){
      r = null;
      break;
    }
  }
  return r;
}

function getComponentDataSource(component_config,pageState,rowData){
  var Re = {};
  // 控件的配置  datasource_bind:"datasource.data.arr"
  // text_bind:"datasource.name"
  // imagesrc_bind:"$$rowdata.imgsrc"
  // 在控件的proprs中可以通过 datasource，text，imagesrc得到 相应的指
  // 这样一个控件就可以指定多个绑定的值
  for(var key in component_config){
    var key_arr = key.split("_");
    var attribute = key_arr[0];
    if(key_arr.length==2&&key_arr[1]=="bind"){
      var bindinfo = component_config[key];
      var bindinfo_arr = bindinfo.split(".");
      var dataSourceKey = bindinfo_arr.shift();
      if(dataSourceKey=="$$rowdata"){
        Re[attribute] = getValueByPath(rowData,bindinfo_arr);
      }else{
        Re["dataSourceKey"] = dataSourceKey;
        Re[attribute] = getValueByPath(pageState["dataSource"][dataSourceKey],bindinfo_arr);
      }
    }
  }
  return Re;
}

export function getComponent(_ref,pageViewInstance,rowData,extendProps){
  var pageState = pageViewInstance.page_state;
  var component_config = pageState.components[_ref];
  var immu_component_config = pageViewInstance.immu_page_state.get("components").get(_ref);
  var tagname = component_config.type.toLowerCase();
  var TagInstance = components_dict[tagname];

  extendProps = extendProps||{};
  extendProps= {...extendProps,...getComponentDataSource(component_config,pageState,rowData)};
  return (<TagInstance
                {...extendProps}
                row_data ={rowData}
                page_state={pageViewInstance.page_state}
                com_ref={_ref}
                key={_ref}
                immu_config={immu_component_config}
                config={component_config}
                page_view={pageViewInstance}>
          </TagInstance>);
}
