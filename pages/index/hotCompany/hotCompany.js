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
      url: 'http://localhost:81/company/hotCompany',
      method: 'get',
      success: function (res) {
        console.log("获取热门公司成功");
        console.log(res.data);
        that.setData({
          company: res.data,
        })
        //字符串转数组
        let length = res.data.length;
        for (var i = 0; i < length; i++) {
          if (that.data.company[i].welfare) {
            var welfareArr = that.data.company[i].welfare.split("、");
            let welfare = "company[" + i + "].welfare"
            that.setData({
              [welfare]: welfareArr,
            })
          }
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
        url: 'http://localhost:81/company/hotCompanySearch',
        method: 'get',
        data: {
          key: key
        },
        success: function (res) {
          console.log("搜索成功");
          console.log(res.data);
          that.setData({
            company: res.data,
          })
          //字符串转数组
          let length = res.data.length;
          for (var i = 0; i < length; i++) {
            if (that.data.company[i].welfare) {
              var welfareArr = that.data.company[i].welfare.split("、");
              let welfare = "company[" + i + "].welfare"
              that.setData({
                [welfare]: welfareArr,
              })
            }
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

  //跳转至公司详情页面
  toCompanyDetailsPage: function (e) {
    var id = e.currentTarget.dataset.id;
    //预览量加一
    wx.request({
      url: 'http://localhost:81/company/addPageviews',
      method: 'post',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    wx.navigateTo({
      url: '/pages/mine/companyMine/companyData/companyDetails/companyDetails?id=' + id,
    })
  },

})