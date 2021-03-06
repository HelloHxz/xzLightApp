import React from "react"
import './toast.less'
    /*
    xz.Toast.show();
    {
      text:"xx",
      component:<div style={{backgroundColor:"green",color:"#fff",height:"1rem",lineHeight:"1rem"}}>asdas</div>,
      component:<div></div>,
      className:"",
      direction:"top/bottom/center",
      animation:"slide/fade/pop/none"
    }*/

var zIndex = 10000;
var directionArr = ["top","bottom","center"];
var aimationArr = ["slide","fade"];
class ToastItem extends React.Component {

  constructor(props) {
    super(props)
    this.zIndex= zIndex;
    zIndex+=1;
    var defaultConfig = {
      text:"提示语",
      direction:"top",
      animation:"slide"
    };
    if(typeof(props.config)==="string"){
      defaultConfig.text = props.config;
      this.config = defaultConfig;
    }else{
       this.config = props.config||defaultConfig;
       if(!this.config.text&&!this.config.component){
        this.config.text = "提示语";
       }
       this.config.direction = (this.config.direction||"top").toLowerCase();
       if(directionArr.indexOf(this.config.direction)<0){
          this.config.direction = "top";
       }
       this.config.animation = (this.config.animation||"slide").toLowerCase();
       if(aimationArr.indexOf(this.config.animation)<0){
          this.config.animation = "slide";
       }

    }

    this.config.duration =props.config.duration;
    if(!isNaN( this.config.duration)){
       this.config.duration = parseInt( this.config.duration);
    }else{
       this.config.duration = 2000;
    }


    this.config.showClassName = "xz-toast-"+this.config.direction+"-"+this.config.animation+"-show";
    this.config.hideClassName = "xz-toast-"+this.config.direction+"-"+this.config.animation+"-hide";
    this.config.className = this.config.className||"";
    this.wrapperClassName = "xz-toast-item-wrapper"+(this.config.text?" xz-toast-flex":"");


  }

  componentDidMount(){
    if(this.config.duration!==0){
        setTimeout(()=>{
        this.hide();
      },this.config.duration)  
    }
      
  }

  hide(){
     this.root.className=this.wrapperClassName+" "+this.config.hideClassName;
    delete this.props.parent.Dict[this.props.pkey];
    delete this.props.parent.instanceDict[this.props.pkey];
  }

  render() {
    var classNameStr =this.wrapperClassName+" "+this.config.showClassName;
    var children = null;
    if(this.config.component){
      children = this.config.component;
    }else{
      var spanClassName= "xz-toast-span "+"xz-toast-span-"+this.config.direction+" "+this.config.className;
      children = <span className={spanClassName}>{this.config.text}</span>;
    }
    return (<div 
      ref={(root)=>{this.root = root;}}
      style={{zIndex:this.zIndex}} className={classNameStr}>{children}</div>);
  }
}

var seedkey = 0;

class Toast extends React.Component {

  constructor(props) {
    super(props);
    this.Dict = {};
    this.instanceDict = {};
  }

  show(config){
    seedkey+=1;
    var key = "toast_"+seedkey;
    this.Dict[key] = <ToastItem ref={(instance)=>{
      this.instanceDict[key] = instance;
    }} pkey={key} parent={this} config={config} key={key}/>
    this.setState({seed:1});
    return key;
  }

  hide(key){
    var instance = this.instanceDict[key];
    if(instance){
      instance.hide();
    }
  }

  tip(){

  }


  render() {
    var children = [];
    for(var key in this.Dict){
      children.push(this.Dict[key]);
    }
    return (<div className='xz-toast-wrapper'>{children}</div>);
  }
}
export default Toast;
