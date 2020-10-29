var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userKind: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userKind: app.globalData.userKind
    });
    var userKind = wx.getStorageSync('userKind');
    var isWxLogin = wx.getStorageSync('isWxLogin');
    if (userKind == "学生" && isWxLogin) { //学生，已登录
      wx.navigateTo({
        url: '/pages/mine/resume/resume',
      });
    }
    if (userKind == "企业" && isWxLogin) { //企业，已登录
      wx.navigateTo({
        url: '/pages/mine/companyData/companyData',
      });
    }
    if (userKind == "学生" && !isWxLogin) { //学生，未登录
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }
    if (userKind == "企业" && !isWxLogin) { //企业，未登录
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }
  },

  // 跳转到公司数据页面
  toCompanyDataPage: function () {
    wx.setStorageSync('userKind', "企业");
    app.globalData.userKind = "企业";
    wx.navigateTo({
      url: '/pages/mine/companyData/companyData',
    });
  },

  // 跳转到简历页面
  toResumePage: function () {
    wx.setStorageSync('userKind', "学生")
    app.globalData.userKind = "学生"
    console.log("userKind.js====app.globalData.userKind：", app.globalData.userKind)
    wx.navigateTo({
      url: '/pages/mine/resume/resume',
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