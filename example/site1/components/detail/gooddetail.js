import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class GoodDetail extends React.Component {

  constructor(props) {
    super(props)
  }

 

  onRefresh(){
    this.props.store.verticalSwiperSelectedIndex = 0;
  }

  render() {
    var onRefresh={};
    if(this.props.canpull){
      onRefresh.onRefresh = this.onRefresh.bind(this);
    }
    return (
        <div className='gd-gd-wrapper'>
          <xz.Segment
          className="gd-gd-segment"
          selectedIndex={0}>
            <xz.Segment.Item key='1'><span>商品介绍</span></xz.Segment.Item>
            <xz.Segment.Item key='2'><span>规格参数</span></xz.Segment.Item> 
            <xz.Segment.Item key='3'><span>包装售后</span></xz.Segment.Item>  
           </xz.Segment>
           <xz.ScrollView 
           {...onRefresh}
           limitOffset={style.px2px(100)}
           direction="vertical"
           className="gd-gd-scrollview">

           </xz.ScrollView>
        </div>
    	 );
  }
}
export default GoodDetail;
