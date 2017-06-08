import React from "react"
import Style from "../../../utils/style"
import "./index.less"

class ScrollView extends React.Component {
  constructor(props) {
    super(props)
    this.tranDict = Style.getTransitionKeys();
    this.state = {offset:-1,animate:false};
    this.pullLimitHeight = Style.screen.height*.1;
    this.startScrollTop = 0;
    this.startY = 0;
    this.isInLoading = 0;

  }

  onTouchStart(e){
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
     if(this.isInLoading){return;}
      this.isInLoading = false;
      this.canRefresh = false;
      var touch = e.nativeEvent.touches[0];
      this.startY = touch.pageY;
      this.startScrollTop = this.wrapperDom.scrollTop;
  }

  onTouchMove(e){
    if(this.isInLoading){return;}
      var touch = e.nativeEvent.touches[0];
      var curY = touch.pageY;
      var diff = curY-this.startY;

      if(diff>0){
        
        var scrollTop = this.wrapperDom.scrollTop;
        if(scrollTop <=0){
          this.wrapperDom.style["overflow"] = "hidden";
          e.preventDefault();
          e.stopPropagation();
          var pullOffsetY = (diff- this.startScrollTop)/3;
          console.log(pullOffsetY+" "+this.pullLimitHeight);
          if(pullOffsetY> this.pullLimitHeight){
            // _this.pullMesLabel.html("释放更新");
            // _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper yy-release-refresh";
            this.canRefresh = true;
          }else{
            // _this.pullMesLabel.html("下拉刷新");
            // _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper yy-push-refresh";
            this.canRefresh = false;
          }

          this.setState({offset:pullOffsetY,animate:false});
          // _this.innerWrapper.css(
          //   utils.processTransitionTanformStyle("none","translate3d(0,"+(pullOffsetY/3)+"px,0)")
          // );

        }
      }
  }

  onTouchEnd(){
    this.wrapperDom.style["overflow-y"] = "auto";
    if(this.isInLoading){return;}
    if(this.canRefresh){
      console.log(this.pullLimitHeight);
      this.isInLoading = true;
      this.setState({offset:this.pullLimitHeight,animate:true});
      setTimeout(()=>{
        this.isInLoading = false;
        this.setState({offset:-1,animate:true});
      },2000);
    }else{
      this.setState({offset:-1,animate:true});

    }
  }


  render() {
  	var refreshHeight = Style.px2rem(500);
  	var refreshStyle = {
  		height:refreshHeight+"rem",
  		background:"red",
  		marginTop:(0-refreshHeight)+"rem"
  	};
    var toucheEvent = {};
    toucheEvent.onTouchStart = this.onTouchStart.bind(this);
    toucheEvent.onTouchMove = this.onTouchMove.bind(this);
    toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
    
    var classNameArr = ['xz-scrollview'];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }

    var moveStyle = {};
    moveStyle[this.tranDict.transform] ="translate3d(0,"+this.state.offset+"px,0)";
    if(this.state.animate){
       moveStyle[this.tranDict.transition] = "all .3s ease";
    }else{
      moveStyle[this.tranDict.transition] = "none";
    }
    return (<div  ref={(wrapper)=>{
      this.wrapperDom = wrapper;
    }} {...toucheEvent} className={classNameArr.join(" ")}>
    	<div style={moveStyle} ref={(wrapper)=>{
        this.innerWrapperDom = wrapper;
      }}>
        <div className='xz-refresh-control' style={refreshStyle}></div>
        {this.props.children}
      </div></div>);
  }
}

export default ScrollView;
