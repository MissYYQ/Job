//获取应用实例
const app = getApp()

Page({
  data: {
    jobData: [{
        name: "前端开发",
        salary: "6-10K",
        education: "本科",
        experience: "1-3年",
        city: "杭州",
        companyName: "云程科技",
        industry: "计算机软件",
        companySize: "20-99人",
        financingStage: "B轮",
        logoImgUrl: "/images/tabBar/mine02.png",
        ecruiterName: "姜先生",
        kind: 0
      },
      {
        name: "前端开发工程师",
        salary: "5-8K",
        education: "大专",
        experience: "经验不限",
        city: "北京",
        companyName: "蓝凌叮当云",
        industry: "信息安全",
        companySize: "100-499人",
        financingStage: "未融资",
        logoImgUrl: "/images/tabBar/mine02.png",
        kind: 1
      },
    ],
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

  //跳转至搜索页面
  toSearchPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/index/search/search'
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

  //跳转至职位详情页面
  toJobDetailsPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '../index/jobDetails/jobDetails'
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

  //跳转至求职期望页面
  toIntentionJobPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/index/intentionJob/intentionJob',
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

  //跳转至预览简历页面
  toPreviewResumePage: function () {
    wx.navigateTo({
      url: '/pages/mine/previewResume/previewResume',
    })
  },

  // 学历筛选
  chooseEducation: function (e) {
    var index = e.currentTarget.dataset.index
    var chooseEducation = this.data.education[index]
    console.log(chooseEducation)
    this.setData({
      chooseEducation: chooseEducation,
      educationIndex: index
    })
  },

  // 薪资筛选
  chooseSalary: function (e) {
    var index = e.currentTarget.dataset.index
    var chooseSalary = this.data.salary[index]
    console.log(chooseSalary)
    this.setData({
      chooseSalary: chooseSalary,
      salaryIndex: index
    })
  },

  // 经验筛选
  chooseExperience: function (e) {
    var index = e.currentTarget.dataset.index
    var chooseExperience = this.data.experience[index]
    console.log(chooseExperience)
    this.setData({
      chooseExperience: chooseExperience,
      experienceIndex: index
    })
  },

  //重置
  reset: function () {
    this.setData({
      educationIndex: -1,
      salaryIndex: -1,
      experienceIndex: -1,
    })
  },

  //公司搜索内容
  inputVal: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //清空搜索
  clearInput: function () {
    this.setData({
      inputVal: null
    });
  },

  //跳转至添加招聘职位页面
  toAddJobPage: function () {
    if (this.data.isWxLogin) {
      wx.navigateTo({
        url: '/pages/index/addJob/addJob',
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



})