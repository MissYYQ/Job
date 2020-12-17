var util = require('../../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTemplate: false,
    addInterview: {},
    //1-投递、2-通过、3-面试、4-接受、5-拒绝、6-未通过
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var companyId = wx.getStorageSync('companyId');
    wx.request({
      url: 'http://localhost:81/delivery/deal',
      method: 'GET',
      data: {
        companyId: companyId
      },
      success: function (res) {
        that.setData({
          delivery: res.data,
        })
      }
    })
    //获取当前日期
    var nowDate = util.formatDate(new Date());
    this.setData({
      nowDate: nowDate,
    })
  },

  //查看职位
  toJobDetailsPage: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails?id=' + id,
    })
  },

  //查看附件简历
  openResumeFile: function (e) {
    var path = e.currentTarget.dataset.path;
    wx.openDocument({
      filePath: path,
      success: function (res) {
        console.log('成功打开简历附件')
      }
    })
  },

  //通过
  pass: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:81/delivery/pass',
      method: 'GET',
      data: {
        id: id
      },
      success: function (res) {
        if (res.data) {
          //刷新当前页
          var pages = getCurrentPages();
          var beforePage = pages[pages.length - 1];
          beforePage.onLoad();
        }
      }
    })
  },

  //不通过
  fail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:81/delivery/fail',
      method: 'GET',
      data: {
        id: id
      },
      success: function (res) {
        if (res.data) {
          //刷新当前页
          var pages = getCurrentPages();
          var beforePage = pages[pages.length - 1];
          beforePage.onLoad();
        }
      }
    })
  },

  //邀请面试模板弹出
  showTemplate: function (e) {
    this.setData({
      showTemplate: true,
      id: e.currentTarget.dataset.id,
      userId: e.currentTarget.dataset.userid,
      jobId: e.currentTarget.dataset.jobid,
    })
  },

  //日期picker改变
  dateChange: function (e) {
    this.setData({
      ['addInterview.date']: e.detail.value,
    })
  },

  //时间picker改变
  timeChange: function (e) {
    this.setData({
      ['addInterview.time']: e.detail.value
    })
  },

  //地区picker改变
  regionChange: function (e) {
    var value = e.detail.value;
    let region = value[0] + value[1] + value[2];
    this.setData({
      ['addInterview.region']: region
    })
  },

  //添加面试信息
  addInterview: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "addInterview." + key;
    this.setData({
      [name]: e.detail.value
    });
  },

  //取消
  cancelBtn: function () {
    this.setData({
      showTemplate: false
    })
  },

  //确定
  determineBtn: function (e) {
    var that = this;
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
    } else if (addInterview.region == null) {
      wx.showToast({
        title: '面试地区不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (addInterview.detailedaddress == null) {
      wx.showToast({
        title: '面试地点不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      var userId = that.data.userId;
      var jobId = that.data.jobId;
      wx.request({
        url: 'http://localhost:81/interview/add',
        method: 'GET',
        data: {
          companyId: wx.getStorageSync('companyId'),
          userId: userId,
          jobId: jobId,
          addInterview: addInterview
        },
        success: function (res) {
          if (res.data) {
            //修改投递状态为面试
            var id = that.data.id;
            wx.request({
              url: 'http://localhost:81/delivery/interview',
              method: 'GET',
              data: {
                id: id
              },
              success: function (res) {
                if (res.data) {
                  //关闭面试模板弹窗
                  that.setData({
                    showTemplate: false
                  })
                  //刷新当前页
                  var pages = getCurrentPages();
                  var beforePage = pages[pages.length - 1];
                  beforePage.onLoad();
                }
              }
            })
          }
        }
      })
    }
  }

})