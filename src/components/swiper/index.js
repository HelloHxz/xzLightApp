import React from "react"
import "./index.less"
import Style from "../../../utils/style"





class Swiper extends React.Component {
  constructor(props) {
    super(props)
    this.tranDict = Style.getTransitionKeys();
    this.space =  this.props.space || 0;
    this.touchoffset = this.props.touchoffset || Style.px2px(120);
    this.init(props,false);
    this.animate = false;
    this.state = {
      offset:0,
    };



  }

  init(props,isReciveProps){

    this.wrapperArr = [2,0,1];
    this.cacheDict = {};

    var direction = this.props.direction||"horizontal";
    this.isHorizontal = direction.toLowerCase()==="horizontal";
    this.config = {
      touchkey:"pageX",
      othertouchkey:"pageY"
    };
    if(!this.isHorizontal){
      this.config = {
        touchkey:"pageY",
        othertouchkey:"pageX"
      };
    }

    var selectedIndex = props.selectedIndex||0;
    if(!isReciveProps){

    }
    this.sourceArr = [-1,-1,-1];
    this.isIntransition = false;
    this.isLoop = props.loop;

    this.getNextSourceArr();

    this.startInterval();
  }

  componentWillUnmount(){
    this.stopInterval();
  }
  stopInterval(){
    if( this.goNextTimeoutID){
      this.isIntransition = false;
      this.goNextTimeoutID = null;
      window.clearTimeout(this.goNextTimeoutID);
    }
  	if(this.intervalID){
	    	window.clearInterval(this.intervalID);
	    	this.intervalID = null;
  	}
  }
	startInterval(){
		if(!this.props.interval){
			return;
		}
		this.stopInterval();
		var interval = 0;
	    if(this.props.interval){
	    	if(isNaN(this.props.interval)){
	    		interval = 800;
	    	}else{
	    		interval = parseInt(this.props.interval);
	    	}
	    }
	    
	    if(interval>0){
	    	this.intervalID = window.setInterval(()=>{
	    		this.goNext();
	    	},interval)
	    }
	}

  getPreSourceArr(){
    var len = this.props.datasource.length;
  
    var mid = this.sourceArr[1];
    mid -= 1;
    if(mid<0){
      if(this.isLoop){
        mid =len===1?0:len-1;
      }else{
        mid +=1;
      }
    }
    var lr = this.getLeftRightIndexByMid(mid,len);
    var arr = [lr.left,mid,lr.right];
    this.sourceArr = arr;
  }

  getNextSourceArr(){
    var len = this.props.datasource.length;
   
    var mid = this.sourceArr[1];
    mid += 1;
    if(mid>len-1){
      if(this.isLoop){
        mid =len ===0?-1:0;
      }else{
        mid -=1;
      }
    }
    var lr = this.getLeftRightIndexByMid(mid,len);
    var arr = [lr.left,mid,lr.right];
    this.sourceArr = arr;
  }


  getLeftRightIndexByMid(mid,len){
    var right;
    if(mid === -1){
      right = -1;
    }else{
      right = mid + 1;
      if(right>len-1){
        if(this.isLoop){
          right = len ===1?-1:0;
        }else{
          right = -1;
        }
      }
    }

    var left = mid - 1;
    if(left<0){
      if(this.isLoop){
        left =len ===1?-1:len-1;
      }else{
        left = -1;
      }
    }
    return {left:left,right:right}
  }




  getNextWraperArr(){
    this.wrapperArr.push(this.wrapperArr.shift());
  }

  getPreWraperArr(){
    this.wrapperArr.unshift(this.wrapperArr.pop());
  }



  onTouchStart(e){
    if(this.isIntransition){return;}
    this.stopInterval();
    this.starttime = new Date().valueOf();
    this.touchStartValue = e.nativeEvent.touches[0][this.config.touchkey];
    this.touchOtherStartValue =  e.nativeEvent.touches[0][this.config.othertouchkey];
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    this.diff = 0;
    this.animate = false;  
    this.offsetValue = this.state.offset;
    this.resetPos = false;
    
  }

