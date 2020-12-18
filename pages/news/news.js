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
    var that = this;
    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1;
      wx.request({
        url: 'http://localhost:81/chat/allStudentId',
        method: 'get',
        data: {
          studentId: wx.getStorageSync('studentId')
        },
        success: function (res) {
          if (res.data) {
            that.setData({
              news: res.data
            })
            console.log(res.data);
            if (that.data.news.length >= 1) {
              that.setData({
                empty: false
              })
            } else {
              that.setData({
                empty: true
              })
            }
          }
        }
      })
    }
    if (userKind == "企业") {
      userKindTag = 2;
      wx.request({
        url: 'http://localhost:81/chat/allCompanyId',
        method: 'get',
        data: {
          companyId: wx.getStorageSync('companyId')
        },
        success: function (res) {
          if (res.data) {
            that.setData({
              news: res.data
            })
            console.log(res.data);
            if (that.data.news.length >= 1) {
              that.setData({
                empty: false
              })
            } else {
              that.setData({
                empty: true
              })
            }
          }
        }
      })
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
  toChatPageS: function () {
    wx.navigateTo({
      url: '/pages/news/chat/chat',
    })
  },


  // tabBar监听点击事件
  onTabItemTap(item) {
    this.onLoad();
  },


})