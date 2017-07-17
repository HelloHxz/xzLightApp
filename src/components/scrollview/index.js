import React from "react"
import Style from "../../../utils/style"
import "./index.less"
import Spin from '../spin'
import StickyWrapper from './stickywrapper'

class ScrollView extends React.Component {
  constructor(props) {
    super(props)
    this.seed  = 0;
    this.tranDict = Style.getTransitionKeys();
    this.state = {offset:-1,animate:false};
    this.startScrollValue = 0;
    this.startY = 0;
    this.isInLoading = 0;
    var direction = this.props.direction||"vertical";
    this.isHorizontal = direction.toLowerCase()!=="vertical";
    this.limitOffset = this.props.limitOffset||(!this.isHorizontal?Style.screen.height:Style.screen.width)*.1;

    this.isBad = navigator.userAgent.indexOf("QYZone")>=0;
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
    if(props.scrollKey&&!props.pageview){
      console.error("ScrollView 组件使用scrollKey去按需加载的时候 必须指定pageview={xxx} xxx指的是所在页面的页面引用");
    }
    if(props.scrollKey){
      if(!props.pageview.scrollViewDict){
        props.pageview.scrollViewDict = {};
      }
      if(props.pageview.scrollViewDict[props.scrollKey]){
        console.error("当前页面ScrollView组件又重复的scrollKey！！")
      }else{
        props.pageview.scrollViewDict[props.scrollKey] = this;
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
    this.diff = 0;
    var touch = e.nativeEvent.touches[0];
    this.startY = touch[this.config.touchkey];
    this.startX = touch[this.config.otherToucKey];
    this.startScrollValue = this.isHorizontal? this.scrollarea.scrollLeft:this.scrollarea.scrollTop;
    if(this.props.onLoadMore){
      this.wrapperSize = this.isHorizontal? this.scrollarea.offsetWidth:this.scrollarea.offsetHeight;
    }
    this.scrollHeightSize = this.isHorizontal? this.scrollarea.scrollWidth: this.scrollarea.scrollHeight;
    this.props.onTouchStart&&this.props.onTouchStart({
      instance:this,
      scroller:this.scrollarea,
      e:e
    });
    this.startOffset = this.state.offset;
  }

  onTouchMove(e){
    if(this.isInLoading){return;}
      var touch = e.nativeEvent.touches[0];
      var curY = touch[this.config.touchkey];
      var curX = touch[this.config.otherToucKey];

      this.diff = curY-this.startY;

      var diffOtherDirection = curX - this.startX ;

      if(Math.abs(diffOtherDirection)-Math.abs(this.diff)>20){
        return;
      }


      this.props.onTouchMove&&this.props.onTouchMove({
        diff:this.diff,
        instance:this,
        scroller:this.scrollarea,
        e:e
      });
      this.scrollValue = this.isHorizontal? this.scrollarea.scrollLeft:this.scrollarea.scrollTop;
      if(this.diff>0&&this.props.onRefresh){
        if(this.scrollValue <=0){
          var l = this.isHorizontal?0:Style.px2px(20);
          if(this.diff>20){ 
            e.preventDefault();
            e.stopPropagation();
            this.scrollarea.style["overflow"] = "hidden";
          }
          
          var pullOffsetY = (this.diff- this.startScrollValue)/3;
          this.canRefresh = pullOffsetY> this.limitOffset;
          this.touchAction = "refresh";
          this.setState({offset:pullOffsetY,animate:false});
        }
      }
      if(this.diff<0&&this.props.onLoadMore){
      
        if(this.scrollHeightSize<=this.wrapperSize+this.scrollValue+Style.px2px(10)){
          this.scrollarea.style["overflow"] = "hidden";
          e.preventDefault();
          e.stopPropagation();
          this.touchAction = "loadmore";
          var pullOffset = (this.diff)/3;
          this.canLoadMore = Math.abs(pullOffset)>(this.limitOffset);
          this.setState({offset:pullOffset,animate:false});
        }
      }
  }

  onTouchEnd(){
    var scrollKey =this.isHorizontal?"overflow-x":"overflow-y";
    this.props.onTouchEnd&&this.props.onTouchEnd({
      instance:this,
      diff:this.diff,
      scroller:this.scrollarea,
      e:e
    });
    
    if(this.isInLoading){return;}
    if(this.touchAction==="refresh"){
      if(this.canRefresh){
        this.isInLoading = true;
        this.setState({offset:this.limitOffset,animate:true});
        setTimeout(()=>{
          this.refreshEnd();
          this.props.onRefresh();
        },1000);
      }else{
        this.refreshEnd();
      }
    }

    if(this.touchAction==="loadmore"){
      if(this.canLoadMore){
        this.isInLoading = true;
        this.setState({offset:0-this.limitOffset,animate:true});
        this.props.onLoadMore();

        this.loadMoreEnd();

        // setTimeout(()=>{
        //   this.loadMoreEnd();
        // },2000);
      }else{
        this.loadMoreEnd();
      }
    }
    
  }

  refreshEnd(){
    var scrollKey =this.isHorizontal?"overflow-x":"overflow-y";
    this.isInLoading = false;
    this.setState({offset:-1,animate:true});
    this.scrollarea.style[scrollKey] = "auto";

    this.props.onRefreshClose&&this.props.onRefreshClose();
  }

  loadMoreEnd(){
     var scrollKey =this.isHorizontal?"overflow-x":"overflow-y";
     this.isInLoading = false;
     this.scrollarea.style[scrollKey] = "auto";
     this.setState({offset:-1,animate:true});
     this.props.onLoadMoreClose&&this.props.onLoadMoreClose();
  }



  _checkSticky(){
    this.seed+=1;
    if(this.seed>1000){
      this.seed = 0 ;
    }
     if(this.seed%3!==0){
      return;
     }
    this.checkSticky();
  }
  checkSticky(){
     var allNOSticky = true;
     if(!this.isHorizontal&&this.props.pageview&&this.props.pageview.stickviewDict){
        var stickyArr = this.props.pageview.stickviewDict[this.props.scrollKey];
        if(stickyArr&&stickyArr.length>0){
          for(var i=0,j=stickyArr.length;i<j;i++){
            var re = stickyArr[i].checkSticky();
            if(re===true){
              allNOSticky = false;
            }
          }
        }
      }
  }

  _onScroll(e){
    e.stopPropagation();
    this.props.onScroll&&this.props.onScroll({
      instance:this,
      scroller:this.scrollarea,
      e:e
    });

    if(this.props.scrollKey||this.props.onScrollEnd||this.props.onScrollToTail){
      if(!this.isBad){
        this._checkSticky();
      }
      if(this.scrollEndTimeoutId){
        window.clearTimeout(this.scrollEndTimeoutId);
        this.scrollEndTimeoutId  = null;
      }
      this.scrollEndTimeoutId = setTimeout(()=>{
        this.props.onScrollEnd&&this.props.onScrollEnd({
          instance:this,
          scroller:this.scrollarea,
          e:e
        });
        if(this.props.onScrollToTail){
            if(!this.wrapperSize){
              this.wrapperSize = this.isHorizontal? this.scrollarea.offsetWidth:this.scrollarea.offsetHeight;
            }
            var scrollHeightSize = this.isHorizontal? this.scrollarea.scrollWidth: this.scrollarea.scrollHeight;
            var scrollValue = this.isHorizontal? this.scrollarea.scrollLeft:this.scrollarea.scrollTop;
            if(scrollHeightSize<=this.wrapperSize+scrollValue+Style.px2px(10)){
              this.props.onScrollToTail({instance:this,
                scroller:this.scrollarea,
                e:e});
            }
        }
        if(this.props.scrollKey){
          try{
             var scrollArr = this.props.pageview.onScrollIntoViewDict[this.props.scrollKey];
             for(var i=scrollArr.length-1;i>=0;i--){
                var curImageKey = scrollArr[i];
                var curItem = this.props.pageview.lazyLoadImageDict[curImageKey];
                if(!curItem||curItem.hasLazyLoadDone){
                  if(curItem){
                    delete this.props.pageview.lazyLoadImageDict[curImageKey];
                  }
                  scrollArr.splice(i,1);
                  continue;
                }else{
                  curItem.onScrollIntoView&&curItem.onScrollIntoView();
                }
              }
          }catch(e){}
        }
      },this.props.scrollEndDelayTime||200)
    }
  }

  _renderRefreshIndicator(){
    var wrapperClassName = this.isHorizontal?"xz-refresh-control-inner-h":"xz-refresh-control-inner-v";
    var child = null;
    if(this.isInLoading){
      child = <span><Spin type='android'/></span>;
    }else{
      var text = this.canRefresh?"释放更新":"下拉刷新";
      child = <span>{text}</span>;
    }
    return <div className={wrapperClassName}>{child}</div>;
  }

  _renderLoadMoreIndicator(){
    var wrapperClassName = this.isHorizontal?"xz-loadmore-control-inner-h":"xz-loadmore-control-inner-v";
    var text = this.canLoadMore?"释放加载":"上拉加载更多";
    var child ;
    if(this.props.renderLoadMoreIndicator){
      child = this.props.renderLoadMoreIndicator();
    }else{
      child = <span>{this.state.offset}</span>;
    }
    return <div className={wrapperClassName}>{child}</div>;
  }


  render() {

    var toucheEvent = {};
    var needTranslate = false;
    if(this.props.onRefresh||this.props.onLoadMore){
      toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
      needTranslate = true;
    }else{
      if(this.props.onTouchMove){
        toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      }
      if(this.props.onTouchStart){
        toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      }
      if(this.props.onTouchEnd){
        toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
      }
    }



    
    var classNameArr = ['xz-scrollview'];
    classNameArr.push(this.isHorizontal?"xz-scrollview-h":"xz-scrollview-v");
    if(this.props.className){
      classNameArr.push(this.props.className);
    }else{
      classNameArr.push("xz-sv-youcansetotherclassname");
    }

    var moveStyle = {};
    if(needTranslate){
      var valueStr = this.isHorizontal?this.state.offset+"px,0,0":"0,"+this.state.offset+"px,0";
      moveStyle[this.tranDict.transform] ="translate3d("+valueStr+")";

      if(this.state.animate){
         moveStyle[this.tranDict.transition] = "all .3s ease";
      }else{
        moveStyle[this.tranDict.transition] = "none";
      }
    }
 

    var scrollEvent = {};
    if(this.props.onScroll||this.props.scrollKey){
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
    this.stickview = null;
    if(this.isHorizontal){

    }else{
      this.stickview=<StickyWrapper ref={(instance)=>{this.stickyWrapper = instance}}/>
    }
    var outStyle = this.props.style||{};
    return (<div ref={(wrapper)=>{
      this.wrapperDom = wrapper;
    }} {...toucheEvent} 
    style={outStyle}
    className={classNameArr.join(" ")}>
      {this.stickview}
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
