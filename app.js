App({
  /**
   * 全局数据
   */
  globalData: {
    userKind: "学生", //用户类型，默认学生
    isWxLogin: false, //是否微信登录
    userInfo: null, //用户信息
  },


  onLaunch: function () {
    var _this = this;
    //判断用户类型
    var userKind = wx.getStorageSync('userKind');
    if (userKind == null || userKind == '') {
      wx.setStorageSync('userKind', "学生")
    } else {
      _this.globalData.userKind = wx.getStorageSync('userKind')
    }
    //判断是否登录
    if (wx.getStorageSync('isWxLogin')) {
      _this.globalData.isWxLogin = wx.getStorageSync('isWxLogin')
    } else {
      wx.setStorageSync('isWxLogin', _this.globalData.isWxLogin)
    }
    //获取userInfo
    if (wx.getStorageSync('userInfo')) {
      _this.globalData.userInfo = wx.getStorageSync('userInfo')
    }

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  //微信登录
  wxLogin: function () {
    let that = this;
    wx.login({
      success: res => {
        console.log("登录成功");
        //设置全局数据及缓存数据
        that.globalData.isWxLogin = true;
        wx.setStorageSync('isWxLogin', true)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //获取用户信息
          wx.getUserInfo({
            lang: "zh_CN",
            success: (userInfo) => {
              //发起网络请求
              wx.request({
                url: 'http://localhost:81/user/wxLogin',
                method: 'POST',
                data: {
                  code: res.code,
                  nickName: userInfo.userInfo.nickName,
                  avatarUrl: userInfo.userInfo.avatarUrl,
                  gender: userInfo.userInfo.gender,
                  country: userInfo.userInfo.country,
                  province: userInfo.userInfo.province,
                  city: userInfo.userInfo.city,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success: function (data) {
                  console.log("==data===", data)
                  //设置全局数据及缓存数据
                  that.globalData.userInfo = data.data.obj;
                  wx.setStorageSync("userInfo", data.data.obj)
                }
              })
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
        console.log("登录失败");
        console.log(res);
      }
    })
  },

});