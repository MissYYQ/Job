Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "前端开发",
    salary: "6-10K",
    education: "本科",
    experience: "1-3年",
    city: "杭州",
    companyName: "云程科技",
    companySize: "20-99人",
    financingStage: "B轮",
    address: "××省××市××县（区）××",
    ecruiterImgUrl: "/images/tabBar/mine02.png",
    ecruiterName: "姜先生",
    skill: [
      "Node.js",
      "React",
      "Java",
      "微信小程序"
    ],
    require: [
      "扎实的前端基础知识：HTML、CSS、JS等；",
      "熟悉HTTP协议，提升Web性能；",
      "熟悉Git、vue.js等；",
      "了解常见的前端框架、库、工具；",
      "做事积极主动，责任心强，逻辑性强，抗压性强；"
    ],
    duty: [
      "与产品经理、后端工程师进行协作，参与产品UI设计与需求讨论；",
      "负责web前端页面的构架设计、开发、实现、和相关过程文档的编写；",
      "配合完成小程序开发等相关工作；",
    ],
    pay: [
      "五险一金",
      "全勤奖",
      "年终奖",
      "零食下午茶",
      "定期团游",
      "股票期权"
    ],
    favorites: false //是否收藏

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin')
    })
  },

  //跳转至公司页面
  toCompanyPage: function () {
    wx.navigateTo({
      url: '/pages/index/companyDetails/companyDetails',
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