const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addWelfare: '',
    size: [
      "0-20人",
      "20-99人",
      "100-499人",
      "500-999人",
      "1000-9999人",
      "10000人以上",
    ],
    financingstage: [
      "未融资",
      "天使轮",
      "A轮",
      "B轮",
      "C轮",
      "D轮及以上",
      "已上市",
      "不需要融资",
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userId = wx.getStorageSync('userInfo').id;
    wx.request({
      url: 'http://localhost:81/company/oneByUserId',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        console.log("加载成功");
        console.log(res.data);
        that.setData({
          company: res.data,
        })
        //数据处理
        if (that.data.company) {
          if (that.data.company.worktime) {
            var worktime = that.data.company.worktime.split("-")
            var starttime = worktime[0];
            var endtime = worktime[1];
            that.setData({
              ['company.worktime.starttime']: starttime,
              ['company.worktime.endtime']: endtime,
            })
          }
          if (that.data.company.region) {
            var region = that.data.company.region.split(" ");
            that.setData({
              ['company.region']: region,
            })
          }
          if (that.data.company.welfare) {
            var welfare = that.data.company.welfare.split("、");
            that.setData({
              ['company.welfare']: welfare,
            })
          }
          if (that.data.company.introduction) {
            that.setData({
              currentWordNumber: that.data.company.introduction.length
            })
          }
        }
      }
    })
  },

  //添加logo
  addCompanyLogo: function () {
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
          ['company.logourl']: filePath
        })
      }
    })
  },

  //公司规模选择器发生改变
  sizeChange: function (e) {
    let size = "company.size";
    this.setData({
      [size]: this.data.size[e.detail.value]
    })
  },

  //融资阶段选择器发生改变
  financingStageChange: function (e) {
    this.setData({
      ['company.financingstage']: this.data.financingstage[e.detail.value]
    })
  },

  //时间picker改变
  startTimeChange: function (e) {
    let worktime = "company.worktime.starttime"
    this.setData({
      [worktime]: e.detail.value
    })
  },

  //时间picker改变
  endTimeChange: function (e) {
    let worktime = "company.worktime.endtime"
    this.setData({
      [worktime]: e.detail.value
    })
  },

  //region选择器发生改变
  bindRegionChange: function (e) {
    this.setData({
      ['company.region']: e.detail.value
    })
  },

  //编辑
  editCompany: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "company." + key;
    this.setData({
      [name]: e.detail.value
    })
  },

  //编辑福利
  editWelfare: function (e) {
    if (e.detail.value) {
      this.setData({
        addWelfare: e.detail.value
      })
    }
  },

  //添加福利
  addWelfare: function (e) {
    var addWelfare = this.data.addWelfare;
    if (this.data.company.welfare) {
      var welfare = this.data.company.welfare;
    } else {
      var welfare = new Array();
    }
    if (welfare) {
      welfare.push(addWelfare)
    }
    this.setData({
      ['company.welfare']: welfare,
      addWelfare: ''
    });
  },

  //删除福利
  deleteWelfare: function (e) {
    var index = e.currentTarget.dataset.index;
    var welfare = this.data.company.welfare;
    welfare.splice(index, 1)
    this.setData({
      ['company.welfare']: welfare
    })
  },

  //输入域文本
  textareaInput: function (e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    this.setData({
      currentWordNumber: length,
      ['company.introduction']: e.detail.value
    });
  },

  //取消
  cancelBtn: function () {
    wx.setStorageSync('userKind', "学生");
    app.globalData.userKind = "学生";
    wx.reLaunch({
      url: '/pages/mine/mine',
    })
    wx.showToast({
      title: '已取消切换身份！',
      icon: 'none',
      duration: 1500,
      mask: true
    })
  },

  //确定
  determineBtn: function () {
    var that = this;
    //数据处理
    var worktime = this.data.company.worktime.starttime + "-" + this.data.company.worktime.endtime;
    var region = this.data.company.region.join(" ");
    var welfare = this.data.company.welfare.join("、");
    this.setData({
      ['company.worktime']: worktime,
      ['company.region']: region,
      ['company.welfare']: welfare,
    })
    //判空
    let company = that.data.company;
    if (company.name == null) {
      wx.showToast({
        title: '公司名称不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.logourl == null) {
      wx.showToast({
        title: '公司logo图片不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.industry == null) {
      wx.showToast({
        title: '公司所属行业不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.size == null) {
      wx.showToast({
        title: '公司规模不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.financingstage == null) {
      wx.showToast({
        title: '融资阶段不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.region == null) {
      wx.showToast({
        title: '公司地址不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (company.detailedaddress == null) {
      wx.showToast({
        title: '公司详细地址不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      //后台处理
      var userId = wx.getStorageSync('userInfo').id;
      wx.request({
        url: 'http://localhost:81/company/edit',
        method: 'POST',
        data: {
          userId: userId,
          company: JSON.stringify(company)
        },
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          if (res.data) {
            console.log(res.data, "company保存成功")
            // 跳转
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
      })
    }
  },



})