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
    var id = options.id;
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
      url: '/pages/index/jobDetails/jobDetails?id='+id,
    })
  },

  //编辑
  edit: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mine/companyMine/addJob/addJob?id='+id,
    })
  },

  delete:function(e){
    var id = e.currentTarget.dataset.id;
  },

  //添加
  toAddJobPage: function () {
    wx.navigateTo({
      url: '/pages/mine/companyMine/addJob/addJob',
    })
  },

})