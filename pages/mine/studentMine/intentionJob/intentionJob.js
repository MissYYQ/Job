Page({

  /**
   * 页面的初始数据
   */
  data: {
    salary: [
      "不限",
      "3K以下/月",
      "3-5K/月",
      "5-10K/月",
      "10-20K/月",
      "20-50K/月",
      "50K以上/月",
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  },

  //薪资改变
  bindSalaryChange: function (e) {
    this.setData({
      ['intentionJob.salary']: this.data.salary[e.detail.value]
    })
  },

  //取消
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  //确定
  determine: function () {
    var that = this;
    var intentionJob = this.data.intentionJob;
    wx.request({
      url: 'http://localhost:81/intention/edit',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userInfo').id,
        intentionJob: JSON.stringify(intentionJob)
      },
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data) {
          wx.setStorageSync('intentionJob', that.data.intentionJob);
          // 返回上一页
          var pages = getCurrentPages();
          var beforePage = pages[pages.length - 2];
          beforePage.onLoad();
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },


})