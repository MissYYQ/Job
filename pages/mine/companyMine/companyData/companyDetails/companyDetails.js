Page({

  /**
   * 页面的初始数据
   */
  data: {
    communicationNum: 0,
    interviewNum: 0,
    favoritesNum: 0,
    jobNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    //后台获取公司详情
    wx.request({
      url: 'http://localhost:81/company/one',
      method: 'get',
      data: {
        id: id,
      },
      success: function (res) {
        console.log("获取公司详情成功");
        console.log(res);
        that.setData({
          company: res.data,
          welfare: res.data.welfare
        })
        //字符串转数组
        if (that.data.welfare) {
          var welfare = that.data.welfare;
          var welfareArr = welfare.split("、")
          that.setData({
            welfare: welfareArr,
          })
        }
      },
    })
    //获取公司在招职位
    wx.request({
      url: 'http://localhost:81/job/jobForCompany',
      method: 'get',
      data: {
        id: id,
      },
      success: function (res) {
        console.log("获取公司在招职位成功");
        console.log(res);
        that.setData({
          job: res.data,
        })
      },
    })

  },

  //跳转至职位详情页面
  toJobDetailsPage: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails?id=' + id
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})