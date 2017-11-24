var api = require('../../utils/topics_api.js');
var that = null;
// pages/topics/topics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doRequset: true,
    title: "文章列表",
    articleList: {},
    hidden: true,
    tab: "all",
    page: 1,
    scroll_view_height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log("get topic lists.");
    this.fetchData();
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({ scroll_view_height: res.windowHeight-40 });
      }
    });
  },

  fetchData: function(data){
    if (!that.data.doRequset){
      return false;
    }
    that.setData({ doRequset: false });
    if(!data){
      data = {};
    }
    if(!data.page){
      data.page = 1;
    }
    that.setData({hidden:false});
    const requestTask = wx.request({
      url: api.getTopicsUri(data),
      success: function(result){
        that.setData({ doRequset: true });
        that.setData({ hidden: true });
        console.log(result);
        if (typeof result.data.success == "undefined" || result.data.success!=true){
          wx.showModal({
            title: '提示',
            content: "数据获取失败，请重试."
          })
        }
        that.setData({
          articleList: result.data.data
        });
      }
    });

    //requestTask.abort() // 取消请求任务
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
  
  },
  jump: function(){
    wx.navigateTo({
      url: '/pages/logs/index',
    })
  },
  onTapTag: function(e){
    var tab = e.currentTarget.id;
    if(tab!='all'){
      that.setData({ tab: tab });
      this.fetchData({tab:tab});
      return true;
    }
    this.fetchData();
  },
  lower: function(e){
    var _S = this;
    that.setData({ page: _S.data.page+1 });
    console.log("page:" + _S.data.page);
    //console.log(e);
    if (_S.data.tab != 'all') {
      this.fetchData({ tab: _S.data.tab, page: _S.data.page});
      return true;
    }
    this.fetchData({ page: _S.data.page});
  },
  bindtapscroll: function(e){
    // console.log("bindtapscroll");
    // console.log(e);
  },
  redictDetail: function(e){
    console.log("查看文章详情");
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    });
  }
})