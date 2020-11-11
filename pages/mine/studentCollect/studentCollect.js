Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobData: [{
        name: "前端开发",
        salary: "6-10K",
        degree: "本科",
        experience: "1-3年",
        companyName: "云程科技",
        industry: "计算机软件",
        companySize: "20-99人",
        financingStage: "B轮",
        logoImgUrl: "/images/index/hotCompany.png",
        kind: 0
      },
      {
        name: "前端开发",
        salary: "6-10K",
        degree: "本科",
        experience: "1-3年",
        companyName: "云程科技",
        industry: "计算机软件",
        companySize: "20-99人",
        financingStage: "B轮",
        logoImgUrl: "/images/index/hotCompany.png",
        kind: 0
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //跳转至职位详情页面
  toJobDetailsPage: function () {
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails',
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