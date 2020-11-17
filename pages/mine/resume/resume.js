Page({

  /**
   * 页面的初始数据
   */
  data: {
    mark: '',
    isEdit: false,
    resume: {},
    educationBackground: {},
    intentionJob: {},
    professionalSkills: [],
    addSkill: '',
    experience: [],
    tempExperience: {},
    textareaValue: '',
    honor: [],
    addHonor: '',
    resumeFile: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      resume: wx.getStorageSync('resume'),
      educationBackground: wx.getStorageSync('educationBackground'),
      intentionJob: wx.getStorageSync('intentionJob'),
      professionalSkills: wx.getStorageSync('professionalSkills'),
      experience: wx.getStorageSync('experience'),
      resumeFile: wx.getStorageSync('resumeFile'),
      honor: wx.getStorageSync('honor'),
    })
    if (this.data.userInfo) {
      var province = this.data.userInfo.province;
      var city = this.data.userInfo.city;
      let hometown = province + city;
      this.setData({
        ['resume.hometown']: hometown
      })
    }
    var description = this.data.tempExperience.description;
    if (description) {
      this.setData({
        currentWordNumber: description.length
      })
    }
  },


  //编辑
  edit: function (e) {
    var isEdit = this.data.isEdit
    this.setData({
      mark: e.currentTarget.dataset.mark,
      isEdit: !isEdit
    })
  },

  //编辑基本信息
  editMsg: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "resume." + key;
    this.setData({
      [name]: e.detail.value
    })
    wx.setStorageSync('resume', this.data.resume)
  },

  //编辑教育背景
  editEB: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "educationBackground." + key;
    this.setData({
      [name]: e.detail.value
    })
    wx.setStorageSync('educationBackground', this.data.educationBackground)
  },

  //编辑求职意向
  editIJ: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "intentionJob." + key;
    this.setData({
      [name]: e.detail.value
    })
    wx.setStorageSync('intentionJob', this.data.intentionJob)
  },

  //编辑职业技能
  editPS: function (e) {
    if (e.detail.value) {
      this.setData({
        addSkill: e.detail.value
      })
    }
  },

  //添加技能
  addSkill: function (e) {
    var addSkill = this.data.addSkill;
    var professionalSkills = this.data.professionalSkills;
    var length = professionalSkills.length;
    var tag = [];
    for (var i = 0; i < length; i++) {
      tag[i] = professionalSkills[i]
    };
    tag[length] = addSkill;
    this.setData({
      professionalSkills: tag,
      addSkill: ''
    });
    wx.setStorageSync('professionalSkills', this.data.professionalSkills);
  },

  //删除技能
  deleteSkill: function (e) {
    var index = e.currentTarget.dataset.index;
    var professionalSkills = this.data.professionalSkills;
    professionalSkills.splice(index, 1)
    this.setData({
      professionalSkills: professionalSkills
    })
    wx.setStorageSync('professionalSkills', this.data.professionalSkills)
  },

  //输入域文本
  textareaInput: function (e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    this.setData({
      currentWordNumber: length,
      textareaValue: e.detail.value,
      ['tempExperience.description']: e.detail.value
    });
  },

  //编辑工作/项目经历
  editE: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "tempExperience." + key;
    this.setData({
      [name]: e.detail.value,
    });
  },

  //添加工作/项目经历
  addExperience: function (e) {
    var tempExperience = this.data.tempExperience;
    var experience = JSON.parse(JSON.stringify(this.data.experience));
    var length = experience.length;
    var tag = [];
    for (var i = 0; i < length; i++) {
      tag[i] = experience[i]
    }
    tag[length] = tempExperience;
    this.setData({
      experience: tag,
      tempExperience: {},
      textareaValue: ''
    });
    wx.setStorageSync('experience', this.data.experience);
    wx.setStorageSync('tempExperience', this.data.tempExperience);
  },

  //删除工作/项目经历
  deleteExperience: function (e) {
    var index = e.currentTarget.dataset.index;
    var experience = this.data.experience;
    experience.splice(index, 1)
    this.setData({
      experience: experience
    })
    wx.setStorageSync('experience', this.data.experience)
  },

  //编辑荣誉
  editH: function (e) {
    if (e.detail.value) {
      this.setData({
        addHonor: e.detail.value
      })
    }
  },

  //添加荣誉
  addHonor: function (e) {
    var addHonor = this.data.addHonor;
    var honor = this.data.honor;
    var length = honor.length;
    var tag = [];
    for (var i = 0; i < length; i++) {
      tag[i] = honor[i]
    };
    tag[length] = addHonor;
    this.setData({
      honor: tag,
      addHonor: ''
    });
    wx.setStorageSync('honor', this.data.honor);
  },

  //删除荣誉
  deleteHonor: function (e) {
    var index = e.currentTarget.dataset.index;
    var honor = this.data.honor;
    honor.splice(index, 1)
    this.setData({
      honor: honor
    })
    wx.setStorageSync('honor', this.data.honor)
  },

  //添加头像
  addAvatar: function () {
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
          ['resume.avatar']: filePath
        })
        wx.setStorageSync('resume', that.data.resume)
      }
    })
  },

  //添加简历附件
  addResume: function () {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        var resumeFile = res.tempFiles[0]; //文件的本地临时文件路径列表 
        that.setData({
          resumeFile: resumeFile
        });
        wx.setStorageSync('resumeFile', that.data.resumeFile);
      }
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

  //日期改变
  bindDateChange: function (e) {
    var key = e.currentTarget.dataset.key;
    if (key == 'birthday') {
      this.setData({
        ['resume.birthday']: e.detail.value
      })
      wx.setStorageSync('resume', this.data.resume)
    } else {
      let name = "tempExperience." + key;
      this.setData({
        [name]: e.detail.value
      })
      wx.setStorageSync('tempExperience', this.data.tempExperience)
    }
  },

  //重置
  resetBtn: function () {
    var mark = this.data.mark
    console.log("重置", mark)
    this.setData({
      [mark]: ''
    })
    if (mark == basicInformation) {
      wx.setStorageSync("basicInformation", this.data.basicInformation)
    }
    if (mark == educationBackground) {
      wx.setStorageSync("educationBackground", this.data.educationBackground)
    }
    if (mark == intentionJob) {
      wx.setStorageSync("intentionJob", this.data.intentionJob)
    }
    if (mark == professionalSkills) {
      wx.setStorageSync("professionalSkills", this.data.intentionJob)
    }
  },

  //编辑确定按钮
  editOverBtn: function () {
    this.setData({
      isEdit: false
    })
  },

  //跳转至首页
  toIndexPage: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

})