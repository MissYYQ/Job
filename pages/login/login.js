var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWxLogin: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var isWxLogin = app.globalData.isWxLogin
    this.setData({
      isWxLogin: isWxLogin
    })
    wx.setStorageSync('isWxLogin', isWxLogin)
    if(isWxLogin) {
      wx.navigateTo({
        url: '/pages/login/userKind/userKind',
      })
    }
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

  //取消按钮
  cancel: function() {
    wx.navigateTo({
      url: '/pages/login/userKind/userKind',
    })
  }


});