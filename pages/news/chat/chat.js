Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"南笙Y",
    companyName: "云程科技",
    job: "前端开发工程师",
    studentAvatar: "/images/news/person01.png",
    companyAvatar: '/images/news/person02.png',
    msg:[
      {
        userKind: "学生",
        msg: "希望了解一下贵公司福利"
      },
      {
        userKind: "学生",
        msg: "贵公司招聘截止日期是什么时候？"
      },
      {
        userKind: "企业",
        msg: "根据个人技术实力，实习生这块是采用日薪的，要求本科，150-200"
      },
      {
        userKind: "企业",
        msg: "十一月中旬"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1
    }
    if (userKind == "企业") {
      userKindTag = 2
    }
    this.setData({
      userKindTag: userKindTag,
      userKind: userKind,
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