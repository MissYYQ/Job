Page({

  /**
   * 页面的初始数据
   */
  data: {
    seminar: [{
        school: "九江学院",
        position: "望庐楼407",
        date: "2020/11/11",
        time: "10:30",
      },
      {
        school: "华东交通大学理工学院",
        position: "望庐楼407",
        date: "2020/11/11",
        time: "10:30",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  //查看
  toSeminarDetailsPage: function () {
    wx.navigateTo({
      url: '/pages/index/seminar/seminarDetails/seminarDetails',
    })
  },

  //编辑
  toAddSeminarPage: function () {
    wx.navigateTo({
      url: '/pages/mine/companyMine/addSeminar/addSeminar',
    })
  },




})