var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWxLogin: null, 
    userKind: null,
    userInfo: null,
    communicationNum: 0,
    interviewNum: 0,
    favoritesNum: 0,
    // 学生
    deliveryNum: 0,
    expect: null,
    myMsg: [
      {
        imgUrl: '/images/mine/jianli.png',
        name: '简历'
      },
      {
        imgUrl: '/images/mine/shoucang.png',
        name: '收藏'
      },
      {
        imgUrl: '/images/mine/bishi.png',
        name: '笔试'
      },
      {
        imgUrl: '/images/mine/mianshi.png',
        name: '面试'
      },
      {
        imgUrl: '/images/mine/peixun.png',
        name: '培训'
      },
      {
        imgUrl: '/images/mine/shezhi.png',
        name: '设置'
      },
    ],
    // 企业
    jobNum: 0,
    company: {
      name: "云程科技", //公司名称
      src: '/images/jobDetails/company.png', //公司logo图片地址
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
    if(userKind == "学生"){
      userKindTag = 1
    }
    if(userKind == "企业"){
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

  studentChangePage: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    if(index === 0) {
      wx.navigateTo({
        url: '/pages/mine/resume/resume',
      })
    }
  },

  toUserKindPage: function() {
    wx.setStorageSync('userKind', null);
    wx.navigateTo({
      url: '/pages/login/userKind/userKind',
    })
  },

  //跳转至职位详情页面
  toJobDetailsPage: function () {
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails'
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


});