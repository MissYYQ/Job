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
        lastMsg: "您好",
        lastChatTime: "20:04"
      },
      {
        src: "/images/index/hotCompany.png",
        companyName: "江西哈哈科技有限公司",
        industry: "游戏开发",
        lastMsg: "请问此次招聘截止日期是？",
        lastChatTime: "16:16"
      }
    ],
    cNews: [{
        src: "/images/news/person02.png",
        name: "哈哈哈",
        school: "九江职业大学",
        degree: "经济管理",
        lastMsg: "可以聊聊吗",
        lastChatTime: "09:37"
      },
      {
        src: "/images/news/person01.png",
        name: "南笙Y",
        school: "九江学院",
        degree: "计算机科学与技术",
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
    let that = this;
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
                  console.log("news.js=== app.globalData.userInfo ===");
                  console.log(app.globalData.userInfo)
                  wx.setStorageSync('userInfo', res.userInfo);
                  //直接获取到当前页面的onload()进行刷新
                  that.onLoad();
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
    //直接获取到当前页面的onload()进行刷新

  },

  // 跳转至交流页面
  toChatPage: function () {
    wx.navigateTo({
      url: '/pages/news/chat/chat',
    })
  },


  // tabBar监听点击事件
  onTabItemTap(item) {
    this.onLoad();
  },


})