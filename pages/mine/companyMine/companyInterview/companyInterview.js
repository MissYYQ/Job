var util = require('../../../../utils/util');

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
    //获取当前日期
    var nowDateTime = util.formatDateTime(new Date());
    this.setData({
      nowDateTime: nowDateTime,
    })
  },

  toJobDetailsPage: function (e) {
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails',
    })
  },

})