Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:81/jobstrategy/all',
      method: 'GET',
      success: function (res) {
        that.setData({
          jobstrategy: res.data
        })
        //字符串转数组
        for (var i = 0; i < that.data.jobstrategy.length; i++) {
          var contentArr = that.data.jobstrategy[i].content.split("。")
          let content = "jobstrategy["+i+"].content"
          that.setData({
            [content]: contentArr,
          })
        }
      }
    })
  },


  //标签栏点击切换页面时的监听函数
  changeItem: function (e) {
    this.setData({
      item: e.currentTarget.dataset.item
    })
  },



})