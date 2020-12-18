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
    //后台获取数据
    var userId = options.userId;
    that.setData({
      userId: userId
    })
    //student
    wx.request({
      url: 'http://localhost:81/student/one',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          resume: res.data
        })
        wx.setNavigationBarTitle({
          title: that.data.resume.name
        })
        //数据处理
        if (that.data.resume.skills) {
          var skillsArr = that.data.resume.skills.split("、")
          that.setData({
            ['resume.skills']: skillsArr,
          })
        }
        if (that.data.resume.honor) {
          var honorArr = that.data.resume.honor.split("、")
          that.setData({
            ['resume.honor']: honorArr
          })
        }
        var educationArr = that.data.resume.education.split("、");
        var school = educationArr[0];
        var profession = educationArr[1];
        var degree = educationArr[2];
        that.setData({
          ['resume.education.school']: school,
          ['resume.education.profession']: profession,
          ['resume.education.degree']: degree
        })
      }
    })
    //intentionJob
    wx.request({
      url: 'http://localhost:81/intention/one',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          intentionJob: res.data,
        })
      }
    })
    //resumefile
    wx.request({
      url: 'http://localhost:81/resumefile/one',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          resumeFile: res.data,
        })
      }
    })
    //experience
    wx.request({
      url: 'http://localhost:81/experience/allByUser',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          experience: res.data,
        })
      }
    })
    //是否收藏
    wx.request({
      url: 'http://localhost:81/collection/userIsCollection',
      method: 'GET',
      data: {
        userId: userId,
        companyId: wx.getStorageSync('companyId')
      },
      success: function (res) {
        that.setData({
          collection: res.data
        })
      }
    })

  },

  //跳转至聊天页面
  toChatPage: function () {
    if (wx.getStorageSync('isWxLogin')) {
      var studentId = this.data.resume.id;
      wx.navigateTo({
        url: '/pages/news/chat/chat?studentId='+studentId,
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


  // 收藏
  collection: function () {
    var that = this;
    if (wx.getStorageSync('isWxLogin')) {
      var userId = this.data.userId;
      wx.request({
        url: 'http://localhost:81/collection/collectUser',
        method: 'POST',
        data: {
          userId: userId,
          companyId: wx.getStorageSync('companyId')
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
    wx.request({
      url: 'http://localhost:81/collection/uncollectUser',
      method: 'POST',
      data: {
        userId: userId,
        companyId: wx.getStorageSync('companyId')
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



})