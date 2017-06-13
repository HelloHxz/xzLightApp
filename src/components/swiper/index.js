import React from "react"
import "./index.less"
import Style from "../../../utils/style"





class Swiper extends React.Component {
  constructor(props) {
    super(props)
    this.tranDict = Style.getTransitionKeys();
    this.ScreenWidth = Style.screen.width;
    this.wrapperArr = [2,0,1];
    this.sourceArr = [-1,-1,-1];
    this.isIntransition = false;
    this.getNextSourceArr();
    this.touchoffset = this.props.touchoffset || Style.px2px(120);
    
    this.state = {
    	offset:0,
    	animate:false
    };
  }
  getPreSourceArr(){
    var len = this.props.datasource.length;
    var isLoop = this.props.loop;
    var mid = this.sourceArr[1];
    mid -= 1;
    if(mid<0){
      if(this.props.loop){
        mid =len===1?0:len-1;
      }else{
        mid +=1;
      }
    }
    var right;
    if(mid === -1){
      right = -1;
    }else{
      right = mid + 1;
      if(right>len-1){
        if(isLoop){
          right = len ===1?-1:0;
        }else{
          right = -1;
        }
      }
    }
    
    var left = mid - 1;
    if(left<0){
      if(isLoop){
        left =len ===1?-1:len-1;
      }else{
        left = -1;
      }
    }

    var arr = [left,mid,right];
    this.sourceArr = arr;
    console.log(arr);
  }

  getNextSourceArr(){
    var len = 1;
    var len = this.props.datasource.length;
    var isLoop = this.props.loop;
    var mid = this.sourceArr[1];
    mid += 1;
    if(mid>len-1){
      if(this.props.loop){
        mid =len ===0?-1:0;
      }else{
        mid -=1;
      }
    }
    var right;
    if(mid === -1){
      right = -1;
    }else{
      right = mid + 1;
      if(right>len-1){
        if(isLoop){
          right = len ===1?-1:0;
        }else{
          right = -1;
        }
      }
    }

    var left = mid - 1;
    if(left<0){
      if(isLoop){
        left =len ===1?-1:len-1;
      }else{
        left = -1;
      }
    }
    var arr = [left,mid,right];
    this.sourceArr = arr;
    console.log(arr);
  }




  getNextWraperArr(){
    this.wrapperArr.push(this.wrapperArr.shift());
  }

  getPreWraperArr(){
    this.wrapperArr.unshift(this.wrapperArr.pop());
  }



  onTouchStart(e){
  	if(this.isIntransition){return;}
    this.starttime = new Date().valueOf();
    this.touchStartValue = e.nativeEvent.touches[0].pageX;
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    this.diff = 0;
    this.offsetValue = this.state.offset;
    this.resetPos = false;
    
  }

  onTouchMove(e){
  	if(this.isIntransition){return;}
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    var curTouchX = e.nativeEvent.touches[0].pageX;
    this.diff =  curTouchX - this.touchStartValue;
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
    this.setState({offset:offset,animate:false});
  }
  onTouchEnd(){
  	if(this.isIntransition){return;}

    if(Math.abs(this.diff)<this.touchoffset||this.resetPos){
      this.setState({offset:(0-this.offsetValue),animate:true});
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
    this.setState({offset:(0-this.ScreenWidth),animate:true});
    setTimeout(()=>{
      this.getNextWraperArr();
      this.getNextSourceArr();
      this.isIntransition = false;
      this.setState({offset:0,animate:false});
    },310)
  }

  goPre(){
    this.setState({offset:(this.ScreenWidth),animate:true});
    setTimeout(()=>{
      this.getPreWraperArr();
      this.getPreSourceArr();
      this.isIntransition = false;
      this.setState({offset:0,animate:false});
    },310)
  }

	componentWillReceiveProps(nextProps){	

	}


  _renderItem(params){
    var childrenItem = null;
    var index = params.index;
    console.log(this.diff);
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
       if(this.props.renderItem){
        childrenItem = this.props.renderItem({data:this.props.datasource[sourceIndex]});
      }
    }
   
    return childrenItem;
  }

  render() {

  	var classNameArr = ["xz-swiper"];
  	if(this.props.className){
  		classNameArr.push(classNameArr);
  	}else{
  		classNameArr.push("xz-default-swiper");
  	}


     var datasource = this.props.datasource||[];
    if(datasource.length===0){
      return <div className={classNameArr.join(" ")}></div>;
    }
  	var children= [];

  	var toucheEvent = {};
    toucheEvent.onTouchStart = this.onTouchStart.bind(this);
    toucheEvent.onTouchMove = this.onTouchMove.bind(this);
    toucheEvent.onTouchEnd = this.onTouchEnd.bind(this);

    for(var i=0;i<3;i++){
    	var wrapIndex = this.wrapperArr[i];
    	var key = 'xz-swiper-item-'+i;
    	var itemStyle = {};
    	itemStyle[this.tranDict.transform] = "translate3d("+((i-1)*this.ScreenWidth+this.state.offset)+"px,0,0)"
   		if(this.state.animate){
   			itemStyle[this.tranDict.transition] = this.tranDict.cssTransform+" .3s ease";
   		}else{
   			itemStyle[this.tranDict.transition] = "none";
   		}
   		var childrenItem = this._renderItem({index:i});
   		children.push(<div style={itemStyle} className="xz-swiper-item" key={key}><div className='xz-swiper-inneritem'>
   			<span className='test'>{wrapIndex}</span>
   			{childrenItem}
   		</div></div>);
    }
    return (<div {...toucheEvent} className={classNameArr.join(" ")}>{children}</div>);
  }
}

export default Swiper;
