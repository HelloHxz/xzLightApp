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
      rows.push(<Row key={i}/>);
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


  render() {
    return (
      <li>
        <div className='rowinner'><img src='https://m.360buyimg.com//mobilecms/s276x276_jfs/t2713/10/1346087182/158456/e089af0d/573c1bc8Neb67108c.jpg!q70.jpg' className='img'/>
        <span className='good-text'>【中粮我买网】Hoegaarden/福佳 比利时原装进口 福佳白啤酒 330ml*24</span>
        </div>
      </li>
      );
  }
}

export default List;
