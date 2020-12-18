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
    //获取公司宣讲会信息
    var companyId = wx.getStorageSync('companyId');
    wx.request({
      url: 'http://localhost:81/seminar/allForCompany',
      method: 'get',
      data: {
        companyId: companyId,
      },
      success: function (res) {
        that.setData({
          seminar: res.data,
        })
        if (that.data.seminar.length >= 1) {
          that.setData({
            empty: false
          })
        } else {
          that.setData({
            empty: true
          })
        }
      },
    })
  },


  //查看
  look: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/seminar/seminarDetails/seminarDetails?id=' + id,
    })
  },

  //编辑
  edit: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mine/companyMine/addSeminar/addSeminar?id=' + id,
    })
  },

  //删除
  delete: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:81/seminar/delete',
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
  toAddSeminarPage: function () {
    wx.navigateTo({
      url: '/pages/mine/companyMine/addSeminar/addSeminar',
    })
  },




})