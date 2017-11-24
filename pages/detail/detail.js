// pages/detail/detail.js
var api = require('../../utils/topics_api.js');
var WxParse = require('../../wxParse/wxParse.js');
var that = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doRequset: true,
    articleDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("get topic detail.");
    console.log(options);
    that = this;
    this.fetchData(options);
  },

  fetchData: function (options) {
    if (!that.data.doRequset) {
      return false;
    }
    that.setData({ doRequset: false });
    if (typeof options.id == "undefined" || !parseInt(options.id)) {
      wx.showModal({
        title: '提示',
        content: "文章ID错误，请重试."
      });
      return false;
    }
    wx.request({
      url: api.getTopicsIdUri(options.id,{ id: options.id }),
      success: function (result) {
        that.setData({ doRequset: true });
        console.log(result);
        if (typeof result.data.success == "undefined" || result.data.success != true) {
          wx.showModal({
            title: '提示',
            content: "数据获取失败，请重试."
          })
        }
        that.setData({
          articleDetail: result.data.data
        });
        var replyArr = [];
        for (var i in result.data.data.replies){
          replyArr.push(result.data.data.replies[i].content);
        }
        console.log(replyArr);
        WxParse.wxParse('article_content', 'html', result.data.data.content, that, 5);
        for (let i = 0; i < replyArr.length; i++) {
          WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
          if (i === replyArr.length - 1) {
            WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
          }
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})