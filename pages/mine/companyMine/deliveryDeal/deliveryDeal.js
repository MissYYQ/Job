var util = require('../../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTemplate: false,
    addInterview: {},
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

  //地区picker改变
  regionChange: function (e) {
    let region = "addInterview.region"
    this.setData({
      [region]: e.detail.value
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
  cancelBtn: function () {
    this.setData({
      addInterview: {},
      showTemplate: false
    })
    wx.setStorageSync('addInterview', this.data.addInterview)
  },

  //确定
  determineBtn: function () {
    //判空
    let addInterview = this.data.addInterview;
    if (addInterview.date == null) {
      wx.showToast({
        title: '面试日期不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (addInterview.time == null) {
      wx.showToast({
        title: '面试时间不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (addInterview.location == null) {
      wx.showToast({
        title: '面试地点不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      this.setData({
        showTemplate: false
      })
    }
  }

})