import React from "react"
import Style from "../../../utils/style"
import "./index.less"

class ScrollView extends React.Component {
  constructor(props) {
    super(props)
    this.tranDict = Style.getTransitionKeys();
    this.state = {offset:-1,animate:false};
    this.limitOffset = Style.screen.height*.1;
    this.startScrollValue = 0;
    this.startY = 0;
    this.isInLoading = 0;
    var direction = this.props.direction||"vertical";
    this.isHorizontal = direction.toLowerCase()!=="vertical";
    this.config = {
      touchkey:"pageX",
      otherToucKey:"pageY"
    };
    if(!this.isHorizontal){
      this.config = {
         touchkey:"pageY",
         otherToucKey:"pageX"
      }
    }
  }

  onTouchStart(e){
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
     if(this.isInLoading){return;}
      this.isInLoading = false;
      this.canRefresh = false;
      var touch = e.nativeEvent.touches[0];
      this.startY = touch[this.config.touchkey];
      this.startX = touch[this.config.otherToucKey];
      this.startScrollValue =this.isHorizontal? this.wrapperDom.scrollLeft:this.wrapperDom.scrollTop;
  }

  onTouchMove(e){
    if(this.isInLoading){return;}
      var touch = e.nativeEvent.touches[0];
      var curY = touch[this.config.touchkey];
      var curX = touch[this.config.otherToucKey];

      var diff = curY-this.startY;
      var diffOtherDirection = curX - this.startX ;


      if(Math.abs(diffOtherDirection)>80){
        return;
      }

      this.props.onRefreshMove&&this.props.onRefreshMove({
        diff:diff,
        instance:this,
        wrapperdom:this.wrapperDom,
        e:e
      });

      if(diff>0){
        
        var scrollValue = this.isHorizontal? this.wrapperDom.scrollLeft:this.wrapperDom.scrollTop;
        if(scrollValue <=0){
          this.wrapperDom.style["overflow"] = "hidden";
          e.preventDefault();
          e.stopPropagation();
          var pullOffsetY = (diff- this.startScrollValue)/3;
          if(pullOffsetY> this.limitOffset){
            // _this.pullMesLabel.html("释放更新");
            // _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper yy-release-refresh";
            this.canRefresh = true;
          }else{
            // _this.pullMesLabel.html("下拉刷新");
            // _this.pullToRefreshWrapper[0].className = "yy-pull-wrapper yy-push-refresh";
            this.canRefresh = false;
          }
          this.setState({offset:pullOffsetY,animate:false});
        }
      }
  }

  onTouchEnd(){
    var scrollKey =this.isHorizontal?"overflow-x":"overflow-y";
    this.wrapperDom.style[scrollKey] = "auto";
    if(this.isInLoading){return;}
    if(this.canRefresh){
      this.isInLoading = true;
      this.setState({offset:this.limitOffset,animate:true});
      setTimeout(()=>{
        this.isInLoading = false;
        this.setState({offset:-1,animate:true});
        this.props.onRefreshClose&&this.props.onRefreshClose();
      },2000);
    }else{
      this.setState({offset:-1,animate:true});
      this.props.onRefreshClose&&this.props.onRefreshClose();
    }
  }


  _onScroll(e){
    this.props.onScroll({
      instance:this,
      wrapperdom:this.wrapperDom,
      e:e
    });
  }


  render() {

    var toucheEvent = {};
    if(this.props.onRefresh||this.props.onLoadMore){
      toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
    }

    
    var classNameArr = ['xz-scrollview'];
    classNameArr.push(this.isHorizontal?"xz-scrollview-h":"xz-scrollview-v");
    if(this.props.className){
      classNameArr.push(this.props.className);
    }

    var moveStyle = {};
    var valueStr = this.isHorizontal?this.state.offset+"px,0,0":"0,"+this.state.offset+"px,0";
    moveStyle[this.tranDict.transform] ="translate3d("+valueStr+")";
    if(this.state.animate){
       moveStyle[this.tranDict.transition] = "all .3s ease";
    }else{
      moveStyle[this.tranDict.transition] = "none";
    }

    var refreshControlClassName = this.isHorizontal?"xz-refresh-control-h":"xz-refresh-control-v";
    var scrollEvent = {};
    if(this.props.onScroll){
      scrollEvent.onScroll = this._onScroll.bind(this);
    }

    var innerClassName = this.isHorizontal?"xz-scrollview-inner-h":"xz-scrollview-inner-v";

    return (<div {...scrollEvent} ref={(wrapper)=>{
      this.wrapperDom = wrapper;
    }} {...toucheEvent} className={classNameArr.join(" ")}>
    	<div className={innerClassName} style={moveStyle} ref={(wrapper)=>{
        this.innerWrapperDom = wrapper;
      }}>
        <div className={refreshControlClassName}></div>
        {this.props.children}
      </div></div>);
  }
}

export default ScrollView;
