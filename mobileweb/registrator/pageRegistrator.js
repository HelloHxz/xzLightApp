//pageRegistrator
var pages_dict = {

};

export function dict(pagename){
  return pages_dict;
}

export function add(pagename,pageConfig){
   pages_dict[pagename]=pageConfig;
}

export function get(pagename){
    return pages_dict[pagename];
}
