Page({

  /**
   * 页面的初始数据
   */
  data: {
    mark: '',
    isEdit: false,
    resume: {
      //基本信息
      avatar: '',
      name: '',
      birthday: '',
      education: '',
      hometown: '',
      political: '',
      phone: '',
      mailbox: '',
    }
  },

  //编辑
  edit: function (e) {
    var isEdit = this.data.isEdit
    this.setData({
      mark: e.currentTarget.dataset.mark,
      isEdit: !isEdit
    })
  },

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
        console.log("上传图片 res：", res)
        that.setData({
          ['resume.avatar']: filePath
        })
      }
    })
  },

  //编辑姓名
  editName: function (e) {
    this.setData({
      ['resume.name']: e.detail.value
    })
    console.log(this.data.resume.name)
  },

  //日期改变
  bindDateChange: function (e) {
    console.log('日期picker发送选择改变，携带值为：', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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