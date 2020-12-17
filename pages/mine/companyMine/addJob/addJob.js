Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: [
      "校招",
      "社招"
    ],
    experience: [
      "不限",
      "在校生",
      "应届生",
      "1年以内",
      "1-3年",
      "3-5年",
      "5-10年",
      "10年以上"
    ],
    degree: [
      "不限",
      "初中及以下",
      "中专/中技",
      "高中",
      "大专",
      "本科",
      "硕士",
      "博士"
    ],
    addKeywords: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //编辑
    if (options.id) {
      var id = options.id;
      that.setData({
        operation: "edit",
        id: id
      })
      wx.request({
        url: 'http://localhost:81/job/one',
        method: 'get',
        data: {
          id: id,
        },
        success: function (res) {
          that.setData({
            job: res.data,
          })
          //数据处理
          if (that.data.job.salary) {
            var salary = that.data.job.salary.split("-")
            var lowSalary = salary[0];
            var highSalary = salary[1];
            that.setData({
              ['job.salary.lowSalary']: lowSalary,
              ['job.salary.highSalary']: highSalary,
            })
          }
          if (that.data.job.keywords) {
            var keywords = that.data.job.keywords.split("、");
            that.setData({
              ['job.keywords']: keywords,
            })
          }
        },
      })
    } else {
      //添加
      that.setData({
        operation: "add",
        job: {}
      })
    }
  },

  //添加工作
  addJob: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "job." + key;
    this.setData({
      [name]: e.detail.value
    });

  },

  //招聘类型picker改变
  kindPicker: function (e) {
    this.setData({
      ['job.kind']: e.detail.value
    })
  },

  //截止日期picker改变
  datePicker: function (e) {
    this.setData({
      ['job.deadline']: e.detail.value
    })
  },

  //经验要求picker改变
  experiencePicker: function (e) {
    this.setData({
      ['job.experience']: this.data.experience[e.detail.value]
    })
  },

  //学历要求picker改变
  degreePicker: function (e) {
    this.setData({
      ['job.degree']: this.data.degree[e.detail.value]
    })

  },

  //岗位要求
  claimTextarea: function (e) {
    this.setData({
      ['job.claim']: e.detail.value,
    });

  },

  //岗位职责
  dutyTextarea: function (e) {
    this.setData({
      ['job.duty']: e.detail.value,
    });

  },

  //编辑职位技能标签
  editKeywords: function (e) {
    if (e.detail.value) {
      this.setData({
        addKeywords: e.detail.value
      })
    }
  },

  //添加职位技能标签
  addKeywords: function (e) {
    var addKeywords = this.data.addKeywords;
    if (this.data.job.keywords) {
      var keywords = this.data.job.keywords;
    } else {
      var keywords = new Array();
    }
    keywords.push(addKeywords);
    this.setData({
      ['job.keywords']: keywords,
      addKeywords: null
    });
  },

  //删除职位技能标签
  deleteSkill: function (e) {
    var index = e.currentTarget.dataset.index;
    var keywords = this.data.job.keywords;
    keywords.splice(index, 1)
    this.setData({
      ['job.keywords']: keywords
    })
  },

  //取消
  cancelBtn: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  //确定
  determineBtn: function () {
    //判空
    let job = this.data.job;
    if (job.name == null) {
      wx.showToast({
        title: '职位名称不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (job.salary == null) {
      wx.showToast({
        title: '薪资不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (job.city == null) {
      wx.showToast({
        title: '工作城市不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (job.experience == null) {
      wx.showToast({
        title: '经验要求不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (job.degree == null) {
      wx.showToast({
        title: '学历要求不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      //数据处理
      var salary = this.data.job.salary.lowSalary + "-" + this.data.job.salary.highSalary;
      var keywords = this.data.job.keywords.join("、");
      this.setData({
        ['job.salary']: salary,
        ['job.keywords']: keywords,
      })
      //提交
      var operation = this.data.operation;
      if (operation == "edit") {
        //更新
        var id = this.data.id;
        var companyId = wx.getStorageSync('companyId');
        wx.request({
          url: 'http://localhost:81/job/update',
          method: 'POST',
          data: {
            id: id,
            companyId: companyId,
            job: JSON.stringify(job)
          },
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data) {
              wx.showToast({
                title: '编辑成功',
                icon: 'none',
                duration: 1500,
                mask: true
              })
              // 刷新并返回上一页
              var pages = getCurrentPages();
              var beforePage = pages[pages.length - 2];
              beforePage.onLoad();
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      } else {
        //添加
        var companyId = wx.getStorageSync('companyId');
        wx.request({
          url: 'http://localhost:81/job/add',
          method: 'POST',
          data: {
            companyId: companyId,
            job: JSON.stringify(job)
          },
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data) {
              wx.showToast({
                title: '添加成功',
                icon: 'none',
                duration: 1500,
                mask: true
              })
              //刷新mine页面
              var pages = getCurrentPages();
              var minePage = pages[pages.length - 3];
              minePage.onLoad();
              // 刷新并返回上一页
              var beforePage = pages[pages.length - 2];
              beforePage.onLoad();
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      }
    }
  }




})