Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    region: '', // 城市  [市，省，县]
    jobData: [{
        name: "前端开发",
        salary: "6-10K",
        education: "本科",
        experience: "1-3年",
        city: "杭州",
        companyName: "云程科技",
        companySize: "20-99人",
        financingStage: "B轮",
        ecruiterImgUrl: "/images/tabBar/mine02.png",
        ecruiterName: "姜先生",
        kind: 1
      },
      {
        name: "前端开发工程师",
        salary: "5-8K",
        education: "大专",
        experience: "经验不限",
        city: "北京",
        companyName: "蓝凌叮当云",
        companySize: "100-499人",
        financingStage: "未融资",
        ecruiterImgUrl: "/images/tabBar/mine02.png",
        ecruiterName: "林慧慧",
        kind: 2
      },
    ],
    companyData: [
      {
        name: "云程科技",
        src: '/images/jobDetails/company.png',
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

  //标签栏点击切换页面时的监听函数
  changeItem: function (e) {
    this.setData({
      item: e.currentTarget.dataset.item
    })
  },

  //滑动滑块切换页面时的监听函数
  changeTab: function (e) {
    console.log(e.detail)
    this.setData({
      tab: e.detail.current
    })
  },

  //跳转至公司页面
  toCompanyPage: function() {
    wx.navigateTo({
      url: '../mine/company/company',
    })
  },

  //跳转至职位详情页面
  toJobDetailsPage: function () {
    wx.navigateTo({
      url: '../index/jobDetails/jobDetails'
    })
  },

  //跳转至职位详情页面
  toJobDetailsPage: function () {
    wx.navigateTo({
      url: '../index/jobDetails/jobDetails'
    })
  },

    //城市切换
    bindRegionChange: function (e) {
      console.log(e.detail.value)
      var city = e.detail.value[1] //市名
      city = city.substring(0, city.length - 1) //去掉市
      console.log(city)
      this.setData({
        region: city
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var city = wx.getStorageSync('city')
    this.setData({
      region: city
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