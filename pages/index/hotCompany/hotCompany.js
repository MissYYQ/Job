Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyData: [{
        name: "云程科技",
        src: '/images/index/hotCompany.png',
        industry: "计算机软件",
        size: "20-99人",
        financingStage: "B轮",
        address: "江西省九江市濂溪区前进东路551号",
        treatment: [
          "五险一金",
          "年终奖",
          "全勤奖",
        ],
      },
      {
        name: "云程科技",
        src: '/images/index/hotCompany.png',
        industry: "计算机软件",
        size: "20-99人",
        financingStage: "B轮",
        address: "江西省九江市濂溪区前进东路551号",
        treatment: [
          "五险一金",
          "年终奖",
          "全勤奖",
        ],
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //搜索内容
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

  //跳转至公司详情页面
  toCompanyPage: function () {
    wx.navigateTo({
      url: '/pages/mine/companyMine/companyData/companyDetails',
    })
  },

})