var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    expect: null //学生-期望职位
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
      //沟通量
      wx.request({
        url: 'http://localhost:81/student/one',
        method: 'GET',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            studentId: res.data.id
          })
          wx.setStorageSync('studentId', that.data.studentId)
          wx.request({
            url: 'http://localhost:81/chat/countStudentId',
            method: 'GET',
            data: {
              studentId: that.data.studentId
            },
            success: function (res) {
              that.setData({
                communicationNum: res.data
              })
            }
          })
        }
      })
      //收藏量
      wx.request({
        url: 'http://localhost:81/collection/jobCount',
        method: 'GET',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            collectionNum: res.data
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
      //面试量
      wx.request({
        url: 'http://localhost:81/interview/interviewCount',
        method: 'GET',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            interviewNum: res.data
          })
        }
      })
    }
    if (that.data.userKindTag == 2 && that.data.isWxLogin) {
      //company
      var userId = wx.getStorageSync('userInfo').id;
      wx.request({
        url: 'http://localhost:81/company/oneByUserId',
        method: 'GET',
        data: {
          userId: userId
        },
        success: function (res) {
          that.setData({
            company: res.data
          })
          var companyId = that.data.company.id;
          wx.setStorageSync('companyId', companyId)
          //沟通量
          wx.request({
            url: 'http://localhost:81/caht/countCompanyId',
            method: 'GET',
            data: {
              companyId: companyId
            },
            success: function (res) {
              that.setData({
                communicationNum: res.data
              })
            }
          })
          //面试量
          wx.request({
            url: 'http://localhost:81/interview/countByCompanyId',
            method: 'GET',
            data: {
              companyId: companyId
            },
            success: function (res) {
              that.setData({
                interviewNum: res.data
              })
            }
          })
          //职位量
          wx.request({
            url: 'http://localhost:81/job/countByCompanyId',
            method: 'GET',
            data: {
              companyId: companyId
            },
            success: function (res) {
              that.setData({
                jobNum: res.data
              })
            }
          })
          //收藏量
          wx.request({
            url: 'http://localhost:81/collection/userCount',
            method: 'GET',
            data: {
              companyId: companyId
            },
            success: function (res) {
              that.setData({
                collectionNum: res.data
              })
            }
          })
        }
      })

    }

  },

  //微信登录
  wxLogin: function () {
    app.wxLogin();
    //直接获取到当前页面的onload()进行刷新
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    currentPage.onLoad();
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
    var userId = this.data.userInfo.id;
    wx.navigateTo({
      url: '/pages/mine/studentMine/resume/resume?userId=' + userId,
    })
  },

  //跳转至求职期望页面
  toIntentionJobPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/studentMine/intentionJob/intentionJob',
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
      var userId = this.data.userInfo.id;
      wx.navigateTo({
        url: '/pages/mine/studentMine/resume/previewResume/previewResume?userId=' + userId,
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
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/studentMine/studentCollect/studentCollect',
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
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/studentMine/myDelivery/myDelivery',
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
    var id = this.data.company.id;
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/mine/companyMine/companyData/companyDetails/companyDetails?id=' + id,
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