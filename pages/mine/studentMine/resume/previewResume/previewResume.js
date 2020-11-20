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
  },

})