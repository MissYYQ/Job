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
    //后台获取数据
    var that = this;
    wx.request({
      url: 'http://localhost:81/seminar/all',
      method: 'get',
      success: function (res) {
        console.log("获取宣讲会成功");
        console.log(res.data);
        that.setData({
          seminar: res.data,
        })
        //数据加工
        var seminar = that.data.seminar;
        var length = seminar.length;
        for (var i = 0; i < length; i++) {
          let logourl = seminar[i].company.logourl;
          let name = seminar[i].company.name;
          let company = "seminar[" + i + "].company";
          let companyName = "seminar[" + i + "].companyName";
          that.setData({
            [companyName]: name,
            [company]: logourl
          })
        }
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
        url: 'http://localhost:81/seminar/search',
        method: 'get',
        data: {
          key: key
        },
        success: function (res) {
          console.log("搜索成功");
          console.log(res.data);
          that.setData({
            seminar: res.data,
          })
          //数据加工
          var seminar = that.data.seminar;
          var length = seminar.length;
          for (var i = 0; i < length; i++) {
            let logourl = seminar[i].company.logourl;
            let name = seminar[i].company.name;
            let company = "seminar[" + i + "].company";
            let companyName = "seminar[" + i + "].companyName";
            that.setData({
              [companyName]: name,
              [company]: logourl
            })
          }
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

  //跳转至宣讲会详情页面
  toSeminarDetailsPage: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/seminar/seminarDetails/seminarDetails?id=' + id,
    })
  },



})