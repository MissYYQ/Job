Page({

  /**
   * 页面的初始数据
   */
  data: {
    //1-投递、2-通过、3-面试、4-接受、5-拒绝、6-未通过
    delivery: [{
        jobName: "前端开发工程师",
        studentName: "南笙",
        resumeFile: {},
        status: 1,
      },
      {
        jobName: "前端开发工程师",
        studentName: "南笙",
        resumeFile: {},
        status: 1,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      resumeFile: wx.getStorageSync('resumeFile')
    })
  },

  //查看职位
  toJobDetailsPage: function () {
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails',
    })
  },

  //查看在线简历
  toPreviewResumePage: function () {
    wx.navigateTo({
      url: '/pages/mine/studentMine/resume/previewResume/previewResume',
    })
  },

  //查看附件简历
  openResumeFile: function () {
    var that = this;
    wx.openDocument({
      filePath: that.data.resumeFile.path,
      success: function (res) {
        console.log('成功打开简历附件')
      }
    })
  },

})