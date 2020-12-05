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
      url: 'http://localhost:81/job/hotJob',
      method: 'get',
      success: function (res) {
        console.log("获取热门职位成功");
        console.log(res.data);
        that.setData({
          job: res.data,
        })
      },
    })
  },

  //搜索内容
  inputVal: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //清空搜索
  clearInput: function () {
    this.setData({
      inputVal: null
    });
  },

  //搜索
  search: function () {
    var key = this.data.inputVal
    if (key != "") {
      var that = this;
      wx.request({
        url: 'http://localhost:81/job/hotJobSearch',
        method: 'get',
        data: {
          key: key
        },
        success: function (res) {
          console.log("搜索成功");
          console.log(res.data);
          that.setData({
            job: res.data,
          })
        },
      })
    } else {
      wx.showToast({
        title: '搜索内容不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }

  },

  //跳转至职位详情页面
  toJobDetailsPage: function (e) {
    var id = e.currentTarget.dataset.id;
    //预览量加一
    wx.request({
      url: 'http://localhost:81/job/addPageviews',
      method: 'post',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    wx.navigateTo({
      url: '/pages/index/jobDetails/jobDetails?id=' + id
    })
  },


})