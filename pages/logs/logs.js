//logs.js
const util = require('../../utils/util.js')
var common = require("common.js");
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var html = "<h1>我是富文本！</h1></br><div>我是Div，怎么着？</div><br><table style=\"padding:10px;text-align: center;\"><thead ><tr><th>姓名</th><th>班级</th></tr></thead><tbody><tr><td>王培照</td><td>信息081</td></tr><tr><td>王培照</td><td>信息081</td></tr><tr><td>王培照</td><td>信息081</td></tr><tr><td>王培照</td><td>信息081</td></tr><tr><td>王培照</td><td>信息081</td></tr><tr><td>王培照</td><td>信息081</td></tr></tbody><tfoot><tr><td>王培照</td><td>信息081</td></tr></tfoot></table><br><ul><li>5555555 </li><li>2222222</li><li>3333333</li><li>4444444</li></ul>";


Page({
  data: {
    html: html,
    richTxt: app.convertHtmlToText(html),
    article: "",
    logs: [],
    msg: "My name is Parker.",
    mapcircles: [{ 
      latitude: 23.146965,
      longitude: 113.253406,
      color: "#f31010CC", 
      fillColor:"#bfc4f6CC",
      radius:10,
      strokeWidth:1
    }],
    lists: [{
      name: "王培照",
      grade: "信息081"
      }, {
      name: "照仔",
      grade: "信息082"
      }, {
        name: "肥照",
        grade: "信息083"
      }],
    markers: [{
      iconPath: "images/location.png",
      id: 0,
      latitude: 23.146965,
      longitude: 113.253406,
      width: 50,
      height: 80,
      title: "广州壹马服装市场",
      rotate:0,
      alpha:1,
      label:[{
        color:"",
        fontSize:"",
        content:"I am label."
      }],
      callout:[{
        content:"我是气泡",
        color:"#ff4e00",
        fontSize:12,
        borderRadius:2,
        bgColor:"#fdd4c2",
        padding:1,
        display:"BYCLICK"
      }]
    }],
    polyline: [{
      points: [{
        longitude: 113.253406,
        latitude: 23.146965
      }, {
          longitude: 113.287722,
          latitude: 23.037891
        }, {
          longitude: 113.326035,
          latitude: 23.151725
        }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true,
      arrowLine:true
    }],
    controls: [{
      id: 1,
      iconPath: 'images/controls.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 80,
        height: 50
      },
      clickable: true
    }],
    iconSize: [20, 30, 40, 50, 60, 100],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    });
    var that = this;
    WxParse.wxParse('article', 'html', html, that, 5);
  },
  onPullDownRefresh: function(){
    console.log("onPullDownRefresh.");
    this.onParker();
  },
  onReachBottom: function () {
    console.log("onReachBottom.");
  },
  onShareAppMessage: function () {
    console.log("onShareAppMessage.");
    return {
      title: '我要转发该文章',
      path: '/page/user?id=123'
    }
  },
  onPageScroll: function () {
    //console.log("onPageScroll.");
  },
  onParker: function(){
    console.log("My name is Parker.");
    // console.log(getCurrentPages());
    console.log(common.sayHello("Chen qi ying"));
  },
  bindViewTap: function(){
    console.log("you hit me!");
    wx.navigateTo({
      url: '../index/index',
    })
  },
  mapbindtap: function(){
    console.log("map bindtap");
  },
  mapbindupdated: function (){
    console.log("map bindupdated");
  },
  mapbindregionchange: function(){
    console.log("map bindregionchange");
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})
