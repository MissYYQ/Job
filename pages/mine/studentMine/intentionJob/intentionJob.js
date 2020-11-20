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
    // this.setData({
    //   intentionJob: wx.getStorageSync('intentionJob'),
    // })
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
  resetBtn: function () {
    this.setData({
      intentionJob: null
    })
    wx.setStorageSync('intentionJob', null)
  },

  //确定，跳转至首页
  editOverBtn: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },


})