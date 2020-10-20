Page({

  /**
   * 页面的初始数据
   */
  data: {
    mark: '',
    isEdit: false,
    resume: {},
    educationBackground: {},
    intentionJob: '',
    professionalSkills: [],
    addSkill: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resume: wx.getStorageSync('resume'),
      educationBackground: wx.getStorageSync('educationBackground'),
      intentionJob: wx.getStorageSync('intentionJob'),
      professionalSkills: wx.getStorageSync('professionalSkills'),
    })
  },


  //编辑
  edit: function (e) {
    var isEdit = this.data.isEdit
    this.setData({
      mark: e.currentTarget.dataset.mark,
      isEdit: !isEdit
    })
  },


  //编辑基本信息
  editMsg: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "resume." + key;
    this.setData({
      [name]: e.detail.value
    })
    wx.setStorageSync('resume', this.data.resume)
  },


  //编辑教育背景
  editEB: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "educationBackground." + key;
    this.setData({
      [name]: e.detail.value
    })
    wx.setStorageSync('educationBackground', this.data.educationBackground)
  },


  //编辑求职意向
  editIJ: function (e) {
    this.setData({
      intentionJob: e.detail.value
    })
    wx.setStorageSync('intentionJob', this.data.intentionJob)
  },


  //编辑职业技能
  editPS: function (e) {
    if(e.detail.value) {
      this.setData({
        addSkill: e.detail.value
      })
    }
  },

  //添加技能
  addSkill: function(e) {
    var addSkill = this.data.addSkill;
    var professionalSkills = this.data.professionalSkills;
    var length = professionalSkills.length;
    professionalSkills[length] = addSkill
    var tag = []
    for (var i = 0; i < length; i++) {
      tag[i] = professionalSkills[i]
    }
    tag[length] = addSkill
    this.setData({
      professionalSkills: tag,
      addSkill: ''
    })
    wx.setStorageSync('professionalSkills', this.data.professionalSkills)
  },


  //添加头像
  addAvatar: function () {
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
          ['resume.avatar']: filePath
        })
        wx.setStorageSync('resume', that.data.resume)
      }
    })
  },

  //日期改变
  bindDateChange: function (e) {
    var that = this
    console.log('日期picker发送选择改变，携带值为：', e.detail.value)
    this.setData({
      ['resume.birthday']: e.detail.value
    })
    wx.setStorageSync('resume', that.data.resume)
  },

  //重置
  resetBtn: function () {
    var mark = this.data.mark
    console.log("重置", mark)
    this.setData({
      [mark]: ''
    })
    if (mark == basicInformation) {
      wx.setStorageSync("basicInformation", this.data.basicInformation)
    }
    if (mark == educationBackground) {
      wx.setStorageSync("educationBackground", this.data.educationBackground)
    }
    if (mark == intentionJob) {
      wx.setStorageSync("intentionJob", this.data.intentionJob)
    }
  },

  //编辑确定按钮
  editOverBtn: function () {
    this.setData({
      isEdit: false
    })
  },

  //跳转至首页
  toIndexPage: function () {
    wx.switchTab({
      url: '/pages/index/index',
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