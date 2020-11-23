Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentData: [{
        school: "九江学院",
        degree: "本科",
        profession: "计算机科学与技术",
        name: "姜先生",
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "微信小程序",
          "SpringMVC",
          "BootStrap"
        ]
      },
      {
        school: "南昌大学",
        degree: "本科",
        profession: "软件工程",
        name: "南笙Y",
        skills: [
          "Java",
          "JavaScript",
          "SSM",
          "SpringMVC",
          "BootStrap"
        ]
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //跳转至预览简历页面
  toPreviewResumePage: function () {
    wx.navigateTo({
      url: '/pages/mine/studentMine/resume/previewResume/previewResume',
    })
  },

})