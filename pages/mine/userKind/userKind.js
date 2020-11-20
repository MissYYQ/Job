var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userKind: wx.getStorageSync('userKind')
    });
  },

  // 跳转到首页
  toIndexPage: function (e) {
    wx.setStorageSync('userKind', "学生");
    app.globalData.userKind = "学生";
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  //跳转到公司数据页面
  toCompanyDataPage: function () {
    wx.setStorageSync('userKind', "企业");
    app.globalData.userKind = "企业";
    wx.navigateTo({
      url: '/pages/mine/companyMine/companyData/companyData',
    })
  },


  
})