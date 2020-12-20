var app = getApp();

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
    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1;
      wx.request({
        url: 'http://localhost:81/news/allStudentId',
        method: 'get',
        data: {
          studentId: wx.getStorageSync('studentId')
        },
        success: function (res) {
          if (res.data) {
            that.setData({
              news: res.data
            })
            console.log(res.data);
            if (that.data.news.length >= 1) {
              that.setData({
                empty: false
              })
            } else {
              that.setData({
                empty: true
              })
            }
          }
        }
      })
    }
    if (userKind == "企业") {
      userKindTag = 2;
      wx.request({
        url: 'http://localhost:81/news/allCompanyId',
        method: 'get',
        data: {
          companyId: wx.getStorageSync('companyId')
        },
        success: function (res) {
          if (res.data) {
            that.setData({
              news: res.data
            })
            console.log(res.data);
            if (that.data.news.length >= 1) {
              that.setData({
                empty: false
              })
            } else {
              that.setData({
                empty: true
              })
            }
            //数据处理
            if (that.data.news.length >= 1) {
              for (var i = 0; i < that.data.news.length; i++) {
                var education = that.data.news[i].student.education.split("、");
                let school = "news[" + i + "].student.education.school";
                let profession = "news[" + i + "].student.education.profession";
                let degree = "news[" + i + "].student.education.degree";
                that.setData({
                  [school]: education[0],
                  [profession]: education[1],
                  [degree]: education[2]
                })
              }
            }
          }
        }
      })
    }
    this.setData({
      isWxLogin: app.globalData.isWxLogin,
      userKindTag: userKindTag,
    })
  },

  //微信登录
  wxLogin: function () {
    app.wxLogin();
    //直接获取到当前页面的onload()进行刷新
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    currentPage.onLoad();
  },

  // 学生端-跳转至交流页面
  sToChatPage: function (e) {
    var jobId = e.currentTarget.dataset.jobid;
    var companyId = e.currentTarget.dataset.companyid;
    wx.navigateTo({
      url: '/pages/news/chat/chat?companyId=' + companyId + '&jobId=' + jobId,
    })
  },

  // 企业端-跳转至交流页面
  cToChatPage: function (e) {
    var studentId = e.currentTarget.dataset.studentid;
    wx.navigateTo({
      url: '/pages/news/chat/chat?studentId=' + studentId,
    })
  },


  // tabBar监听点击事件
  onTabItemTap(item) {
    this.onLoad();
  },


})