// 获取应用实例
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal: null,
    city: '',
    history: [],
    hotCity: [{
        color: "#D28668",
        city: "北京"
      },
      {
        color: "#ED9A77",
        city: "上海"
      },
      {
        color: "#D8B368",
        city: "杭州"
      },
      {
        color: "#4C446E",
        city: "深圳"
      },
      {
        color: "#6E6694",
        city: "广州"
      },
      {
        color: "#D28668",
        city: "成都"
      },
      {
        color: "#ED9A77",
        city: "南京"
      },
      {
        color: "#D8B368",
        city: "武汉"
      }
    ],
    hotJob: [{
        color: "#9AB357",
        key: "UI设计师"
      },
      {
        color: "#5C978F",
        key: "前端"
      },
      {
        color: "#F5E28E",
        key: "Java开发"
      },
      {
        color: "#D0E467",
        key: "插画师"
      },
      {
        color: "#EFAF75",
        key: "动画设计"
      },
      {
        color: "#C77256",
        key: "会计"
      },
      {
        color: "#606D2C",
        key: "计算机软件"
      },
      {
        color: "#6EA5A0",
        key: "高级建筑工程师"
      },
    ]
  },

  onLoad: function () {
    var that = this
    // 加载定位城市
    var city = wx.getStorageSync('userInfo').city
    if (city) {
      that.setData({
        city: city
      })
    }
    //加载缓存搜索历史
    let history = wx.getStorageSync('history')
    that.setData({
      history: history
    })
  },

  // 清空
  clearInput: function () {
    this.setData({
      inputVal: null
    });
  },

  //输入的内容
  inputVal: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //搜索按钮点击事件
  search_btn: function () {
    var inputVal = this.data.inputVal;
    wx.setStorageSync('inputVal', this.data.inputVal);
    if (inputVal) {
      //缓存到历史记录
      var history = this.data.history;
      var length = history.length;
      var obj = inputVal
      var tag = []
      tag[0] = obj;
      for (var i = 1; i <= length; i++) {
        tag[i] = history[length - i]
      }
      this.setData({
        history: tag
      })
      wx.setStorageSync('history', this.data.history);
      //页面跳转
      wx.switchTab({
        url: '../../index/index?inputVal=' + inputVal,
      })
      console.log("===========搜索内容===========")
      console.log(inputVal)
    } else {
      wx.showToast({
        title: '搜索内容不能为空哦^_^',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },

  //历史搜索点击事件
  history: function (e) {
    var index = e.currentTarget.dataset.index
    var inputVal = this.data.history[index].key
    this.setData({
      inputVal: inputVal
    })
    wx.setStorageSync('inputVal', this.data.inputVal)
  },

  //热门城市的选择
  hotCity: function (e) {
    var index = e.currentTarget.dataset.index
    var city = this.data.hotCity[index].city
    console.log(city)
    this.setData({
      city: city
    })
    app.globalData.city = city
    wx.setStorageSync('city', this.data.city)
  },
  
  //热门职位的选择
  hotJob: function (e) {
    var index = e.currentTarget.dataset.index
    var job = this.data.hotJob[index].key
    this.setData({
      inputVal: job
    })
  },


})