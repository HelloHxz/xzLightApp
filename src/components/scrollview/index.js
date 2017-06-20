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
      this.touchAction = "";
      var touch = e.nativeEvent.touches[0];
      this.startY = touch[this.config.touchkey];
      this.startX = touch[this.config.otherToucKey];
      this.startScrollValue = this.isHorizontal? this.scrollarea.scrollLeft:this.scrollarea.scrollTop;
      if(this.props.onLoadMore){
        this.wrapperSize = this.isHorizontal? this.scrollarea.offsetWidth:this.scrollarea.offsetHeight;
      }
      this.props.onTouchStart&&this.props.onTouchStart();
      this.startOffset = this.state.offset;
      document.title = this.scrollarea.offsetHeight;
  }

  onTouchMove(e){
    if(this.isInLoading){return;}
      var touch = e.nativeEvent.touches[0];
      var curY = touch[this.config.touchkey];
      var curX = touch[this.config.otherToucKey];

      var diff = curY-this.startY;

      var diffOtherDirection = curX - this.startX ;

      // if(Math.abs(diffOtherDirection)>Math.abs(diff)){
      //   e.preventDefault();
      //   e.stopPropagation();
      //   return;
      // }

      this.props.onRefreshMove&&this.props.onRefreshMove({
        diff:diff,
        instance:this,
        wrapperdom:this.wrapperDom,
        e:e
      });
      this.scrollValue = this.isHorizontal? this.scrollarea.scrollLeft:this.scrollarea.scrollTop;
      if(diff>0&&this.props.onRefresh){
        if(this.scrollValue <=0){
          var l = this.isHorizontal?0:Style.px2px(20);
            e.preventDefault();
            e.stopPropagation();
            this.scrollarea.style["overflow"] = "hidden";
          
          var pullOffsetY = (diff- this.startScrollValue)/3;
          this.canRefresh = pullOffsetY> this.limitOffset;
          this.touchAction = "refresh";
          this.setState({offset:pullOffsetY,animate:false});
        }
      }
      if(diff<0&&this.props.onLoadMore){
        this.scrollHeightSize = this.isHorizontal? this.scrollarea.scrollWidth: this.scrollarea.scrollHeight;
      
        if(this.scrollHeightSize<=this.wrapperSize+this.scrollValue+Style.px2px(30)){
          this.scrollarea.style["overflow"] = "hidden";
          e.preventDefault();
          e.stopPropagation();
          this.touchAction = "loadmore";
          var pullOffset = (diff)/3;
          this.canLoadMore = Math.abs(pullOffset)>(this.limitOffset);
          this.setState({offset:pullOffset,animate:false});
        }
      }
  }

  onTouchEnd(){
    var scrollKey =this.isHorizontal?"overflow-x":"overflow-y";
      this.props.onTouchEnd&&this.props.onTouchEnd();
    
    if(this.isInLoading){return;}
    if(this.touchAction==="refresh"){
      if(this.canRefresh){
        this.isInLoading = true;
        this.setState({offset:this.limitOffset,animate:true});
        setTimeout(()=>{
          this.isInLoading = false;
          this.setState({offset:-1,animate:true});
          this.scrollarea.style[scrollKey] = "auto";

          this.props.onRefreshClose&&this.props.onRefreshClose();
        },2000);
      }else{
        this.scrollarea.style[scrollKey] = "auto";

        this.setState({offset:-1,animate:true});
        this.props.onRefreshClose&&this.props.onRefreshClose();
      }
    }

    if(this.touchAction==="loadmore"){
      if(this.canLoadMore){
        this.isInLoading = true;
        this.setState({offset:0-this.limitOffset,animate:true});
        setTimeout(()=>{
          this.isInLoading = false;
          this.scrollarea.style[scrollKey] = "auto";

          this.setState({offset:-1,animate:true});
          this.props.onLoadMoreClose&&this.props.onLoadMoreClose();
        },2000);
      }else{

        this.scrollarea.style[scrollKey] = "auto";

        this.setState({offset:-1,animate:true});
       
        this.props.onLoadMoreClose&&this.props.onLoadMoreClose(); 
      }
    }
    
  }


  _onScroll(e){
    this.props.onScroll({
      instance:this,
      wrapperdom:this.scrollarea,
      e:e
    });
  }

  _renderRefreshIndicator(){
    var wrapperClassName = this.isHorizontal?"xz-refresh-control-inner-h":"xz-refresh-control-inner-v";
    var text = this.canRefresh?"释放更新":"下拉刷新";
    return <div className={wrapperClassName}><span>{text}</span></div>;
  }

  _renderLoadMoreIndicator(){
    var wrapperClassName = this.isHorizontal?"xz-loadmore-control-inner-h":"xz-loadmore-control-inner-v";
    var text = this.canLoadMore?"释放加载":"上拉加载更多";
    return <div className={wrapperClassName}><span>{this.state.offset}</span></div>;
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

    var scrollEvent = {};
    if(this.props.onScroll){
      scrollEvent.onScroll = this._onScroll.bind(this);
    }


    var refreshControl = null;
    if(this.props.onRefresh){
      var refreshControlClassName = this.isHorizontal?"xz-refresh-control-h":"xz-refresh-control-v";
      refreshControl =  <div className={refreshControlClassName}>
          {this._renderRefreshIndicator()}
        </div>;
    }
    var loadMoreControl = null;
    if(this.props.onLoadMore){
      var loadMoreClassName = this.isHorizontal?"xz-loadmore-control-h":"xz-loadmore-control-v";
      loadMoreControl =  <div className={loadMoreClassName}>
        {this._renderLoadMoreIndicator()}
        </div>;
    }


    var innerClassName = this.isHorizontal?"xz-scrollview-inner-h":"xz-scrollview-inner-v";

    var scrollAreaClassName = this.isHorizontal?"xz-sv-scrollarea-h":"xz-sv-scrollarea-v";

    return (<div ref={(wrapper)=>{
      this.wrapperDom = wrapper;
    }} {...toucheEvent} className={classNameArr.join(" ")}>
    	<div className={innerClassName} style={moveStyle} ref={(wrapper)=>{
        this.innerWrapperDom = wrapper;
      }}>
        {refreshControl}
        <div {...scrollEvent} className={scrollAreaClassName}
          ref={(instance)=>{this.scrollarea=instance;}}
        >
          {this.props.children}
        </div>
        {loadMoreControl}
      </div>
     </div>);
  }
}

export default ScrollView;
