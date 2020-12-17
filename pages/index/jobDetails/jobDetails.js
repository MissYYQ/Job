var util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取用户类型
    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1
    }
    if (userKind == "企业") {
      userKindTag = 2
    }
    that.setData({
      userKindTag: userKindTag
    })
    //职位详情数据
    var id = options.id;
    wx.request({
      url: 'http://localhost:81/job/one',
      method: 'get',
      data: {
        id: id,
      },
      success: function (res) {
        that.setData({
          job: res.data
        })
        wx.setNavigationBarTitle({
          title:  that.data.job.name
        })
        //数据处理
        if (that.data.job.claim) {
          var claimArr = that.data.job.claim.split("；")
          that.setData({
            ['job.claim']: claimArr,
          })
        }
        if (that.data.job.duty) {
          var dutyArr = that.data.job.duty.split("；")
          that.setData({
            ['job.duty']: dutyArr,
          })
        }
        if (that.data.job.company.welfare) {
          var welfareArr = that.data.job.company.welfare.split("、");
          that.setData({
            ['job.company.welfare']: welfareArr,
          })
        }
        if (that.data.job.keywords) {
          var keywordsArr = that.data.job.keywords.split("、");
          that.setData({
            ['job.keywords']: keywordsArr,
          })
        }
        var userId = wx.getStorageSync("userInfo").id;
        var jobId = that.data.job.id;
        //是否收藏
        wx.request({
          url: 'http://localhost:81/collection/jobIsCollection',
          method: 'GET',
          data: {
            userId: userId,
            jobId: jobId
          },
          success: function (res) {
            that.setData({
              collection: res.data
            })
          }
        })
        //是否投递
        wx.request({
          url: 'http://localhost:81/delivery/isDelivery',
          method: 'GET',
          data: {
            userId: userId,
            jobId: jobId
          },
          success: function (res) {
            that.setData({
              delivery:res.data
            })
          }
        })
      },
    })
    //是否登录&&获取用户id
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
      userId: wx.getStorageSync("userInfo").id
    })
  },

  //跳转至公司页面
  toCompanyPage: function () {
    var id = this.data.job.companyId;
    //预览量加一
    wx.request({
      url: 'http://localhost:81/company/addPageviews',
      method: 'post',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    wx.navigateTo({
      url: '/pages/mine/companyMine/companyData/companyDetails/companyDetails?id=' + id,
    })
  },

  // 收藏
  collection: function () {
    var that = this;
    if (this.data.isWxLogin) {
      var userId = this.data.userId;
      var jobId = this.data.job.id;
      wx.request({
        url: 'http://localhost:81/collection/collectJob',
        method: 'POST',
        data: {
          userId: userId,
          jobId: jobId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if (res.data) {
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 1200,
              mask: true
            })
            that.setData({
              collection: true
            })
          }
        }
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

  // 取消收藏
  uncollection: function () {
    var that = this;
    var userId = this.data.userId;
    var jobId = this.data.job.id;
    wx.request({
      url: 'http://localhost:81/collection/uncollectJob',
      method: 'POST',
      data: {
        userId: userId,
        jobId: jobId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (!res.data) {
          wx.showToast({
            title: '已取消收藏',
            icon: 'none',
            duration: 1200,
            mask: true
          })
          that.setData({
            collection: false
          })
        }
      }
    })
  },

  //投递
  delivery: function () {
    var that = this;
    if (this.data.isWxLogin) {
      var userId = this.data.userId;
      var jobId = this.data.job.id;
      var deliveryTime = util.formatDateTime(new Date());
      wx.request({
        url: 'http://localhost:81/delivery/deliveryJob',
        method: 'POST',
        data: {
          userId: userId,
          jobId: jobId,
          deliveryTime: deliveryTime
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if (res.data) {
            wx.showToast({
              title: '投递成功',
              icon: 'none',
              duration: 1200,
              mask: true
            })
            that.setData({
              delivery: true
            })
          }
        }
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

  //跳转至聊天页面
  toChatPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/news/chat/chat',
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

})