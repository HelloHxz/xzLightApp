import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"


var siwperData = [
 {src:"./imgs/1.jpg",title:"xxx"},
 {
   src:"./imgs/2.jpg",title:"xxx",
  },
  {src:"./imgs/3.jpg",title:"xxx"},
  {src:"./imgs/4.jpg",title:"xxx"}
];

@observer
class GoodInfo extends React.Component {

  constructor(props) {
    super(props)
  }



  renderSwiperItem(params){
    return <div key={"xx"+params.index} style={{height:"100%"}}>
      <img style={{height:"100%"}} src={params.data.src}/>
    </div>;
  }


  renderTopIndicator(params){
    return <div className="good-lis-indi-wrapper">{params.curIndex+1}/{params.length}</div>;
  }


  onLoadMore(){
    
  }


  render() {
    return ( 
      <xz.ScrollView className="goodinfo-scrollview"
        onLoadMore={this.onLoadMore.bind(this)}
      >
        <xz.Swiper 
            space={10} 
            className="detail-swiper"
            lazyrender={false} 
            loop={false} 
            renderIndicator={this.renderTopIndicator.bind(this)}
            cache={false} 
            datasource={siwperData} 
            renderItem = {this.renderSwiperItem.bind(this)}>
          </xz.Swiper>
        </xz.ScrollView>
      )
  }
}
export default GoodInfo;
