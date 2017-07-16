import React from "react"
import "./index.less"


class StickyView extends React.Component {
  constructor(props) {
    super(props)

    if(!props.scrollKey||!props.pageview){
      console.error("StickyView 需要制定scrollKey以及pageview属性 必须指定pageview={xxx} xxx指的是所在页面的页面引用");
    }

    this.state={
      sticky:false
    };
    console.log(props.pageview.props.base);
  }


  checkSticky(){
    if(!this.scrollView){
      this.scrollView = this.props.pageview.scrollViewDict[this.props.scrollKey];
      this.scrollViewRect = this.scrollView.wrapperDom.getBoundingClientRect();
    }
    if(this.wrap&&this.scrollView){
      var rect = this.wrap.getBoundingClientRect();
      if(rect.top<=this.scrollViewRect.top){

        var scrollViewCurStickyView = this.scrollView.scrollViewCurStickyView;
        if(scrollViewCurStickyView&&scrollViewCurStickyView!==this){
          var thisTop = rect.top;
          var curStickyTop = scrollViewCurStickyView.wrap.getBoundingClientRect().top;
          if(thisTop>curStickyTop){
            this.setSticky();
            scrollViewCurStickyView.setState({
              sticky:false
            });
          }
        }else{
          this.setSticky();
        }

      }else{
        if(this.state.sticky===true){
          this.scrollView.scrollViewCurStickyView = null;
          this.setState({
            sticky:false
          });
        }
      }


    }
   

  }

  setSticky(){
     if(this.state.sticky!==true){
            this.setState({
              sticky:true
            });
            this.scrollView.scrollViewCurStickyView = this;
      }
  }

  componentDidMount(){
    if(!this.props.pageview.stickviewDict){
      this.props.pageview.stickviewDict = {};
    }
    if(!this.props.pageview.stickviewDict[this.props.scrollKey]){
      this.props.pageview.stickviewDict[this.props.scrollKey] = [];
    }
    this.props.pageview.stickviewDict[this.props.scrollKey].push(this);
  }
  componentWillUnmount(){
    var stickyArr = this.props.pageview.stickviewDict[this.props.scrollKey];
    if(stickyArr&&stickyArr.length>0){
      for(var i=stickyArr.length-1;i>=0;i--){
        if(stickyArr[i]===this){
          stickyArr.splice(i,1);
        }
      }
    }
  }
  render() {

    if(!this.wrapperSize&&this.wrap){
      var rect = this.wrap.getBoundingClientRect();
      if(rect){
       this.wrapperSize = {height:rect.height+"px"}
      }
    }
    var sizeStyle = {},innerStyle={};
    if(this.wrapperSize){
      innerStyle.height = this.wrapperSize.height;
      sizeStyle.height = this.wrapperSize.height;
    }

    if(this.state.sticky){
      innerStyle.position="fixed";
      innerStyle.top = this.scrollViewRect.top+"px";
    }else{
       innerStyle.position="relative";
    }


    return (<div className='xz-stickyview' style={sizeStyle} ref={(wrap)=>{this.wrap = wrap;}}>
      <div className='xz-stickyview-inner' style={innerStyle}>{this.props.children}</div>
     </div>);
  }
}

export default StickyView;
