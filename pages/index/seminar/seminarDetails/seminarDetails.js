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
    //后台获取数据
    var id = options.id;
    var that = this;
    wx.request({
      url: 'http://localhost:81/seminar/one',
      method: 'get',
      data: {
        id: id,
      },
      success: function (res) {
        that.setData({
          seminar: res.data,
        })
        wx.setNavigationBarTitle({
          title: that.data.seminar.company.name+"宣讲会"
        })
        //数据加工
        if (that.data.seminar.company.welfare) {
          var welfareArr = that.data.seminar.company.welfare.split("、");
          let welfare = "seminar.company.welfare"
          that.setData({
            [welfare]: welfareArr,
          })
        }
        //获取在招职位
        var companyId = that.data.seminar.companyId;
        wx.request({
          url: 'http://localhost:81/job/jobForCompany',
          method: 'get',
          data: {
            id: companyId
          },
          success: function (res) {
            that.setData({
              job: res.data,
            })
          },
        })
      },
    })
  },


  toJobDetailsPage: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails?id=' + id,
    })
  },


})