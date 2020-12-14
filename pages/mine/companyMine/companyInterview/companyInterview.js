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
    //后台获取数据
    var that = this;
    wx.request({
      url: 'http://localhost:81/interview/allByCompanyId',
      method: 'GET',
      data: {
        companyId: wx.getStorageSync('companyId')
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          interview: res.data
        })
      },
    })
  },

  //跳转至职位详情页面
  toJobDetailsPage: function (e) {
    var id = e.currentTarget.dataset.jobid;
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

})