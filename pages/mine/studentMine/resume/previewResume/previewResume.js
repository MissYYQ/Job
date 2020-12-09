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
    var userId = options.userId;
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
          intentionJob: res.data,
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
          resumeFile: res.data,
        })
      }
    })
    //experience
    wx.request({
      url: 'http://localhost:81/experience/allByUser',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function (res) {
        that.setData({
          experience: res.data,
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

})