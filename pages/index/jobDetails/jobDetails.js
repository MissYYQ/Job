Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorites: false //是否收藏

    // name: "前端开发",
    // salary: "6-10K",
    // education: "本科",
    // experience: "1-3年",
    // city: "杭州",
    // companyName: "云程科技",
    // industry: "计算机软件",
    // size: "20-99人",
    // financingStage: "B轮",
    // address: "江西省九江市濂溪区前进东路551号",
    // skill: [
    //   "Node.js",
    //   "React",
    //   "Java",
    //   "微信小程序"
    // ],
    // require: [
    //   "扎实的前端基础知识：HTML、CSS、JS等；",
    //   "熟悉HTTP协议，提升Web性能；",
    //   "熟悉Git、vue.js等；",
    //   "了解常见的前端框架、库、工具；",
    //   "做事积极主动，责任心强，逻辑性强，抗压性强；"
    // ],
    // duty: [
    //   "与产品经理、后端工程师进行协作，参与产品UI设计与需求讨论；",
    //   "负责web前端页面的构架设计、开发、实现、和相关过程文档的编写；",
    //   "配合完成小程序开发等相关工作；",
    // ],
    // pay: [
    //   "五险一金",
    //   "全勤奖",
    //   "年终奖",
    //   "零食下午茶",
    //   "定期团游",
    //   "股票期权"
    // ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //后台获取数据
    var id = options.id;
    var that = this;
    wx.request({
      url: 'http://localhost:81/job/one',
      method: 'get',
      data: {
        id: id,
      },
      success: function (res) {
        console.log("获取职位详情成功");
        console.log(res);
        that.setData({
          job: res.data,
          claim: res.data.claim,
          duty: res.data.duty
        })
        //字符串转数组
        if (that.data.claim) {
          var claim = that.data.claim;
          var claimArr = claim.split("；")
          that.setData({
            claim: claimArr,
          })
        }
        if (that.data.duty) {
          var duty = that.data.duty;
          var dutyArr = duty.split("；")
          that.setData({
            duty: dutyArr,
          })
        }
      },
      fail: function (res) {
        console.log("获取职位详情失败");
      }
    })

    this.setData({
      isWxLogin: wx.getStorageSync('isWxLogin'),
    })
  },

  //跳转至公司页面
  toCompanyPage: function () {
    var id = this.data.job.id;
    wx.navigateTo({
      url: '/pages/mine/companyMine/companyData/companyDetails/companyDetails?id='+id,
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