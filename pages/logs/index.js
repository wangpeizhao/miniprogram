// pages/logs/index.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {
      time: "2017-11-23 22:51:34",
      index: 0,
      msg: "My name is parker."
    },
    inputContent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var replyHtml0 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复0:不错，喜欢[03][04]
		</p>	
	</div>`;
    var replyHtml1 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复1:不错，喜欢[03][04]
		</p>	
	</div>`;
    var replyHtml2 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复2:不错，喜欢[05][07]
		</p>	
	</div>`;
    var replyHtml3 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复3:不错，喜欢[06][08]
		</p>	
	</div>`;
    var replyHtml4 = `<div style="margin-top:10px; height:50px;">
		<p class="reply">
			wxParse回复4:不错，喜欢[09][08]
		</p>	
	</div>`;
    var replyHtml5 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复5:不错，喜欢[07][08]
		</p>	
	</div>`;
    var replyArr = [];
    replyArr.push(replyHtml0);
    replyArr.push(replyHtml1);
    replyArr.push(replyHtml2);
    replyArr.push(replyHtml3);
    replyArr.push(replyHtml4);
    replyArr.push(replyHtml5);


    for (let i = 0; i < replyArr.length; i++) {
      WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
      if (i === replyArr.length - 1) {
        WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
      }
    }
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
  jump: function () {
    wx.navigateTo({
      url: '/pages/logs/index',
    })
  },
  bindBlur: function (e) {
    inputContent[e.currentTarget.id] = e.detail.value;
    console.log(inputContent);
  }
})