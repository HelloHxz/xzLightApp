class page1 {
  constructor(pageviewInstance){
    this.pageview = pageviewInstance;
    this.row_image_click = this.row_image_click.bind(this);
    this.listview_rowclick = this.listview_rowclick.bind(this);
    this.page1_testBtn_click = this.page1_testBtn_click.bind(this);
  }

  headertitle_format(params){
    //  params.text = "改变在Plugin"+params.text;
    //  params.style.color="red";
     return params;
  }

  // itemview_click(sender,params){
  //   console.log(sender);
  // }
  repeat_beforechange(sender,params){

  }
  repeat_change(sender,params){
  }
  repeat_afterchange(sender,params){
    // alert("s");
  }

  page1_testBtn_click(sender,params){
    this.pageview.Go("page1",{});
  }
  listview_rowclick(sender,params){
    this.pageview.Go("goodsdetail",{goodsid:params.rowData.id});
  }
  row_image_click(sender){
    // console.log(sender.props.row_data);
  }
}

module.exports = page1;
