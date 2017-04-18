var React = require("react");
var TimerMixin = require('react-timer-mixin');
var reactMixin = require('react-mixin');
import * as styleHelper from '../../common/styleHelper';

var screenWidth = window.innerWidth;


var styles={
  itemStyle:{
    position:"absolute",
    top:0,
    height:"100%",
    textAlign:"center",
    width:screenWidth
  },
  style:{
    height:170,
    position:"relative"
  },
  scrollWrapperStyle:{
    overflow:"hidden",
    height:"100%"
  },
  indicatorWrapperStyle:{
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    height:20,
    display:"flex",
    backgroundColor:"transparent",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  indicatorStyle:{
    width:6,
    height:6,
    backgroundColor:"#fff",
    borderRadius:3,
    marginLeft:8
  },
  bkStyle:{
    position:"absolute",
    top:0,
    left:0,
    width:"100%",
    zIndex:1,
    height:44,
  },
  selectedIndicatorStyle:{
    width:8,
    height:8,
    borderRadius:4,
    backgroundColor:"orange"
  }
}

class xzSwiper extends React.Component {
  constructor(props) {
    super(props)
    this.imgArr = ['http://img12.360buyimg.com/da/jfs/t2857/68/2087348828/95010/c1e9b654/575641c6N67df4824.jpg',
         "http://m.360buyimg.com/n12/jfs/t2029/67/2768267263/165446/527e91fb/56f24597Nd8fae481.jpg!q70.jpg",
         "http://pics.sc.chinaz.com/files/pic/pic9/201603/apic19296.jpg",
         "http://pics.sc.chinaz.com/files/pic/pic9/201605/fpic1033.jpg",
       "http://pics.sc.chinaz.com/files/pic/pic9/201605/apic20739.jpg",
     "http://pics.sc.chinaz.com/files/pic/pic9/201605/apic20588.jpg"];
    // this.imgArr = ['http://pics.sc.chinaz.com/files/pic/pic9/201605/fpic1267.jpg'];
    this.curImageIndex = 0;
    this.during = 280;
    this.arr = this.getArrByImagIndex(this.curImageIndex);
    this.isNeedAnimate = false;
    this.diff = 0;
    this.isInTransition = false;
    this.state={offsetLeft:this.imgArr.length==1?0:-screenWidth};
    this.touchMove = this.touchMove.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  timer:null

  timerout:null


  getArrByImagIndex(index){
    var len = this.imgArr.length;
    if(len==1){
      return [index];
    }
    var re = [index];
    var next = index+1;
    if(next>len-1){
      if(index!=0){
        re = re.concat([0]);
      }
    }else{
      re = re.concat([next]);
    }
    var pre = index - 1;
    if(pre>=0){
      re = [pre].concat(re);
    }else{
      if(pre<0){
          re = [len-1].concat(re);
      }else{
        re = [pre].concat(re);
      }
    }
    return re;
  }

  startTimer(){
    if(this.imgArr.length<=1){
      return;
    }
    if(this.timer){
      return;
    }
    this.timer = this.setInterval(
     () => {
       this.isNeedAnimate = true;
       this.isInTransition = true;
       this.diff=-1;
       this.setState({offsetLeft:2*-screenWidth});

       this.setTransitionEnd();
     },
     3600
   );
  }

  componentDidMount(){
      this.startTimer();
  }


  setTransitionEnd(){
    //因为在safiri按下home键之后 不会触发transitionEnd 所以使用timeout
    if(this.timerout){
      this.clearTimeout(this.timerout);
      this.timerout = null;
    }
    this.timerout = this.setTimeout(()=>{
      this.transitionEnd();
    },this.during);
  }


  componentWillReceiveProps(props){
  }

  touchX:0

  curOffsetLeft:0

  touchStart(e){
    if(this.timer){
      this.clearInterval(this.timer);
      this.timer = null;
    }
    this.isNeedAnimate = false;
    this.touchX = e.nativeEvent.touches[0].pageX;
    if(this.isInTransition){
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      return false;
    }
    this.diff = 0;
    this.curOffsetLeft = this.state.offsetLeft;
  }

  touchMove(e){
    // e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if(this.isInTransition){
      return false;
    }

    var curTouchX = e.nativeEvent.touches[0].pageX;
    this.diff =  curTouchX - this.touchX;
    var left = this.curOffsetLeft+this.diff;
    this.setState({offsetLeft:left});
  }


  touchEnd(e){
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.startTimer();
    if(this.isInTransition){
      return false;
    }

    this.isInTransition = true;
    this.isNeedAnimate = true;
    var left = 0;
    if(this.imgArr.length==1){
      this.setState({offsetLeft:0});
      this.isInTransition = false;
      this.isNeedAnimate = false;
      return;
    }
    if(this.diff>0){
      //go left
      this.setState({offsetLeft:0*screenWidth});
    }else if(this.diff<0){
      this.setState({offsetLeft:2*-screenWidth});
      //go right
    }else{
      this.isInTransition = false;
      this.isNeedAnimate = false;
    }

    this.setTransitionEnd();

  }




  transitionEnd(){
    this.isNeedAnimate  = false;
    this.isInTransition = false;

    if(this.imgArr.length==1){
      return;
    }


    if(this.diff>0){
      this.curImageIndex = (this.curImageIndex<=0?this.imgArr.length-1:this.curImageIndex-1);
      this.arr = this.getArrByImagIndex(this.curImageIndex);
        //go left
    }else if(this.diff<0){
      this.curImageIndex =(this.curImageIndex>=this.imgArr.length-1?0:this.curImageIndex+1) ;
      this.arr = this.getArrByImagIndex(this.curImageIndex);
    }
    this.setState({offsetLeft:-screenWidth});
  }

  processStyle(defaultStyle,config){
    for(var key in defaultStyle){
      if(config[key]){
        defaultStyle[key] =({...defaultStyle[key],...config[key]});
      }
      defaultStyle[key] = styleHelper.process(defaultStyle[key]);
    }
    return defaultStyle;
  }


  render() {

    var imagedivs = [];

    styles = this.processStyle(styles,this.props.config);

    for(var i=0,j=this.arr.length;i<j;i++){
      var index = this.arr[i];
      var left ="translate3d("+(i*screenWidth+this.state.offsetLeft)+"px,0,0)";
      var s = this.isNeedAnimate?{transform:left,transition:("transform "+this.during+"ms ease")}:{transform:left};
      var itemStyle = {...styles.itemStyle,...s};
      imagedivs.push(
        <div key={this.props.com_ref+"item"+index} style={itemStyle}>
          <img style={{height:"100%",width:"100%",position:"relative"}}  src={this.imgArr[index]}/>
        </div>
      );
    }
    var indicators = [];
    for(var i=0,j=this.imgArr.length;i<j;i++){
      var indStyle =this.curImageIndex==i?{...indStyle,...styles.selectedIndicatorStyle}:styles.indicatorStyle;
      indicators.push(
        <div key={"indicator"+i} style={indStyle}></div>
      );
    }
    return (
      <div style={styles.style}>
          <img src={'../../images/swiper_bk.png'} style={styles.bkStyle}/>
          <div onTouchStart={this.touchStart}
            onTouchEnd={this.touchEnd}
            onTouchMove={this.touchMove}
            ref="scrolldiv"
            style={styles.scrollWrapperStyle}>
            {imagedivs}
          </div>
          <div style={styles.indicatorWrapperStyle}>
            {indicators}
          </div>
      </div>);

  }
}
reactMixin(xzSwiper.prototype, TimerMixin);
module.exports = xzSwiper;
