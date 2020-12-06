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
    var that = this;
    var collectionJobNum = options.collectionJobNum;
    var userId = wx.getStorageSync('userInfo').id;
    if (collectionJobNum > 0) {
      wx.request({
        url: 'http://localhost:81/job/collectJob',
        method: 'GET',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            job: res.data
          })
        },
      })
    }
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



})