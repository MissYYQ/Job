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
    // 推荐
    wx.request({
      url: 'http://localhost:81/job/all',
      method: 'get',
      success: function (res) {
        console.log("获取职位列表成功");
        console.log(res);
        that.setData({
          job: res.data,
        })
      },
      fail: function (res) {
        console.log("获取职位失败");
      }
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
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails?id='+id
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

  //跳转至预览简历页面
  toPreviewResumePage: function () {
    wx.navigateTo({
      url: '/pages/mine/studentMine/resume/previewResume/previewResume',
    })
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