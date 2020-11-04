var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWxLogin: null, //是否登录
    news: [{
        src: "/images/news/person01.png",
        personName: "姜先生",
        lastMsg: "您好",
        lastChatTime: "20:04"
      },
      {
        src: "/images/news/person02.png",
        personName: "林慧慧",
        lastMsg: "请问此次招聘截止日期是？",
        lastChatTime: "16:16"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin')
    })
  },

  //微信登录
  wxLogin: function () {
    wx.login({
      success: res => {
        console.log("登录成功")
        app.globalData.isWxLogin = true
        wx.setStorageSync('isWxLogin', app.globalData.isWxLogin)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                lang: "zh_CN",
                success: res => {
                  console.log("获取用户信息成功")
                  // 可以将 res 发送给后台解码出 unionId
                  app.globalData.userInfo = res.userInfo;
                  console.log("login.js=== app.globalData.userInfo ===");
                  console.log(app.globalData.userInfo)
                  wx.setStorageSync('userInfo', res.userInfo);
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          },
          fail: res => {
            console.log("获取用户信息失败");
            console.log(res);
          }
        })
      },
      fail: res => {
        console.log("登录失败");
        console.log(res);
      }
    })
    wx.navigateTo({
      url: '/pages/login/userKind/userKind',
    })
  },
  
  // 跳转至交流页面
  toChatPage: function () {
    wx.navigateTo({
      url: '/pages/news/chat/chat',
    })
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