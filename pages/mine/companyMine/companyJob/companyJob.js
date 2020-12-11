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
    //获取公司在招职位
    var id = wx.getStorageSync('companyId');
    wx.request({
      url: 'http://localhost:81/job/jobForCompany',
      method: 'get',
      data: {
        id: id,
      },
      success: function (res) {
        that.setData({
          job: res.data,
        })
      },
    })
  },

  //查看
  look: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails?id=' + id,
    })
  },

  //编辑
  edit: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mine/companyMine/addJob/addJob?id=' + id,
    })
  },

  //删除
  delete: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:81/job/delete',
      method: 'get',
      data: {
        id: id,
      },
      success: function (res) {
        if (res.data) {
          //刷新当前页
          var pages = getCurrentPages();
          var currentPage = pages[pages.length - 1];
          currentPage.onLoad();
        }
      },
    })
  },

  //添加
  toAddJobPage: function () {
    wx.navigateTo({
      url: '/pages/mine/companyMine/addJob/addJob',
    })
  },

})