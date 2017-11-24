//index.js
//获取应用实例
const app = getApp()
var that = null;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    systemInfo: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // wx.checkSession({
    //   success: function () {
    //     //session 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function () {
    //     //登录态过期
    //     wx.login() //重新登录
    //   }
    // })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res
        });
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    if (typeof e.detail.errMsg != "undefined"){
      wx.showModal({
        title: '提示',
        content: e.detail.errMsg
      })
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  linkHome: function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  linkArticle: function () {
    wx.switchTab({
      url: '/pages/topics/topics',
    })
  },
  linkLog: function () {
    wx.switchTab({
      url: '/pages/logs/logs',
    })
  },
  linkTest: function () {
    wx.navigateTo({
      url: '/pages/logs/index',
    })
  }
})
