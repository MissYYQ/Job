Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorites: false //是否收藏
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
        console.log(res);
        that.setData({
          job: res.data,
          claim: res.data.claim,
          duty: res.data.duty
        })
        //字符串转数组
        if (that.data.claim) {
          var claim = that.data.claim;
          var claimArr = claim.split("；")
          that.setData({
            claim: claimArr,
          })
        }
        if (that.data.duty) {
          var duty = that.data.duty;
          var dutyArr = duty.split("；")
          that.setData({
            duty: dutyArr,
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
    wx.navigateTo({
      url: '/pages/mine/companyMine/companyData/companyDetails/companyDetails?id='+id,
    })
  },

  // 收藏/取消收藏
  favorites: function () {
    if (this.data.isWxLogin) {
      this.setData({
        favorites: !this.data.favorites
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