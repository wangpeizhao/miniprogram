// pages/logs/index.js
var WxParse = require('../../wxParse/wxParse.js');
var that = null;
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
    inputContent: {},
    animationData: {},
    recordTempFilePath: null,
    pictures: null,
    choosedLocation: {},
    gotLocation: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
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
  },
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  rotateAndScale: function () {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  },
  startRecord: function(){
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        } else {
          wx.startRecord({
            success: function (res) {
              var tempFilePath = res.tempFilePath
              that.setData({
                recordTempFilePath: tempFilePath
              })
              console.log(tempFilePath);
              
            },
            fail: function (res) {
              //录音失败
            }
          })
          // setTimeout(function () {
          //   //结束录音  
          //   wx.stopRecord();
          //   wx.showModal({
          //     title: '提示',
          //     content: "录音结束"
          //   })
          // }, 10000)
        }

      }
    })
  },
  stopRecord: function () {
    wx.stopRecord();
  },
  playVoice: function(){
    if (!this.checkVoice()){
      return false;
    }
    wx.playVoice({
      filePath: that.data.recordTempFilePath,
      complete: function () {

      }
    })
  },
  pauseVoice: function () {
    if (!this.checkVoice()) {
      return false;
    }
    wx.pauseVoice();
  },
  stopVoice: function () {
    if (!this.checkVoice()) {
      return false;
    }
    wx.stopVoice();
  },
  checkVoice: function(){
    if (!that.data.recordTempFilePath){
      wx.showModal({
        title: '提示',
        content: "录音文件不存在"
      });
      return false;
    }
    return true;
  },
  uploadPic: function(){
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          pictures: tempFilePaths
        });
      }
    })
  },
  savePic: function(){
    if (!that.data.pictures) {
      wx.showModal({
        title: '提示',
        content: "图片不存在"
      });
      return false;
    }
    for (var i in that.data.pictures){
      wx.saveImageToPhotosAlbum({
        filePath: that.data.pictures[i],
        success(res) {
          console.log(res)
        }
      })
    }
    
  },
  previewPic: function(e){
    var url = e.currentTarget.id;
    console.log(e);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: that.data.pictures // 需要预览的图片http链接列表
    })
  },
  getLocation: function(){
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          gotLocation: res
        });
        // wx.openLocation({
        //   latitude: latitude,
        //   longitude: longitude,
        //   scale: 28
        // })
      }
    })
  },
  chooseLocation: function(){
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          choosedLocation: res
        });
      }
    })
  },
  openLocation: function(){
    wx.openLocation({
      latitude: that.data.choosedLocation.latitude,
      longitude: that.data.choosedLocation.longitude,
      scale: 28
    })
  }
})