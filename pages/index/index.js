//获取应用实例
const app = getApp()

Page({
  data: {
    isWxLogin: null,  //是否登录
    showKindIndex: 1, //推荐-1，最新-2
    showfilter: false, //是否显示下拉筛选
    chooseEducation: '', //学历要求
    chooseSalary: '', //薪资待遇
    chooseExperience: '', //经验要求
    educationIndex: -1, //学历要求index
    salaryIndex: -1, //薪资待遇index
    experienceIndex: -1, //经验要求index
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
    education: [
      "不限",
      "初中及以下",
      "中专/中技",
      "高中",
      "大专",
      "本科",
      "硕士",
      "博士"
    ],
    salary: [
      "不限",
      "3K以下",
      "3-5K",
      "5-10K",
      "10-20K",
      "20-50K",
      "50K以上"
    ],
    experience: [
      "不限",
      "在校生",
      "应届生",
      "1年以内",
      "1-3年",
      "3-5年",
      "5-10年",
      "10年以上"
    ]
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
    if(wx.getStorageSync('intentionJob').city) {
      this.setData({
        city: wx.getStorageSync('intentionJob').city
      })
    } else if (wx.getStorageSync('userInfo').city) {
      this.setData({
        city: wx.getStorageSync('userInfo').city
      })
    }
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
      intentionJob: wx.getStorageSync('intentionJob'),
      userKindTag: userKindTag,
    })
  },

  //跳转至搜索页面
  toSearchPage: function () {
    if(this.data.isWxLogin){
      wx.navigateTo({
        url: '../index/search/search'
      })
    }
  },

  //跳转至职位详情页面
  toJobDetailsPage: function () {
    wx.navigateTo({
      url: '../index/jobDetails/jobDetails'
    })
  },

  //跳转至求职期望页面
  toExpectPage: function () {
    wx.navigateTo({
      url: '/pages/index/intentionJob/intentionJob',
    })
  },

  //推荐、最新 类型切换
  showKind: function () {
    let index = this.data.showKindIndex
    if (index === 1) {
      index = 2
    } else {
      index = 1
    }
    this.setData({
      showKindIndex: index
    })
  },

  //城市切换
  bindRegionChange: function (e) {
    var city = e.detail.value[1] //市名
    city = city.substring(0, city.length - 1) //去掉市
    console.log(city)
    this.setData({
      city: city
    })
  },

  // 筛选 显示/隐藏
  filter: function () {
    var showfilter = this.data.showfilter
    this.setData({
      showfilter: !showfilter
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