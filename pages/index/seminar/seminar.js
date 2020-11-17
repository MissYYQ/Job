Page({

  /**
   * 页面的初始数据
   */
  data: {
    seminarList:[
      {
        logoImgUrl:"/images/index/hotCompany.png",
        companyName:"云程科技",
        school: "九江学院",
        position: "望庐楼407",
        date: "2020-11-11",
        time: "10:30",
      },
      {
        logoImgUrl:"/images/index/hotCompany.png",
        companyName:"云程科技",
        school: "九江学院",
        position: "望庐楼407",
        date: "2020-11-11",
        time: "10:30",
      },
      {
        logoImgUrl:"/images/index/hotCompany.png",
        companyName:"云程科技",
        school: "九江学院",
        position: "望庐楼407",
        date: "2020-11-11",
        time: "10:30",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    //跳转至宣讲会详情页面
    toSeminarDetailsPage:function(){
      wx.navigateTo({
        url: '/pages/index/seminar/seminarDetails/seminarDetails',
      })
    },


    
})