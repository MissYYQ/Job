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
    this.setData({

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      intentionJob: wx.getStorageSync('intentionJob'),
    })
  },

  //编辑求职意向
  editIJ: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "intentionJob." + key;
    this.setData({
      [name]: e.detail.value
    })
    wx.setStorageSync('intentionJob', this.data.intentionJob)
  },

  //重置
  resetBtn: function() {
    this.setData({
      intentionJob: null
    })
    wx.setStorageSync('intentionJob', null)
  },

  //确定
  editOverBtn: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
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