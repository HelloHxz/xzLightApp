import * as pageActions from '../reducer/actions';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as pagesBridge from "../registrator/pageRegistrator"

export function getMapStateAndMapDispatch (pagename) {
  return {
    mapStateToProps:(state) =>{
      var page_arr = pagename.split("$$");
      if(page_arr.length==2){
        var pagestate = state["$$common"].get(pagename);
        if(pagestate){
          return {page_state:pagestate}
        }
        state["$$common"] = state["$$common"].set(pagename,Immutable.fromJS(pagesBridge.get(page_arr[0])));
        return {
          page_state: state["$$common"].get(pagename)
        }
      }
      return {
        page_state:state[pagename]
      }
    },
    mapDispatchToProps:(dispatch) => ({
      actions:bindActionCreators(pageActions,dispatch)
    })
  }

}
