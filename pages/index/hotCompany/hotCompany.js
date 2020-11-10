Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyData: [{
        name: "云程科技",
        src: '/images/jobDetails/company.png',
        industry: "计算机软件",
        size: "20-99人",
        financingStage: "B轮",
        address: "××省××市××县（区）××",
        treatment: [
          "五险一金",
          "年终奖",
          "全勤奖",
        ],
      },
      {
        name: "云程科技",
        src: '/images/jobDetails/company.png',
        industry: "计算机软件",
        size: "20-99人",
        financingStage: "B轮",
        address: "××省××市××县（区）××",
        treatment: [
          "五险一金",
          "年终奖",
          "全勤奖",
        ],
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //跳转至公司详情页面
  toCompanyPage:function(){
    wx.navigateTo({
      url: '/pages/index/companyDetails/companyDetails',
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})