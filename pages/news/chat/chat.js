Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestResume: false,
    isMore: false,
    userName: "南笙Y",
    companyName: "云程科技",
    job: "前端开发工程师",
    studentAvatar: "/images/news/person01.png",
    companyAvatar: '/images/news/person02.png',
    msg: [{
        userKind: "0",
        msg: "希望了解一下贵公司福利",
        requestResume: false,
        requestAgree: false,
        sendResume: false,
        sendAgree: false,
      },
      {
        userKind: "1",
        msg: "根据个人技术实力，实习生这块是采用日薪的，要求本科，150-200元/日",
        requestResume: false,
        requestAgree: false,
        sendResume: false,
        sendAgree: false,
      },
      {
        userKind: "0",
        msg: "贵公司招聘截止日期是什么时候？",
        requestResume: false,
        requestAgree: false,
        sendResume: false,
        sendAgree: false,
      },
      {
        userKind: "1",
        msg: "十一月中旬",
        requestResume: false,
        requestAgree: false,
        sendResume: false,
        sendAgree: false,
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
      userKindTag = 0
    }
    if (userKind == "企业") {
      userKindTag = 1
    }
    var length = this.data.msg.length;
    let lastId = 'msg' + length;
    this.setData({
      userKindTag: userKindTag,
      userKind: userKind,
      resumeFile: wx.getStorageSync('resumeFile'),
      height: wx.getSystemInfoSync().windowHeight - 55,
      lastId: lastId
    })
  },

  //输入消息
  inputMsg: function (e) {
    this.setData({
      inputMsg: e.detail.value
    })
  },

  //发送消息
  sendBtn: function () {
    let newMsg = {};
    if (this.userKindTag == 1) {
      newMsg.userKind = 1;
    } else {
      newMsg.userKind = 0; //学生版
    }
    newMsg.msg = this.data.inputMsg;
    var msg = this.data.msg;
    var length = msg.length;
    var tag = [];
    for (var i = 0; i < length; i++) {
      tag[i] = msg[i];
    }
    tag[length] = newMsg;
    //消息重定位
    var length = this.data.msg.length;
    let lastId = 'msg' + length;
    this.setData({
      msg: tag,
      inputMsg: null,
      lastId: lastId
    })
  },

  // 更多
  more: function () {
    var isMore = this.data.isMore;
    this.setData({
      isMore: !isMore,
    })
    //消息重定位
    var length = this.data.msg.length;
    let lastId = 'msg' + length;
    var height
    if (this.data.isMore) {
      height = wx.getSystemInfoSync().windowHeight - 158
    } else {
      height = wx.getSystemInfoSync().windowHeight - 55
    }
    this.setData({
      height: height,
      lastId: lastId,
    })

  },

  //企业-请求简历
  requestResume: function (e) {
    console.log(e)
    let newMsg = {};
    newMsg.userKind = 1;
    newMsg.requestResume = true;
    var msg = this.data.msg;
    var length = msg.length;
    var tag = [];
    for (var i = 0; i < length; i++) {
      tag[i] = msg[i];
    }
    tag[length] = newMsg;
    //消息重定位
    var length = this.data.msg.length;
    let lastId = 'msg' + length;
    this.setData({
      msg: tag,
      inputMsg: null,
      lastId: lastId
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