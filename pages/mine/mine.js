var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWxLogin: null, 
    userKind: null,
    userInfo: null,
    expect: null,
    communicationNum: 0,
    interviewNum: 0,
    deliveryNum: 0,
    favoritesNum: 0,
    myMsg: [
      {
        imgUrl: '/images/mine/jianli.png',
        name: '简历'
      },
      {
        imgUrl: '/images/mine/shoucang.png',
        name: '收藏'
      },
      {
        imgUrl: '/images/mine/bishi.png',
        name: '笔试'
      },
      {
        imgUrl: '/images/mine/mianshi.png',
        name: '面试'
      },
      {
        imgUrl: '/images/mine/peixun.png',
        name: '培训'
      },
      {
        imgUrl: '/images/mine/shezhi.png',
        name: '设置'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if(userKind == "学生"){
      userKindTag = 1
    }
    if(userKind == "企业"){
      userKindTag = 2
    }
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
      userInfo: wx.getStorageSync('userInfo'),
      userKind: wx.getStorageSync('userKind'),
      userKindTag: userKindTag,
      intentionJob: wx.getStorageSync('intentionJob'),
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


});