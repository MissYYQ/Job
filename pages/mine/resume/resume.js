Page({

  /**
   * 页面的初始数据
   */
  data: {
    mark: '',
    isEdit: false,
    resume: {
      avatar: '',
      name: '',
      birthday: '',
      hometown: '',
      political: '',
      phone: '',
      mailbox: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resume: wx.getStorageSync('resume')
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

  //编辑内容
  editMsg: function (e) {
    var key = e.currentTarget.dataset.key;
    let name="resume."+key;
    this.setData({
      [name]  : e.detail.value
    })
    wx.setStorageSync('resume', this.data.resume)
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
  resetBtn: function() {
    this.setData({
      resume: ''
    })
    wx.setStorageSync('resume', this.data.resume)
  },

  //跳转至首页
  toIndexPage: function() {
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