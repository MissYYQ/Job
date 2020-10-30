App({
  /**
   * 全局数据
   */
  globalData: {
    userKind: null,         //用户类型
    isWxLogin: false,   //是否微信登录
    userInfo: null,      //用户信息
  },


  onLaunch: function () {
    var _this = this;
    //判断用户类型
    var userKind = wx.getStorageSync('userKind');
    if(userKind == null || userKind == ''){
      wx.setStorageSync('userKind', null)
    } else {
      _this.globalData.userKind = wx.getStorageSync('userKind')
    }
    //判断是否登录
    if (wx.getStorageSync('isWxLogin')) {
      _this.globalData.isWxLogin = wx.getStorageSync('isWxLogin')
    } else {
      wx.setStorageSync('isWxLogin', _this.globalData.isWxLogin)
    }
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },


});


