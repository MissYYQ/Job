var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    communicationNum: 0, //沟通量
    interviewNum: 0, //面试量
    collectionJobNum: 0, //职位收藏量
    // 学生
    deliveryNum: 0, //已投量
    expect: null, //期望职位
    // 企业
    jobNum: 0, //职位量
    collectionUserNum: 0, //用户收藏量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1
    }
    if (userKind == "企业") {
      userKindTag = 2
    }
    that.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
      userInfo: wx.getStorageSync('userInfo'),
      userKind: wx.getStorageSync('userKind'),
      userKindTag: userKindTag,
      intentionJob: wx.getStorageSync('intentionJob'),
    })
    
    var userId = wx.getStorageSync("userInfo").id;
    if (that.data.userKindTag == 1 && that.data.isWxLogin) {
      //收藏量
      wx.request({
        url: 'http://localhost:81/collection/jobCount',
        method: 'GET',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            collectionJobNum: res.data
          })
        }
      })
      //投递量
      wx.request({
        url: 'http://localhost:81/delivery/deliveryCount',
        method: 'GET',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            deliveryNum: res.data
          })
        }
      })
    }

  },

  //微信登录
  wxLogin: function () {
    app.wxLogin();
    //直接获取到当前页面的onload()进行刷新
    this.onLoad();
  },

  //跳转至用户类型选择页面
  toUserKindPage: function () {
    wx.navigateTo({
      url: '/pages/mine/userKind/userKind',
    })
  },


  // ==========student=====================

  //跳转至简历页面
  toResumePage: function () {
    wx.navigateTo({
      url: '/pages/mine/studentMine/resume/resume',
    })
  },

  //沟通
  toNewsPage: function () {
    if (this.data.isWxLogin) {
      wx.switchTab({
        url: '/pages/news/news',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //我的简历
  toPreviewResumePage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/studentMine/resume/previewResume/previewResume',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //我的收藏
  toStudentCollectPage: function () {
    var collectionJobNum = this.data.collectionJobNum;
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/studentMine/studentCollect/studentCollect?collectionJobNum='+collectionJobNum,
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //我的投递
  toMyDeliveryPage: function () {
    var deliveryNum = this.data.deliveryNum;
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/studentMine/myDelivery/myDelivery?deliveryNum='+deliveryNum,
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //我的面试
  toMyInterviewPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/studentMine/myInterview/myInterview',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },



  // ======company=====================

  //编辑公司
  toCompanyDataPage: function () {
    wx.navigateTo({
      url: '/pages/mine/companyMine/companyData/companyData',
    })
  },

  //公司详情
  toCompanyDetailsPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/companyMine/companyData/companyDetails/companyDetails',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //职位管理
  toCompanyJobPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/companyMine/companyJob/companyJob',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //宣讲会管理
  toCompanySeminarPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/companyMine/companySeminar/companySeminar',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //待处理简历
  toDeliveryDealPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/companyMine/deliveryDeal/deliveryDeal',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //面试
  toCompanyInterviewPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/companyMine/companyInterview/companyInterview',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //公司收藏
  toCompanyCollectPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/companyMine/companyCollect/companyCollect',
      })
    } else {
      wx.showToast({
        title: '未登录！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },




  // tabBar监听点击事件
  onTabItemTap(item) {
    this.onLoad();
  },


});