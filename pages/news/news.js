var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sNews: [{
        src: "/images/index/hotCompany.png",
        companyName: "云程科技",
        industry: "计算机软件",
        intentionJob: "web前端工程师",
        lastMsg: "您好",
        lastChatTime: "20:04"
      },
      {
        src: "/images/index/hotCompany.png",
        companyName: "江西哈哈科技有限公司",
        industry: "游戏开发",
        intentionJob: "Java工程师",
        lastMsg: "请问此次招聘截止日期是？",
        lastChatTime: "16:16"
      }
    ],
    cNews: [{
        src: "/images/news/person02.png",
        name: "哈哈哈",
        school: "九江职业大学",
        degree: "经济管理",
        intentionJob: "销售",
        lastMsg: "可以聊聊吗",
        lastChatTime: "09:37"
      },
      {
        src: "/images/news/person01.png",
        name: "南笙Y",
        school: "九江学院",
        degree: "计算机科学与技术",
        intentionJob: "web前端工程师",
        lastMsg: "您好",
        lastChatTime: "20:04"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1
    }
    if (userKind == "企业") {
      userKindTag = 2
    }
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
      userKindTag: userKindTag,
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
    wx.switchTab({
      url: '/pages/news/news',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
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