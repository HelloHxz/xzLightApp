module.exports = {
  type:"pageview",
  root:["header","body"],
  style:{"backgroundColor":"#fff"},
  components:{
    header:{
      type:"xz.header",
      root:["退出","headertitle"],
      style:{
        common:"header"
      }
    },
    headertitle:{
      type:"xz.text",
      text:"按钮展示",
      style:{
        color:"#fff",
        fontSize:17
      }
    },
    退出:{
      type:"xz.icon",
      font:"icomoon_e960",
      style:{
      common:"lefticon",justifyContent:"flex-start"},
      iconStyle:{color:"#fff",fontSize:18},
      onClick:[
        {type:"goback"}
      ]
    },
    body:{
      type:"xz.view",
      overflow:"auto",
      style:{
        paddingTop:10,
        flex:1
      },
      root:[
        "button1","button2","button3"
      ]
    },
    button1:{
      type:"xz.button",
      text:"点击",
      style:{
        marginLeft:10,
        borderRadius:20,
        overflow:"hidden",
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"rgb(67,165,188)",
        width:100,
        paddingTop:6,
        paddingBottom:6
      },
      textStyle:{
        fontSize:15,
        textAlign:"center",
        color:"rgb(67,165,188)"
      }
    },
    button2:{
      type:"xz.button",
      text:"测试跳转同一个页面报错",
      style:{
        marginLeft:10,
        borderRadius:20,
        marginTop:10,
        overflow:"hidden",
        backgroundColor:"red",
        paddingTop:6,
        width:230,
        paddingBottom:6
      },
      textStyle:{
        fontSize:15,
        textAlign:"center",
        color:"#fff"
      },
      onClick:[
        {type:"navigate",to:"setting"}
      ]
    },
    button3:{
      type:"xz.button",
      text:"Click Me",
      style:{
        marginTop:10,
        overflow:"hidden",
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        backgroundColor:"#eee",
        borderColor:"gray",
        borderStyle:"solid",
        paddingTop:10,
        paddingBottom:10
      },
      textStyle:{
        fontSize:15,
        textAlign:"center",
        color:"#000"
      }
    }
  }
}
