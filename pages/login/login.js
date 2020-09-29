var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWxLogin: null, //是否微信登录
    showLogin: true //是否显示微信登录模态框
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var isWxLogin = app.globalData.isWxLogin
    this.setData({
      isWxLogin: isWxLogin
    })
    console.log("isWxLogin：", this.data.isWxLogin)
    wx.setStorageSync('isWxLogin', isWxLogin)
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
    //关闭微信登录模态框
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


});