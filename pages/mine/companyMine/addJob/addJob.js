Page({

  /**
   * 页面的初始数据
   */
  data: {
    addJob: {},
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
    addSkill: '',
    jobSkill: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //添加工作
  addJob: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "addJob." + key;
    this.setData({
      [name]: e.detail.value
    });
    wx.setStorageSync('addJob', this.data.addJob);
  },

  //经验要求picker改变
  experiencePicker: function (e) {
    this.setData({
      experienceIndex: e.detail.value,
      ['addJob.experience']: this.data.experience[e.detail.value]
    })
    wx.setStorageSync('addJob', this.data.addJob);
  },

  //学历要求picker改变
  degreePicker: function (e) {
    this.setData({
      degreeIndex: e.detail.value,
      ['addJob.degree']: this.data.degree[e.detail.value]
    })
    wx.setStorageSync('addJob', this.data.addJob);
  },

  //岗位要求
  claimTextarea: function (e) {
    this.setData({
      ['addJob.claim']: e.detail.value,
    });
    wx.setStorageSync('addJob', this.data.addJob);
  },

  //岗位职责
  dutyTextarea: function (e) {
    this.setData({
      ['addJob.duty']: e.detail.value,
    });
    wx.setStorageSync('addJob', this.data.addJob);
  },

  //编辑职位技能标签
  editSkill: function (e) {
    if (e.detail.value) {
      this.setData({
        addSkill: e.detail.value
      })
    }
  },

  //添加职位技能标签
  addSkill: function (e) {
    var addSkill = this.data.addSkill;
    var jobSkill = this.data.jobSkill;
    var length = jobSkill.length;
    var tag = [];
    for (var i = 0; i < length; i++) {
      tag[i] = jobSkill[i]
    };
    tag[length] = addSkill;
    this.setData({
      jobSkill: tag,
      addSkill: null
    });
    wx.setStorageSync('jobSkill', this.data.jobSkill);
  },

  //删除职位技能标签
  deleteSkill: function (e) {
    var index = e.currentTarget.dataset.index;
    var jobSkill = this.data.jobSkill;
    jobSkill.splice(index, 1)
    this.setData({
      jobSkill: jobSkill
    })
    wx.setStorageSync('jobSkill', this.data.jobSkill)
  },

  //取消
  cancelBtn: function () {
    this.setData({
      addJob: {},
      jobSkill: null
    })
    wx.setStorageSync('addJob', this.data.addJob);
    wx.setStorageSync('jobSkill', this.data.jobSkill);
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  //确定
  determineBtn: function () {
    //判空
    let addJob = this.data.addJob;
    if (addJob.name == null) {
      wx.showToast({
        title: '职位名称不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (addJob.lowSalary == null) {
      wx.showToast({
        title: '最低薪资不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (addJob.highSalary == null) {
      wx.showToast({
        title: '最高薪资不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (addJob.city == null) {
      wx.showToast({
        title: '期望工作城市不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (addJob.experience == null) {
      wx.showToast({
        title: '经验要求不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (addJob.degree == null) {
      wx.showToast({
        title: '学历要求不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      //跳转
      this.setData({
        addJob: {},
        jobSkill: null
      })
      wx.setStorageSync('addJob', this.data.addJob);
      wx.setStorageSync('jobSkill', this.data.jobSkill);
      wx.reLaunch({
        url: '/pages/mine/mine',
      })
    }
  }




})