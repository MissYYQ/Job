var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
      isWxLogin: app.globalData.isWxLogin,
      userKindTag: userKindTag,
    })
  },

  //微信登录
  wxLogin: function () {
    app.wxLogin();
    //直接获取到当前页面的onload()进行刷新
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    currentPage.onLoad();
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