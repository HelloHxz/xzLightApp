import React from "react"
import "./index.less"



class StickyView extends React.Component {
  constructor(props) {
    super(props)

    if(!props.scrollKey||!props.pageview){
      console.error("StickyView 需要制定scrollKey以及pageview属性 必须指定pageview={xxx} xxx指的是所在页面的页面引用");
    }

    this.state={
      sticky:false,
      children:props.children,
      disabled:props.disabled||false
    };
  }


  checkSticky(){
    this.scrollView = this.props.pageview.scrollViewDict[this.props.scrollKey];
    if(!this.scrollView||this.scrollView.isBad){
      return;
    }
    if(this.state.disabled===true){
       this.setSticky(false);
      return;
    }

    this.scrollViewRect = this.scrollView.wrapperDom.getBoundingClientRect();
    if(this.wrap&&this.scrollView){
      
      var rect = this.wrap.getBoundingClientRect();
      if(rect.top-rect.height/3<=this.scrollViewRect.top){
          
        var scrollViewCurStickyView = this.scrollView.scrollViewCurStickyView;

        if(scrollViewCurStickyView&&scrollViewCurStickyView!==this){
          var thisTop = rect.top;
          var curStickyTop = scrollViewCurStickyView.wrap.getBoundingClientRect().top;
          if(thisTop>curStickyTop){
            this.setSticky(true);
            scrollViewCurStickyView.setState({
              sticky:false
            });

            return true;
          }
        }else{
          this.setSticky(true);
          return true;
        }

      }else{
        if(this.state.sticky===true){
          this.scrollView.scrollViewCurStickyView = null;
          this.setSticky(false);
          return false;
        }
      }
    }
   

  }

  setSticky(isSticky){
     if(this.state.sticky!==isSticky){
       if(isSticky){
         this.scrollView.scrollViewCurStickyView = this;
       }else{
        if( this.scrollView.scrollViewCurStickyView===this){
           this.scrollView.scrollViewCurStickyView = null;
        }
       }
        var scrollView = this.props.pageview.scrollViewDict[this.props.scrollKey];
        var children = this.state.children;
        if(scrollView&&this.wrap){
          if(isSticky){
              this.scrollView.stickyWrapper.setState({
                children:<div className='xz-stickyview-inner'>{this.state.children}</div>
              });
            }else{
              this.scrollView.stickyWrapper.setState({
                children:null
              });
            }
        }
        this.setState({
          sticky:isSticky,
          children:children
        });
      }
  }

  componentWillReceiveProps(nextPros){
      this.setState({
        disabled:nextPros.disabled||false
      },()=>{
        this.checkSticky();
      });
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
    var sizeStyle = {};
    if(this.wrapperHeight){
      sizeStyle = {height:this.wrapperHeight+"px"};
    }
    var innerClassName = ["xz-stickyview-inner"];
    if(this.state.sticky){
      innerClassName.push("xz-vis-hidden");
    }
    return (<div className='xz-stickyview' style={sizeStyle} ref={(wrap)=>{
      if(wrap){
        var rect = wrap.getBoundingClientRect();
        this.wrapperHeight = rect.height;
      }
      this.wrap = wrap;}}>
      <div className={innerClassName.join(" ")}>{this.state.children}</div>
     </div>);
  }
}

export default StickyView;
