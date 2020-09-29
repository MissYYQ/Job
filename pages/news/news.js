Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWxLogin: null, //是否登录
    showLogin: true, //是否显示微信登录模态框
    // news: '',
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
    var isWxLogin = wx.getStorageSync('isWxLogin')
    this.setData({
      isWxLogin: isWxLogin
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

      },
      fail: res => {
        console.log("登录失败")
        console.log(res)
      }
    })
    this.setData({
      showLogin: false
    })
  },

  //关闭微信登录模态框
  close: function () {
    this.setData({
      showLogin: false
    })

  },

  //跳出登录模态框
  loginAgain: function () {
    this.setData({
      showLogin: true
    })
  },
  
  // 跳转至交流页面
  toCommunicationPage: function () {
    wx.navigateTo({
      url: '/pages/news/communication/communication',
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