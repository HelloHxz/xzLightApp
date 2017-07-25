import React from "react"
import DrawLayouStore from "../stores/drawlayout"
import {observer} from 'mobx-react'
import DrawLayout from '../components/index/drawlayout'
import {xz,style,shallowEqual} from "../../../index"




@observer
class PageView extends React.Component {
  static connectStore(params){
    return {store:new DrawLayouStore};
  }
  constructor(props) {
    super(props)
  }

  showDraw(direction,animation){
  	xz.Toast.show({"text":"提示",direction:direction,animation:animation});
  }

  ShowCustome(direction){
  	xz.Toast.show({"component":<div style={{textIndent:".5rem",backgroundColor:"green",color:"#fff",height:"1rem",lineHeight:"1rem"}}>
  			自定义组件
  		</div>
  		,direction:direction});
  }

  ShowClass(){
	var key = xz.Toast.show({"text":"提示",className:"demo-toast",duration:0,
		bkLayer:{backgroundColor:"#000",opacity:.3}
	});
	setTimeout(()=>{
		xz.Toast.hide(key);
	},2000)
  }
  

  render() {
    return (<div style={{backgroundColor:"#f1f2f3"}}><div className='detail-header'>~Toast Demo~</div>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"top","slide")} type="flat">Toast 1</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"bottom","slide")} type="flat">Toast 2</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"center","silde")} type="flat">Toast 3</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"top","fade")} type="flat">Toast 4</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"bottom",'fade')} type="flat">Toast 5</xz.Button>
      <br/>
      <xz.Button onClick={this.showDraw.bind(this,"center",'fade')} type="flat">Toast 6</xz.Button>
      <br/>
      <xz.Button onClick={this.ShowCustome.bind(this,"top")} type="flat">Toast 7</xz.Button>
      <br/>
      <xz.Button onClick={this.ShowCustome.bind(this,"bottom")} type="flat">Toast 8</xz.Button>
      <br/>
      <xz.Button onClick={this.ShowClass.bind(this)} type="flat">Toast 9</xz.Button>
      </div>);
  }
}
export default PageView;
