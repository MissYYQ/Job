Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection: false //是否收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //后台获取数据
    var id = options.id;
    var that = this;
    wx.request({
      url: 'http://localhost:81/job/one',
      method: 'get',
      data: {
        id: id,
      },
      success: function (res) {
        console.log("获取职位详情成功");
        console.log(res.data);
        that.setData({
          job: res.data,
        })
        //字符串转数组
        if (that.data.job.claim) {
          var claimArr = that.data.job.claim.split("；")
          let claim = "job.claim"
          that.setData({
            [claim]: claimArr,
          })
        }
        if (that.data.job.duty) {
          var dutyArr = that.data.job.duty.split("；")
          let duty = "job.duty"
          that.setData({
            [duty]: dutyArr,
          })
        }
        if (that.data.job.company.welfare) {
          var welfareArr = that.data.job.company.welfare.split("、");
          let welfare = "job.company.welfare"
          that.setData({
            [welfare]: welfareArr,
          })
        }
        if (that.data.job.keywords) {
          var keywordsArr = that.data.job.keywords.split("、");
          let keywords = "job.keywords"
          that.setData({
            [keywords]: keywordsArr,
          })
        }
      },
      fail: function (res) {
        console.log("获取职位详情失败");
      }
    })

    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
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
    if (this.data.isWxLogin) {
      var id = this.data.job.id;
      wx.request({
        url: 'http://localhost:81/collection/collectJob',
        method: 'POST',
        data: {
          id: id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function () {
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 1200,
            mask: true
          })
        }
      })
      this.setData({
        collection: true
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
    var id = this.data.job.id;
    wx.request({
      url: 'http://localhost:81/collection/uncollectJob',
      method: 'POST',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function () {
        wx.showToast({
          title: '已取消收藏',
          icon: 'none',
          duration: 1200,
          mask: true
        })
      }
    })
    this.setData({
      collection: false
    })
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