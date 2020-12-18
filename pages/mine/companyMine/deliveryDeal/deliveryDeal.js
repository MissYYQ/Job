Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    all: false,
    showTemplate: false,
    addInterview: {},
    //1-投递、2-通过、3-面试、4-接受、5-拒绝、6-未通过
    passEmpty: true,
    interviewEmpty: true
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
        // 数据处理
        for (var i = 0; i < that.data.delivery.length; i++) {
          if (that.data.delivery[i].status == 1) {
            that.setData({
              passEmpty: false
            })
          }
          if (that.data.delivery[i].status == 2) {
            that.setData({
              interviewEmpty: false
            })
          }
          var checked = "delivery[" + i + "].checked"
          that.setData({
            [checked]: false
          })
        }
      }
    })
  },

  //标签栏点击切换页面时的监听函数
  changeTab: function (e) {
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
  },

  //选择
  check: function (e) {
    var checked = e.currentTarget.dataset.checked;
    if (checked) {
      this.setData({
        all: false
      })
    }
    var index = e.currentTarget.dataset.index;
    var delivery = "delivery[" + index + "].checked"
    this.setData({
      [delivery]: !checked
    })
  },

  //全选
  checkAll: function (e) {
    this.setData({
      all: !this.data.all
    })
    var tab = this.data.tab;
    if (tab == 0) {
      var delivery = this.data.delivery;
      for (var i = 0; i < delivery.length; i++) {
        if (delivery[i].status == 1) {
          var checked = "delivery[" + i + "].checked"
          if (this.data.all) {
            this.setData({
              [checked]: true
            })
          } else {
            this.setData({
              [checked]: false
            })
          }
        }
      }
    }
    if (tab == 1) {
      var delivery = this.data.delivery;
      for (var i = 0; i < delivery.length; i++) {
        if (delivery[i].status == 2) {
          var checked = "delivery[" + i + "].checked"
          if (this.data.all) {
            this.setData({
              [checked]: true
            })
          } else {
            this.setData({
              [checked]: false
            })
          }
        }
      }
    }
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
    var idArr = new Array;
    var delivery = this.data.delivery;
    for (var i = 0; i < delivery.length; i++) {
      if (delivery[i].checked) {
        var id = delivery[i].id;
        idArr.push(id);
      }
    }
    if (idArr.length >= 1) {
      wx.request({
        url: 'http://localhost:81/delivery/pass',
        method: 'GET',
        data: {
          idArr: JSON.stringify(idArr)
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
    } else {
      wx.showToast({
        title: '请先选择操作项！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //不通过
  fail: function (e) {
    var idArr = new Array;
    var delivery = this.data.delivery;
    for (var i = 0; i < delivery.length; i++) {
      if (delivery[i].checked) {
        var id = delivery[i].id;
        idArr.push(id);
      }
    }
    if (idArr.length >= 1) {
      wx.request({
        url: 'http://localhost:81/delivery/fail',
        method: 'GET',
        data: {
          idArr: JSON.stringify(idArr)
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
    } else {
      wx.showToast({
        title: '请先选择操作项！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //邀请面试模板弹出
  showTemplate: function (e) {
    var idArr = new Array;
    var delivery = this.data.delivery;
    for (var i = 0; i < delivery.length; i++) {
      if (delivery[i].checked) {
        var id = delivery[i].id;
        idArr.push(id);
      }
    }
    if (idArr.length >= 1) {
      this.setData({
        showTemplate: true
      })
    } else {
      wx.showToast({
        title: '请先选择操作项！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
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
      var userIdArr = new Array;
      var jobIdArr = new Array;
      var delivery = this.data.delivery;
      for (var i = 0; i < delivery.length; i++) {
        if (delivery[i].checked) {
          var userId = delivery[i].userId;
          var jobId = delivery[i].jobId;
          userIdArr.push(userId);
          jobIdArr.push(jobId);
        }
      }
      wx.request({
        url: 'http://localhost:81/interview/add',
        method: 'GET',
        data: {
          companyId: wx.getStorageSync('companyId'),
          userIdArr: JSON.stringify(userIdArr),
          jobIdArr: JSON.stringify(jobIdArr),
          addInterview: addInterview
        },
        success: function (res) {
          if (res.data) {
            //修改投递状态为面试
            var idArr = new Array;
            var delivery = that.data.delivery;
            for (var i = 0; i < delivery.length; i++) {
              if (delivery[i].checked) {
                var id = delivery[i].id;
                idArr.push(id);
              }
            }
            wx.request({
              url: 'http://localhost:81/delivery/interview',
              method: 'GET',
              data: {
                idArr: JSON.stringify(idArr)
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