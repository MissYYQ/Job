const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: {},
    welfare: [],
    region: '',
    detailedAddress: '',
    addWelfare: '',
    size: [
      "0-20人",
      "20-99人",
      "100-499人",
      "500-999人",
      "1000-9999人",
      "10000人以上",
    ],
    financingStage: [
      "未融资",
      "天使轮",
      "A轮",
      "B轮",
      "C轮",
      "D轮及以上",
      "已上市",
      "不需要融资",
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      company: wx.getStorageSync('company'),
      welfare: wx.getStorageSync('welfare'),
    })
    // 公司简介字数加载
    var introduction = this.data.company.introduction;
    if (introduction) {
      this.setData({
        currentWordNumber: introduction.length
      })
    }

  },

  //公司规模选择器发生改变
  sizeChange: function (e) {
    let size = "company.size";
    this.setData({
      [size]: this.data.size[e.detail.value]
    })
    wx.setStorageSync('company', this.data.company)
  },

  //融资阶段选择器发生改变
  financingStageChange: function (e) {
    let financingStage = "company.financingStage";
    this.setData({
      [financingStage]: this.data.financingStage[e.detail.value]
    })
    wx.setStorageSync('company', this.data.company)
  },

  //编辑
  editCompany: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "company." + key;
    this.setData({
      [name]: e.detail.value
    })
    wx.setStorageSync('company', this.data.company)
  },

  //添加logo
  addCompanyLogo: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //尺寸【原图，压缩图】
      sourceType: ['album', 'camera'], //来源【从相册选图，使用相机】
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths //图片的本地临时文件路径列表 
        var filePath = tempFilePaths[0]; //图片本地临时路径
        //前台显示
        that.setData({
          ['company.logoUrl']: filePath
        })
        wx.setStorageSync('company', that.data.company)
      }
    })
  },

  //删除福利
  deleteWelfare: function (e) {
    var index = e.currentTarget.dataset.index;
    var welfare = this.data.welfare;
    welfare.splice(index, 1)
    this.setData({
      welfare: welfare
    })
    wx.setStorageSync('welfare', this.data.welfare)
  },

  //编辑福利
  editWelfare: function (e) {
    if (e.detail.value) {
      this.setData({
        addWelfare: e.detail.value
      })
    }
  },

  //添加福利
  addWelfare: function (e) {
    var addWelfare = this.data.addWelfare;
    var welfare = this.data.welfare;
    var length = welfare.length;
    var tag = [];
    for (var i = 0; i < length; i++) {
      tag[i] = welfare[i]
    };
    tag[length] = addWelfare;
    this.setData({
      welfare: tag,
      addWelfare: ''
    });
    wx.setStorageSync('welfare', this.data.welfare);
  },

  //region选择器发生改变
  bindRegionChange: function (e) {
    this.setData({
      ['company.region']: e.detail.value
    })
    wx.setStorageSync('company', this.data.company)
  },

  //输入域文本
  textareaInput: function (e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    this.setData({
      currentWordNumber: length,
      ['company.introduction']: e.detail.value
    });
    wx.setStorageSync('company', this.data.company)
  },

  //取消
  cancelBtn: function () {
    wx.setStorageSync('userKind', "学生");
    app.globalData.userKind = "学生";
    wx.reLaunch({
      url: '/pages/index/index',
    })
    wx.showToast({
      title: '已取消身份切换！',
      icon: 'none',
      duration: 1500,
      mask: true
    })
  },

  //确定
  determineBtn: function () {
    //判空
    let company = this.data.company;
    if (company.name == null) {
      wx.showToast({
        title: '公司名称不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.logoUrl == null) {
      wx.showToast({
        title: '公司logo图片不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.industry == null) {
      wx.showToast({
        title: '公司所属行业不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.size == null) {
      wx.showToast({
        title: '公司规模不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.financingStage == null) {
      wx.showToast({
        title: '融资阶段不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.region == null) {
      wx.showToast({
        title: '公司地址不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.detailedAddress == null) {
      wx.showToast({
        title: '公司详细地址不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      //跳转
      wx.reLaunch({
        url: '/pages/index/index',
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