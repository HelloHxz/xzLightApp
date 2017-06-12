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
    
    this.state = {
    	offset:0,
    	animate:false
    };

  }

  getNextSourceArr(){
    var len = this.props.datasource.length;
    var mid = this.sourceArr[1];
    mid += 1;
    if(mid>len-1){
      if(this.props.loop){
        mid = 0;
      }else{
        mid -=1;
      }
    }
    var right = mid + 1;
    if(right>len-1){
      if(this.props.loop){
        right = 0;
      }else{
        right = -1;
      }
    }
    var left = mid - 1;
    if(left<0){
      if(this.props.loop){
        left = len-1;
      }else{
        left = -1;
      }
    }
    
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
    
  }

  onTouchMove(e){
  	if(this.isIntransition){return;}
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    var curTouchX = e.nativeEvent.touches[0].pageX;
    this.diff =  curTouchX - this.touchStartValue;
    var offset = this.offsetValue+this.diff;
    this.setState({offset:offset,animate:false});
  }
  onTouchEnd(){
  	if(this.isIntransition){return;}
  	if(this.diff>0){
  		console.log("gopre");
  		this.setState({offset:(this.ScreenWidth),animate:true});
  	}else{
  		console.log("gonext");
  		this.setState({offset:(0-this.ScreenWidth),animate:true});
  	}
  	this.isIntransition = true;
  	setTimeout(()=>{
  		if(this.diff>0){
  			this.getPreWraperArr();
  		}else{
  			this.getNextWraperArr();
  		}
  		this.isIntransition = false;
  		this.setState({offset:0,animate:false});
  	},310)
  }

	componentWillReceiveProps(nextProps){	

	}

  render() {
    // var datasource = this.props.datasource||[];
    // if(datasource.length===0||datasource.length===1){

    // }
  	var classNameArr = ["xz-swiper"];
  	if(this.props.className){
  		classNameArr.push(classNameArr);
  	}else{
  		classNameArr.push("xz-default-swiper");
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
   		var childrenItem = null;
   		if(this.props.renderItem){
   			childrenItem = this.props.renderItem({wraperIndex:wrapIndex});
   		}
   		children.push(<div style={itemStyle} className="xz-swiper-item" key={key}><div className='xz-swiper-inneritem'>
   			<span className='test'>{wrapIndex}</span>
   			{childrenItem}
   		</div></div>);
    }
    return (<div {...toucheEvent} className={classNameArr.join(" ")}>{children}</div>);
  }
}

export default Swiper;
