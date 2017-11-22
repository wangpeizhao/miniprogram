//logs.js
const util = require('../../utils/util.js')
var common = require("common.js");

Page({
  data: {
    logs: [],
    msg: "My name is Parker."
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
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
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  onPageScroll: function () {
    //console.log("onPageScroll.");
  },
  onParker: function(){
    console.log("My name is Parker.");
    console.log(getCurrentPages());
    console.log(common.sayHello("Chen qi ying"));
  }
})
