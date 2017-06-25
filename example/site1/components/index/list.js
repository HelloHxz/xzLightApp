import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class List extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    var rows = [];
    for(var i=0,j=this.props.store.ListDataSource.length;i<j;i++){
      rows.push(<Row pageview={this.props.pageview} key={i}/>);
    }
    return (
      <ul className='good-list'>
        {rows}
      </ul>
    	);
  }
}

@observer
class Row extends React.Component {

  constructor(props) {
    super(props)
  }

  goDetail(){
    this.props.pageview.props.pagemanager.go("detail",{id:"x"});
  }

  onRenderDefault(){
    return <span>默认图片</span>;
  }


  render() {
    return (
      <li onClick={this.goDetail.bind(this)}>
        <div className='rowinner'><xz.Image onRenderDefault={this.onRenderDefault.bind(this)} scrollKey="mainscroll" pageview={this.props.pageview} src='./imgs/6.jpg' className='img'/>
        <span className='good-text'>【中粮我买网】Hoegaarden/福佳 比利时原装进口 福佳白啤酒 330ml*24</span>
        </div>
      </li>
      );
  }
}

export default List;
