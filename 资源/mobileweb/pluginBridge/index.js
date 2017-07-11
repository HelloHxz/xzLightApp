var pagemiddleware_dict = {

};

export function get(pagename){
  return pagemiddleware_dict[pagename];
}

export function add(pagename,middleware){
   pagemiddleware_dict[pagename]=middleware;
}
