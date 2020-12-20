var util = require("../../../utils/util");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //student
    if (options.companyId) {
      var jobId = options.jobId;
      var companyId = options.companyId;
      wx.request({
        url: 'http://localhost:81/chat/one',
        method: 'get',
        data: {
          companyId: companyId,
          studentId: wx.getStorageSync('studentId')
        },
        success: function (res) {
          if (res.data) {
            that.setData({
              msg: res.data
            })
          }
        }
      })
      that.setData({
        studentId: wx.getStorageSync('studentId'),
        companyId: companyId,
        jobId: jobId,
      })
    }
    // company
    if (options.studentId) {
      var studentId = options.studentId;
      wx.request({
        url: 'http://localhost:81/chat/one',
        method: 'get',
        data: {
          companyId: wx.getStorageSync('companyId'),
          studentId: studentId
        },
        success: function (res) {
          if (res.data) {
            that.setData({
              msg: res.data
            })
            console.log(res.data);
          }
        }
      })
      that.setData({
        studentId: studentId,
        companyId: wx.getStorageSync('companyId'),
        jobId: 0
      })
    }

    var userKind = wx.getStorageSync('userKind')
    var userKindTag;
    if (userKind == "学生") {
      userKindTag = 0
    }
    if (userKind == "企业") {
      userKindTag = 1
    }
    that.setData({
      userKindTag: userKindTag,
      height: wx.getSystemInfoSync().windowHeight - 55
    })
    if (that.data.msg) {
      var length = that.data.msg.length;
      let lastId = 'msg' + length;
      that.setData({
        lastId: lastId
      })
    }
  },

  //输入消息
  inputMsg: function (e) {
    this.setData({
      inputMsg: e.detail.value
    })
  },

  //发送消息
  sendBtn: function () {
    var that = this;
    if (this.data.inputMsg) {
      var studentId = this.data.studentId;
      var companyId = this.data.companyId;
      var jobId = this.data.jobId;
      var sender = this.data.userKindTag;
      var message = this.data.inputMsg;
      wx.request({
        url: 'http://localhost:81/chat/add',
        method: 'get',
        data: {
          studentId: studentId,
          companyId: companyId,
          jobId: jobId,
          message: message,
          sender: sender
        },
        success: function (res) {
          if (res.data) {
            wx.request({
              url: 'http://localhost:81/news/add',
              method: 'get',
              data: {
                studentId: studentId,
                companyId: companyId,
                jobId: jobId,
                lastMessage: message,
                lastDate: util.formatDateTime(new Date())
              },
              success: function (res) {
                if (res.data) {
                  wx.request({
                    url: 'http://localhost:81/chat/one',
                    method: 'get',
                    data: {
                      companyId: companyId,
                      studentId: studentId
                    },
                    success: function (res) {
                      if (res.data) {
                        that.setData({
                          msg: res.data
                        })
                        var length = that.data.msg.length;
                        let lastId = 'msg' + length;
                        that.setData({
                          lastId: lastId
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
      //消息重定位
      var length = this.data.msg.length;
      let lastId = 'msg' + length;
      this.setData({
        inputMsg: null,
        lastId: lastId
      })
    } else {
      wx.showToast({
        title: '消息不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }

  },

  // 更多
  more: function () {
    var isMore = this.data.isMore;
    this.setData({
      isMore: !isMore,
    })
    //消息重定位
    var length = this.data.msg.length;
    let lastId = 'msg' + length;
    var height
    if (this.data.isMore) {
      height = wx.getSystemInfoSync().windowHeight - 158
    } else {
      height = wx.getSystemInfoSync().windowHeight - 55
    }
    this.setData({
      height: height,
      lastId: lastId,
    })

  },



})