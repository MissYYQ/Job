var util = require('../../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    interview: [{
        jobName: "前端开发工程师",
        companyName: "云程科技",
        datetime: "2020/11/29  9:30",
        location: "江西省九江市濂溪区前进东路551号九江学院文友楼608",
      },
      {
        jobName: "前端开发工程师",
        companyName: "云程科技",
        datetime: "2020/11/21  9:30",
        location: "江西省九江市濂溪区前进东路551号九江学院文友楼608",
      },
    ]
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
    console.log(this.data.nowDateTime)
  },

  toJobDetailsPage: function () {
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails',
    })
  },

})