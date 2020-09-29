var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWxLogin: null, //是否微信登录
    showLogin: true, //是否显示微信登录模态框
    userKind: '学生',
    userInfo: '',
    expect: '前端',
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
    var isWxLogin = wx.getStorageSync('isWxLogin')
    this.setData({
      isWxLogin: isWxLogin,
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  //微信登录
  wxLogin: function () {
    wx.login({
      success: res => {
        console.log("登录成功")
        app.globalData.isWxLogin = true
        wx.setStorageSync('isWxLogin', app.globalData.isWxLogin)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

      },
      fail: res => {
        console.log("登录失败")
        console.log(res)
      }
    })
    //关闭微信登录模态框
    this.setData({
      showLogin: false
    })
  },

  //关闭微信登录模态框
  close: function () {
    this.setData({
      showLogin: false
    })

  },

  //跳出登录模态框
  loginAgain: function () {
    this.setData({
      showLogin: true
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