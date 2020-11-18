var util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    seminar: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前日期
    var nowDate = util.formatDate(new Date());
    this.setData({
      nowDate: nowDate,
    })
  },

  //添加宣讲会
  addSeminar: function () {
    var key = e.currentTarget.dataset.key;
    let name = "seminar." + key;
    this.setData({
      [name]: e.detail.value
    });
    wx.setStorageSync('seminar', this.data.seminar);
  },

  //日期picker改变
  dateChange: function (e) {
    let date = "seminar.date"
    this.setData({
      [date]: e.detail.value,
    })
    wx.setStorageSync('seminar', this.data.seminar)
  },

  //时间picker改变
  timeChange: function (e) {
    let time = "seminar.time"
    this.setData({
      [time]: e.detail.value
    })
    wx.setStorageSync('seminar', this.data.seminar)
  },

  //取消
  cancelBtn: function () {
    this.setData({
      seminar: {},
    })
    wx.setStorageSync('seminar', this.data.seminar)
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },

  //确定
  determineBtn: function () {
    //判空
    let seminar = this.data.seminar;
    if (seminar.school == null) {
      wx.showToast({
        title: '学校不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (seminar.location == null) {
      wx.showToast({
        title: '地点不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (seminar.email == null) {
      wx.showToast({
        title: '投递邮箱不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (seminar.date == null) {
      wx.showToast({
        title: '截止日期不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      //清空数据
      this.setData({
        seminar: {},
      })
      wx.setStorageSync('seminar', this.data.seminar)
      //跳转
      wx.redirectTo({
        url: '/pages/mine/mine',
      })
    }
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