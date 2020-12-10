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

  },

  // student
  student: function (e) {
    wx.setStorageSync('userKind', "学生");
    app.globalData.userKind = "学生";
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  //company
  company: function () {
    wx.setStorageSync('userKind', "企业");
    app.globalData.userKind = "企业";
    var userId = wx.getStorageSync('userInfo').id;
    wx.request({
      url: 'http://localhost:81/company/oneByUserId',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        if (res.data) {
          //跳转至首页
          wx.reLaunch({
            url: '/pages/index/index',
          })
        } else {
          //跳转至companyData页面
          wx.navigateTo({
            url: '/pages/mine/companyMine/companyData/companyData',
          })
        }
      }
    })
  },



})