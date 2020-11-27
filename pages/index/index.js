//获取应用实例
const app = getApp()

Page({
  data: {
    studentData: [{
        intentionJob: "前端开发",
        expectedSalary: "6-10K",
        school: "九江学院",
        degree: "本科",
        profession: "计算机科学与技术",
        avatar: "/images/tabBar/mine02.png",
        name: "姜先生",
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "微信小程序",
          "SpringMVC",
          "BootStrap"
        ]
      },
      {
        intentionJob: "Java开发工程师",
        expectedSalary: "8-12K",
        school: "南昌大学",
        degree: "本科",
        profession: "软件工程",
        avatar: "/images/tabBar/mine02.png",
        name: "南笙Y",
        skills: [
          "Java",
          "JavaScript",
          "SSM",
          "SpringMVC",
          "BootStrap"
        ]
      },

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var userKind = wx.getStorageSync('userKind');
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1
    }
    if (userKind == "企业") {
      userKindTag = 2
    }
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
      intentionJob: wx.getStorageSync('intentionJob'),
      userKindTag: userKindTag,
    })
    //后台获取数据
    var that = this;
    wx.request({
      url: 'http://localhost:81/job/all',
      method: 'get',
      success: function (res) {
        console.log("获取职位列表成功");
        console.log(res.data);
        that.setData({
          job: res.data,
        })
      },
    })
  },

  //搜索内容
  inputVal: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //公司-搜索
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
          console.log("搜索成功");
          console.log(res.data);
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

  //清空搜索
  clearInput: function () {
    this.setData({
      inputVal: null
    });
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


  // ===============studentIndex================

  //跳转至预览简历页面
  toPreviewResumePage: function () {
    wx.navigateTo({
      url: '/pages/mine/studentMine/resume/previewResume/previewResume',
    })
  },






})