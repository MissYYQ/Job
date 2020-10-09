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
    })
    var userKind = wx.getStorageSync('userKind')
    if(userKind === 0){
      wx.navigateTo({
        url: '/pages/mine/resume/resume',
      })
    } 
    if( userKind === 1) {
      wx.navigateTo({
        url: '/pages/mine/companyData/companyData',
      })
    }
  },

  // 跳转到公司数据页面
  toCompanyDataPage: function() {
    wx.setStorageSync('userKind', 1)
    app.globalData.userKind = 1
    console.log("userKind.js====app.globalData.userKind：",app.globalData.userKind)
    wx.navigateTo({
      url: '/pages/mine/companyData/companyData',
    })
  },

    // 跳转到简历页面
    toResumePage: function() {
      wx.setStorageSync('userKind', 0)
      app.globalData.userKind = 0
      console.log("userKind.js====app.globalData.userKind：",app.globalData.userKind)
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