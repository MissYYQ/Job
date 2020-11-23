var util = require('../../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTemplate: false,
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
        status: 2,
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
    //获取当前日期
    var nowDate = util.formatDate(new Date());
    this.setData({
      nowDate: nowDate,
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

  //邀请面试模板弹出
  showTemplate: function () {
    this.setData({
      showTemplate: true
    })
  },

  //日期picker改变
  dateChange: function (e) {
    let date = "addInterview.date"
    this.setData({
      [date]: e.detail.value,
    })
    wx.setStorageSync('addInterview', this.data.addInterview)
  },

  //时间picker改变
  timeChange: function (e) {
    let time = "addInterview.time"
    this.setData({
      [time]: e.detail.value
    })
    wx.setStorageSync('addInterview', this.data.addInterview)
  },

  //添加面试信息
  addInterview: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "addInterview." + key;
    this.setData({
      [name]: e.detail.value
    });
    wx.setStorageSync('addInterview', this.data.addInterview);
  },

  //取消
  cancelBtn:function(){
    this.setData({
      addInterview: null,
      showTemplate: false
    })
    wx.setStorageSync('addInterview', this.data.addInterview)
  },

  //确定
  determineBtn: function(){
    this.setData({
      showTemplate: false
    })
  }

})