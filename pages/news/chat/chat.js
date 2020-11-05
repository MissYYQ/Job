Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    isMore: false,
    userName:"南笙Y",
    companyName: "云程科技",
    job: "前端开发工程师",
    studentAvatar: "/images/news/person01.png",
    companyAvatar: '/images/news/person02.png',
    msg:[
      {
        userKind: "0",
        msg: "希望了解一下贵公司福利"
      },
      {
        userKind: "1",
        msg: "根据个人技术实力，实习生这块是采用日薪的，要求本科，150-200元/日"
      },
      {
        userKind: "0",
        msg: "贵公司招聘截止日期是什么时候？"
      },
      {
        userKind: "1",
        msg: "十一月中旬"
      },
      {
        userKind: "0",
        msg: "希望了解一下贵公司福利"
      },
      {
        userKind: "1",
        msg: "根据个人技术实力，实习生这块是采用日薪的，要求本科，150-200元/日"
      },
      {
        userKind: "0",
        msg: "贵公司招聘截止日期是什么时候？"
      },
      {
        userKind: "1",
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
    var length = this.data.msg.length;
    let lastId = 'msg'+ length;
    this.setData({
      userKindTag: userKindTag,
      userKind: userKind,
      height: wx.getSystemInfoSync().windowHeight-55,
      lastId: lastId
    })
  },

  //输入消息
  inputMsg:function(e) {
    this.setData({
      inputMsg: e.detail.value
    })
  },

  // 更多
  more: function(){
    var isMore = this.data.isMore
    this.setData({
      isMore: !isMore,
      height: wx.getSystemInfoSync().windowHeight-160,
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