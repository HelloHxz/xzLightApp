import React from "react"
import {observer} from 'mobx-react'
import "../../css/searchpage.less"
import {xz,style,shallowEqual} from "../../../../index"




class SearchPage extends React.Component {

  constructor(props) {
    super(props)
  }
  

  componentDidMount(){
    this.input.focus();
  }

  cancelSearch(){
    this.props.store.drawLayoutConfig  = {};
  }

  gotoGoodList(){
    this.props.pageview.props.pagemanager.go("goodlist",{goodid:"xxx"});
    setTimeout(()=>{
      this.props.store.drawLayoutConfig  = {};
    },300);
  }

  

  render() {
    return (<div style={{width:"100%",height:"100%"}}>
        <div className="search-header">
          <div className='input-area'>
            <input placeholder="搜索热门商品" type="search" ref={(input)=>{this.input = input;}}/>
          </div>
          <span onClick={this.cancelSearch.bind(this)} className="cancel-btn">取消</span>  
        </div>
        <div className="search-main-scroll">
          <div className="search-his-area">
            <div className='search-hot-area'></div>
            <div className="search-his-lisarea">
              搜索历史
              <ul onClick={this.gotoGoodList.bind(this)}>
                <li>彩电</li>
              </ul>
            </div>
          </div>
        </div>
      </div>);
  }
}
export default SearchPage;
