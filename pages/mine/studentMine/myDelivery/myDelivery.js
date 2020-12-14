Page({

  /**
   * 页面的初始数据
   */
  data: {
    //1-投递、2-通过、3-面试、4-接受、5-拒绝、6-未通过
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userId = wx.getStorageSync('userInfo').id;
    wx.request({
      url: 'http://localhost:81/job/deliveryJob',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          deliveryJob: res.data
        })
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

})