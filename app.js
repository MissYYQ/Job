App({
  /**
   * 全局数据
   */
  globalData: {
    userKind: 0,             //用户类型【0-学生，1-企业】，默认学生
    isWxLogin: false,   //是否微信登录
    userInfo: null,      //用户信息
    city: ''                 //用户所在城市
  },


  onLaunch: function () {
    var _this = this
    if (wx.getStorageSync('isWxLogin')) {
      _this.globalData.isWxLogin = wx.getStorageSync('isWxLogin')
    } else {
      wx.setStorageSync('isWxLogin', _this.globalData.isWxLogin)
    }
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 判断是否登录
    wx.checkSession({
      success: function (res) {
        console.log("处于登录态")
        _this.globalData.isWxLogin = true
        wx.setStorageSync('isWxLogin', _this.globalData.isWxLogin)

        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                lang: "zh_CN",
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  _this.globalData.userInfo = res.userInfo
                  console.log("===== app.globalData.userInfo =====")
                  console.log(_this.globalData.userInfo)
                  wx.setStorageSync('userInfo', res.userInfo);
                  wx.setStorageSync('city', res.userInfo.city);
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (_this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          },
          fail: res => {
            console.log("获取用户信息失败")
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log("需要重新登录")
      }
    })

  },


});


