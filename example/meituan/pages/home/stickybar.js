import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.selectedDropDownKey = "";
  }


  renderItem(config){
    return <div style={{height:"3rem",backgroundColor:"#fff"}}>huxiaozhong</div>
  }

  zongHeClick(e){
    if(!this.root.state.sticky){
      this.props.pageview.mainScroll.scrollarea.scrollTop = this.root.wrap.offsetTop-style.rem2px(1.06);
    }

    setTimeout(()=>{
       if(this.props.store.dropdownSelectedKey==='zonghe'){
        this.props.store.dropdownSelectedKey = "";
      }else{
         this.props.store.dropdownSelectedKey = "zonghe";
      }
    },250)
    
  }


  render() {
   
    return (
        <xz.StickyView 
        ref={(root)=>{this.root = root;}}
        scrollKey={this.props.scrollKey}
        pageview={this.props.pageview}><xz.DropDownGroup 
        className='meituan-home-ddg'
        renderItem = {this.renderItem.bind(this)}
        selectedKey={this.props.store.dropdownSelectedKey}>
          <div onClick={this.zongHeClick.bind(this)} className='meituan-sticky-item'>综合排序</div>
          <div className='meituan-sticky-item'>销量最高</div>
          <div className='meituan-sticky-item'>距离最近</div>
          <div className='meituan-sticky-item'>筛选</div>
        </xz.DropDownGroup></xz.StickyView>
    );
  }
}
export default SearchBar;
