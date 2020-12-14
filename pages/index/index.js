//获取应用实例
const app = getApp()

Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var userKind = wx.getStorageSync('userKind');
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1;
      //后台获取数据
      wx.request({
        url: 'http://localhost:81/job/all',
        method: 'get',
        success: function (res) {
          that.setData({
            job: res.data,
          })
        },
      })
    }
    if (userKind == "企业") {
      userKindTag = 2;
      //后台获取数据
      wx.request({
        url: 'http://localhost:81/student/all',
        method: 'get',
        success: function (res) {
          that.setData({
            student: res.data
          })
          //数据处理
          for (var i = 0; i < that.data.student.length; i++) {
            if (that.data.student[i].skills) {
              var skills = that.data.student[i].skills.split("、");
              let student = "student[" + i + "].skills";
              that.setData({
                [student]: skills
              })
            }
            if (that.data.student[i].education) {
              var education = that.data.student[i].education.split("、");
              let school = "student[" + i + "].education.school";
              let profession = "student[" + i + "].education.profession";
              let degree = "student[" + i + "].education.degree";
              that.setData({
                [school]: education[0],
                [profession]: education[1],
                [degree]: education[2]
              })
            }
          }
        },
      })
    }
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
      intentionJob: wx.getStorageSync('intentionJob'),
      userKindTag: userKindTag,
    })
  },

  //搜索内容
  inputVal: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  // ================学生端==============

  //搜索-学生端
  search: function () {
    var key = this.data.inputVal
    if (key != "") {
      //后台获取数据
      var that = this;
      wx.request({
        url: 'http://localhost:81/job/search',
        method: 'get',
        data: {
          key: key
        },
        success: function (res) {
          that.setData({
            job: res.data,
          })
        },
      })
    } else {
      wx.showToast({
        title: '搜索内容不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }

  },

  //跳转至热门公司页面
  toHotCompanyPage: function () {
    wx.navigateTo({
      url: '/pages/index/hotCompany/hotCompany',
    })
  },

  //跳转至热门职位页面
  toHotJobPage: function () {
    wx.navigateTo({
      url: '/pages/index/hotJob/hotJob',
    })
  },

  //跳转至宣讲会页面
  toSeminarPage: function (e) {
    wx.navigateTo({
      url: '/pages/index/seminar/seminar',
    })
  },

  //跳转至求职攻略页面
  toJobStrategyPage: function () {
    wx.navigateTo({
      url: '/pages/index/jobStrategy/jobStrategy',
    })
  },

  //跳转至职位详情页面
  toJobDetailsPage: function (e) {
    var id = e.currentTarget.dataset.id;
    //预览量加一
    wx.request({
      url: 'http://localhost:81/job/addPageviews',
      method: 'post',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails?id=' + id
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


  // ===============企业端================


  //搜索-企业端
  searchBtn: function () {
    var key = this.data.inputVal
    if (key != "") {
      //后台获取数据
      var that = this;
      wx.request({
        url: 'http://localhost:81/student/search',
        method: 'get',
        data: {
          key: key
        },
        success: function (res) {
          that.setData({
            student: res.data
          })
          //数据处理
          for (var i = 0; i < that.data.student.length; i++) {
            if (that.data.student[i].skills) {
              var skills = that.data.student[i].skills.split("、");
              let student = "student[" + i + "].skills";
              that.setData({
                [student]: skills
              })
            }
            if (that.data.student[i].education) {
              var education = that.data.student[i].education.split("、");
              let school = "student[" + i + "].education.school";
              let profession = "student[" + i + "].education.profession";
              let degree = "student[" + i + "].education.degree";
              that.setData({
                [school]: education[0],
                [profession]: education[1],
                [degree]: education[2]
              })
            }
          }
        },
      })
    } else {
      wx.showToast({
        title: '搜索内容不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }

  },

  //跳转至预览简历页面
  toPreviewResumePage: function (e) {
    var userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/mine/studentMine/resume/previewResume/previewResume?userId=' + userId,
    })
  },






})