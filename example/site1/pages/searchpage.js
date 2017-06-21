import React from "react"
import globalStore from "../stores/global"
import {observer} from 'mobx-react'
import "../css/searchpage.less"
import {xz,style,shallowEqual} from "../../../index"




@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
    console.log(props);
  }
  
  onPageResume(){
    // alert("one");
  }
  onPageBeforeLeave(){
    return true;
  }

  componentDidMount(){
    this.input.focus();
  }

  cancelSearch(){
    this.props.base.close();
  }

  gotoGoodList(){
    this.props.pagemanager.go("goodlist",{goodid:"xxx"});
    setTimeout(()=>{
     this.props.base.close();
    },300);
  }

  

  render() {
    return (<div>
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
export default PageView;
