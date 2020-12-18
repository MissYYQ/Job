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
    var nowDate = util.formatDate(new Date());
    var nowTime = util.formatTime(new Date());
    this.setData({
      nowDate: nowDate,
      nowTime: nowTime,
    })
    var that = this;
    var userId = wx.getStorageSync('userInfo').id;
    wx.request({
      url: 'http://localhost:81/interview/allByUserId',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          interview: res.data
        })
        if (that.data.interview.length >= 1) {
          that.setData({
            empty: false
          })
        } else {
          that.setData({
            empty: true
          })
        }
      },
    })
  },

  //跳转至职位详情页面
  toJobDetailsPage: function (e) {
    var id = e.currentTarget.dataset.id;
    //预览量加一
    wx.request({
      url: 'http://localhost:81/job/addPageviews',
      method: 'post',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails?id=' + id
    })
  },

  //接受
  accept: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:81/delivery/accept',
      method: 'GET',
      data: {
        id: id
      },
      success: function (res) {
        if (res.data) {
          wx.showToast({
            title: '您已接受面试邀请，请及时赴约',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          //刷新当前页
          var pages = getCurrentPages();
          var beforePage = pages[pages.length - 1];
          beforePage.onLoad();
        }
      }
    })
  },

  //拒绝
  refuse: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:81/delivery/refuse',
      method: 'GET',
      data: {
        id: id
      },
      success: function (res) {
        if (res.data) {
          wx.showToast({
            title: '您已拒绝面试邀请！',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          //刷新当前页
          var pages = getCurrentPages();
          var beforePage = pages[pages.length - 1];
          beforePage.onLoad();
        }
      }
    })
  },

})