  onTouchMove(e){
    if(this.isIntransition){return;}
    var curTouchX = e.nativeEvent.touches[0][this.config.touchkey];
    var touchOtherValue =  e.nativeEvent.touches[0][this.config.othertouchkey];
    this.diff =  curTouchX - this.touchStartValue;
    

    if(Math.abs(touchOtherValue-this.touchOtherStartValue)>20){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      return;
    }

    if(Math.abs(this.diff)>40){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  
    this.animate = false;  
    var offset = this.offsetValue;
    if(this.diff>0){
      //gopre
      if(this.sourceArr[0]===-1){
        this.diff = this.diff/3;
        this.resetPos = true;
      }
    }else{
      //gonext
      if(this.sourceArr[2]===-1){
        this.diff = this.diff/3;
        this.resetPos = true;
      }
    }
    offset = offset+this.diff;
    this.setState({offset:offset});
  }
  onTouchEnd(){
    if(this.isIntransition){return;}

    if(Math.abs(this.diff)<this.touchoffset||this.resetPos){

      this.animate = true;
      this.setState({offset:(0-this.offsetValue)});
      this.startInterval();
      return;
    }

    if(this.diff>0){
      this.goPre();
    }else{
      this.goNext();
    }
    this.isIntransition = true;
    
  }

  goNext(){
    if( this.goNextTimeoutID){
      this.isIntransition = false;
      this.goNextTimeoutID = null;
      window.clearTimeout(this.goNextTimeoutID);
    }
    this.animate = true;  
    this.setState({offset:(0-this.WrapperSizeValue-this.space)});
    this.goNextTimeoutID = setTimeout(()=>{
      this.getNextWraperArr();
      this.getNextSourceArr();
      this.isIntransition = false;
      this.setState({offset:0});
      this.startInterval();
    },310)
  }

  goPre(){
    this.animate = true;  
    this.setState({offset:(this.WrapperSizeValue+this.space)});
    setTimeout(()=>{
      this.getPreWraperArr();
      this.getPreSourceArr();
      this.isIntransition = false;
      this.setState({offset:0});
      this.startInterval();
    },310)
  }

  componentWillReceiveProps(nextProps){ 
    this.init(nextProps,true);
  }


  _renderItem(params){
    var childrenItem = null;
    var index = params.index;
    var sourceIndex = this.sourceArr[index];
    if(index===0||index===2){
      //如果只有两个数据源的话 两边都一样的话 根据方向只显示一个
      if(this.sourceArr[0]===this.sourceArr[2]){
        if(this.diff>=0&&index===2){
          return null;
        }
        if(this.diff<0&&index===0){
          return null;
        }
      }
    }
    
    if(sourceIndex!==-1){
      childrenItem = this.cacheDict[sourceIndex.toString()];
      if((this.props.lazyrender&&index===1&&!childrenItem)||!this.props.lazyrender){
        if(!childrenItem){
          if(this.props.renderItem){
            childrenItem = this.props.renderItem({index:sourceIndex,data:this.props.datasource[sourceIndex]});
            if(this.props.cache){
              this.cacheDict[sourceIndex.toString()] = childrenItem;
            }
          }
        }else{

        }
      }
    }
   
    return childrenItem;
  }

  _renderIndicator(){
    var curIndex = this.sourceArr[1];
    var datasource  =this.props.datasource||[];
    var len = datasource.length;
    if(this.props.renderIndicator){
      return this.props.renderIndicator({
        length:len,
        curIndex:curIndex
      });
    }
 
    var point = [];
    for(var i=0;i<len;i++){
      point.push(<span key={i}>&nbsp;{i===curIndex?"o":"-"}</span>);
    }
    return <div style={{position:"absolute",bottom:"0",zIndex:11}}>{point}</div>;
  }

  wrapInit(outerWrapper){
    this.outerWrapper = outerWrapper;
    if(this.outerWrapper&&!this.WrapperSizeValue){
      if(this.isHorizontal){
        this.WrapperSizeValue = this.outerWrapper.offsetWidth;
      }else{
        this.WrapperSizeValue = this.outerWrapper.offsetHeight;
      }
      this.setState({offset:0});
    }
  }

  render() {
    var classNameArr = ["xz-swiper"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }else{
      classNameArr.push("xz-default-swiper");
    }

    var datasource = this.props.datasource||[];
    if(datasource.length===0){
      return <div className={classNameArr.join(" ")}></div>;
    }
    var children= [];

    var toucheEvent = {};
    if(this.props.touchenable!==false){
      toucheEvent.onTouchStart = this.onTouchStart.bind(this);
      toucheEvent.onTouchMove = this.onTouchMove.bind(this);
      toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);
    }

    
    if(this.WrapperSizeValue){
      for(var i=0;i<3;i++){
        var wrapIndex = this.wrapperArr[i];
        var sourceIndex = this.sourceArr[i];
        if(sourceIndex===-1){
          continue;
        }
        var key = 'xz-swiper-item-'+sourceIndex;
        if(this.sourceArr[0]===this.sourceArr[2]&&i!==1){
          key+="_"+wrapIndex;
        }
        
        var itemStyle = {};
        var v = ((i-1)*this.space+(i-1)*this.WrapperSizeValue+this.state.offset);
        var vstr = this.isHorizontal? v +"px,0,0":"0,"+v+"px,0";
        itemStyle[this.tranDict.transform] = "translate3d("+vstr+")"
        if(this.animate){
          itemStyle[this.tranDict.transition] = this.tranDict.cssTransform+" .3s ease";
        }else{
          itemStyle[this.tranDict.transition] = "none";
        }
        children.push(<div style={itemStyle} className="xz-swiper-item" key={key}><div className='xz-swiper-inneritem'>
          {this._renderItem({index:i})}
        </div></div>);
      }
   
      
     
      if(this.props.cache){
         var cacheStyle = {};
         var cv = ((-1)*this.WrapperSizeValue-100);
         var cvstr = this.isHorizontal? cv +"px,0,0":"0,"+cv+"px,0";

         cacheStyle[this.tranDict.transform] = "translate3d("+cvstr+"px,0,0)"
         for(var key in this.cacheDict){
          var cacheIndex = this.sourceArr.indexOf(parseInt(key));
          if(cacheIndex<0){
            var itemKey = 'xz-swiper-item-'+key;
            children.push(<div style={cacheStyle} className="xz-swiper-item" key={itemKey}><div className='xz-swiper-inneritem'>
             { this.cacheDict[key]}
            </div></div>);
          }
        }
      }
    }
    return (<div ref={(outerWrapper)=>{this.wrapInit(outerWrapper)}} {...toucheEvent} className={classNameArr.join(" ")}>{children}
      {this._renderIndicator()}
      </div>);
  }
}

export default Swiper;
