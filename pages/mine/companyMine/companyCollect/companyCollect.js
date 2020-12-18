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
    wx.request({
      url: 'http://localhost:81/student/collectUser',
      method: 'get',
      data: {
        companyId: wx.getStorageSync('companyId')
      },
      success: function (res) {
        if (res.data) {
          that.setData({
            student: res.data
          })
          if (that.data.student.length >= 1) {
            that.setData({
              empty: false
            })
          } else {
            that.setData({
              empty: true
            })
          }
          //数据处理
          for (var i = 0; i < that.data.student.length; i++) {
            if (that.data.student[i].skills) {
              var skillsArr = that.data.student[i].skills.split("、");
              let student = "student[" + i + "].skills";
              that.setData({
                [student]: skillsArr,
              })
            }
            var educationArr = that.data.student[i].education.split("、");
            var school = educationArr[0];
            var profession = educationArr[1];
            var degree = educationArr[2];
            let s = "student[" + i + "].education.school";
            let p = "student[" + i + "].education.profession";
            let d = "student[" + i + "].education.degree";
            that.setData({
              [s]: school,
              [p]: profession,
              [d]: degree
            })
          }
        }
      }
    })
  },

  //跳转至预览简历页面
  toPreviewResumePage: function (e) {
    var userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/mine/studentMine/resume/previewResume/previewResume?userId=' + userId,
    })
  },

})