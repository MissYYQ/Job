Page({

  /**
   * 页面的初始数据
   */
  data: {
    mark: '',
    isEdit: false,
    addSkill: '',
    addHonor: '',
    textareaValue: '',
    salary: [
      "不限",
      "3K以下/月",
      "3-5K/月",
      "5-10K/月",
      "10-20K/月",
      "20-50K/月",
      "50K以上/月",
    ],
    experience: [],
    tempExperience: {},
    // resumeFile: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userId = wx.getStorageSync("userInfo").id;
    //student
    wx.request({
      url: 'http://localhost:81/student/one',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          resume: res.data
        })
        //数据处理
        if (that.data.resume.skills) {
          if (that.data.resume.skills) {
            var skillsArr = that.data.resume.skills.split("、")
            let skills = "resume.skills"
            that.setData({
              [skills]: skillsArr,
            })
          }
          if (that.data.resume.honor) {
            var honorArr = that.data.resume.honor.split("、")
            let honor = "resume.honor"
            that.setData({
              [honor]: honorArr
            })
          }
          var educationArr = that.data.resume.education.split("、")
          var school = educationArr[0]
          var profession = educationArr[1]
          var degree = educationArr[2]
          let rschool = "resume.education.school"
          let rprofession = "resume.education.profession"
          let rdegree = "resume.education.degree"
          that.setData({
            [rschool]: school,
            [rprofession]: profession,
            [rdegree]: degree
          })
        }
      }
    })
    //intentionJob
    wx.request({
      url: 'http://localhost:81/intention/one',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          intentionJob: res.data
        })
      }
    })
    //resumefile
    wx.request({
      url: 'http://localhost:81/resumefile/one',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          resumeFile: res.data
        })
      }
    })
    //字数
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
  },

  //编辑教育背景
  editEB: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "resume.education." + key;
    this.setData({
      [name]: e.detail.value
    })
  },

  //编辑求职意向
  editIJ: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "intentionJob." + key;
    this.setData({
      [name]: e.detail.value
    })
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
    if (this.data.resume.skills) {
      var skillsArr = this.data.resume.skills;
    } else {
      var skillsArr = new Array();
    }
    if (skillsArr) {
      skillsArr.push(addSkill)
    }
    let resume = "resume.skills";
    this.setData({
      [resume]: skillsArr,
      addSkill: ''
    });
  },

  //删除技能
  deleteSkill: function (e) {
    var index = e.currentTarget.dataset.index;
    var skills = this.data.resume.skills;
    skills.splice(index, 1)
    let resume = "resume.skills";
    this.setData({
      [resume]: skills
    })
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
    if (this.data.resume.honor) {
      var honor = this.data.resume.honor;
    } else {
      var honor = new Array();
    }
    if (honor) {
      honor.push(addHonor)
    }
    let resume = "resume.honor";
    this.setData({
      [resume]: honor,
      addHonor: ''
    });
  },

  //删除荣誉
  deleteHonor: function (e) {
    var index = e.currentTarget.dataset.index;
    var honor = this.data.resume.honor;
    honor.splice(index, 1)
    let resume = "resume.honor";
    this.setData({
      [resume]: honor
    })
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
    } else {
      let name = "tempExperience." + key;
      this.setData({
        [name]: e.detail.value
      })
    }
  },

  //薪资改变
  bindSalaryChange: function (e) {
    this.setData({
      ['intentionJob.salary']: this.data.salary[e.detail.value]
    })
  },

  //编辑确定按钮
  editOverBtn: function () {
    this.setData({
      isEdit: false
    })
  },

  //简历编辑完成
  onlineResume: function () {
    var that = this;
    //数据处理
    var skills = this.data.resume.skills.join("、");
    let rskills = "resume.skills";
    var honor = this.data.resume.honor.join("、");
    let rhonor = "resume.honor";
    var education = this.data.resume.education.school + "、" + this.data.resume.education.profession + "、" + this.data.resume.education.degree;
    let reducation = "resume.education";
    this.setData({
      [rskills]: skills,
      [rhonor]: honor,
      [reducation]: education,
    })
    //后台处理
    var userId = wx.getStorageSync("userInfo").id;
    //学生
    var resume = this.data.resume;
    wx.request({
      url: 'http://localhost:81/student/edit',
      method: 'POST',
      data: {
        userId: userId,
        resume: JSON.stringify(resume)
      },
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data, "student保存成功")
          that.onLoad();
        }
      }
    })
    //求职意向
    var intentionJob = this.data.intentionJob;
    wx.request({
      url: 'http://localhost:81/intention/edit',
      method: 'POST',
      data: {
        userId: userId,
        intentionJob: JSON.stringify(intentionJob)
      },
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data, "intentionJob保存成功")
          that.onLoad();
        }
      }
    })
    //附件简历
    var resumeFile = this.data.resumeFile;
    wx.request({
      url: 'http://localhost:81/resumefile/edit',
      method: 'POST',
      data: {
        userId: userId,
        resumeFile: JSON.stringify(resumeFile)
      },
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data) {
          console.log(res.data, "resumeFile保存成功")
          that.onLoad();
        }
      }
    })
  },

  //跳转至首页
  toIndexPage: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

})