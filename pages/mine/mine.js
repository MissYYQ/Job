var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    communicationNum: 0,
    interviewNum: 0,
    favoritesNum: 0,
    // 学生
    deliveryNum: 0,
    expect: null,
    // 企业
    jobNum: 0,
    company: {
      name: "云程科技", //公司名称
      src: '/images/jobDetails/company.png', //公司logo图片地址
      email: "hr@company.com",
      size: "20-99人", //规模
      financingStage: "B轮", //融资阶段
      workTime: "上午9:00-下午6:00", //工作时间
      weekend: 1, //"双休",
      flexible: 1, // "弹性工作"
      treatment: [ //待遇
        "五险一金",
        "年终奖",
        "全勤奖",
      ],
      address: "××省××市××县（区）××", //公司地址
      introduce: '本公司杀菌灯很耐看下的老司机先擦楼市成交回暖沙尘暴的来输出就拿'
    },
    jobData: [{
        name: "前端开发",
        salary: "6-10K",
        education: "本科",
        experience: "1-3年",
        city: "杭州",
        companyName: "云程科技",
        companySize: "20-99人",
        financingStage: "B轮",
        ecruiterImgUrl: "/images/tabBar/mine02.png",
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
        companySize: "100-499人",
        financingStage: "未融资",
        ecruiterImgUrl: "/images/tabBar/mine02.png",
        ecruiterName: "林慧慧",
        kind: 1
      },
      {
        name: "前端开发",
        salary: "6-10K",
        education: "本科",
        experience: "1-3年",
        city: "杭州",
        companyName: "云程科技",
        companySize: "20-99人",
        financingStage: "B轮",
        ecruiterImgUrl: "/images/tabBar/mine02.png",
        ecruiterName: "姜先生",
        kind: 2
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 1
    }
    if (userKind == "企业") {
      userKindTag = 2
    }
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
      userInfo: wx.getStorageSync('userInfo'),
      userKind: wx.getStorageSync('userKind'),
      userKindTag: userKindTag,
      intentionJob: wx.getStorageSync('intentionJob'),
    })
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