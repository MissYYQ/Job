Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: "hr@163.com",
    seminar: {
      logoImgUrl: "/images/index/hotCompany.png",
      companyName: "云程科技",
      industry: "计算机软件",
      school: "九江学院",
      position: "望庐楼407",
      date: "2020-11-11",
      time: "10:30",
    },
    introduction: "啊是擦实打实打说的啊是打撒大撒大啊是大时代撒按时代按时代啊是擦实打实打说的啊是打撒大撒大啊是大时代撒按时代按时代阿松大撒大网撒大撒大撒大按时代撒大SA DQWD QD QW D  发送发士大夫所发生的发射点发射点发士大夫对方是否大师傅士大夫士大夫水电费阿松大撒大网撒大撒大撒大按时代撒大SA DQWD QD QW D  发送发士大夫所发生的发射点发射点发士大夫对方是否大师傅士大夫士大夫水电费",
    welfare: [
      "五险一金",
      "年终奖",
      "全勤奖",
      "岗前培训",
      "住房补贴",
      "带薪年假",
    ],
    jobData: [
      {
        name: "前端开发",
        salary: "6-10K",
        degree: "本科",
        experience: "1-3年",
        city: "杭州",
        kind: 1
      },
      {
        name: "前端开发",
        salary: "6-10K",
        degree: "本科",
        experience: "1-3年",
        city: "杭州",
        kind: 1
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  toJobDetailsPage: function(){
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails',
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