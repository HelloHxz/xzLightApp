import React from "react"
import "./index.less"

import Style from "../../../utils/style"

/*
  @@type 
  contain 长宽中大者设为100%
  cover 长宽者小者设为100%
  scale 展示全图
  不设置展示原图

  @@src

  @@defaultSrc 

  @@scrollkey @@pageview 必须将所在页面的页面实例也传过来配合使用
  1. 有scrollkey的时候 先判断是否在可视区，在直接加载图片 失败后显示默认
  没有在可视区先显示默认，然后根据scrollkey 进行可视区判断加载
  2.如果没有scrollkey直接加载图片然后失败显示默认

*/
class ImageCom extends React.Component {
  constructor(props) {
    super(props)
    this.loaddone = false; // success or false

    if(props.scrollkey&&!props.pageview){
      console.error("Image 组件使用scrollkey去按需加载的时候 必须指定pageview={xxx} xxx指的是所在页面的页面引用");
    }
    this.state = {
      child:null
    }
  }

  loadImage(){
    var image = new Image();
    var _this = this;
    var src = this.props.src||this.props.defaultSrc;
    image.onload = function(){
      _this.loadSuccess(image,src);
    }
    image.onerror = function(){
      _this.renderDefault();
    }
    image.src = src;
  }

  loadImageWhenInView(){
    if(!this.isInView){
      return;
    }
    this.loadImage();
  }

  loadSuccess(image,src){
    var style = {};
    if(image.width>image.height){
      style.width = "100%";
    }else{
      style.height = "100%";
    }
    this.setState({
      child:<img style={style} src={src}/>
    });
  }

  renderDefault(){
    //如果有自定义的 renderError 回掉则调用 没有的话则显示默认图片
  }

  isInView(){
    var rect =  this.wrapper.getBoundingClientRect();
    if(rect.bottom>0&&rect.top<Style.screen.height&&rect.right>0&&rect.left<Style.screen.width){
      return true;
    }
    return false;
  }

  componentDidMount(){
    this.init(this.props);
  }

  init(props){
    if(props.scrollkey){
      this.loadImageWhenInView();
    }else{
      this.loadImage();
    }

  }

  componentWillReceiveProps(nextPros){
    if(nextPros.src!==this.props.src){
      this.init(nextPros);
    }
  }

  render() {
    var classNameArr = ["xz-image"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    return (<div
      ref={(wrapper)=>{this.wrapper= wrapper;}}
     className={classNameArr.join(" ")}>{this.state.child}</div>);
  }
}

export default ImageCom;
