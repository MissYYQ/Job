var util = require('../../../../utils/util');

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
    //编辑
    if (options.id) {
      var id = options.id;
      that.setData({
        operation: "edit",
        id: id
      })
      wx.request({
        url: 'http://localhost:81/seminar/one',
        method: 'get',
        data: {
          id: id,
        },
        success: function (res) {
          that.setData({
            seminar: res.data
          })
        },
      })
    } else {
      //添加
      that.setData({
        operation: "add",
        seminar: {}
      })
    }
    //获取当前日期
    var nowDate = util.formatDate(new Date());
    this.setData({
      nowDate: nowDate,
    })
  },

  //添加宣讲会
  addSeminar: function (e) {
    var key = e.currentTarget.dataset.key;
    let name = "seminar." + key;
    this.setData({
      [name]: e.detail.value
    });
  },

  //日期picker改变
  dateChange: function (e) {
    this.setData({
      ['seminar.date']: e.detail.value,
    })
  },

  //时间picker改变
  timeChange: function (e) {
    this.setData({
      ['seminar.time']: e.detail.value
    })
  },

  //取消,返回上一页
  cancelBtn: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  //确定
  determineBtn: function () {
    //判空
    let seminar = this.data.seminar;
    if (seminar.location == null) {
      wx.showToast({
        title: '地点不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (seminar.date == null) {
      wx.showToast({
        title: '日期不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (seminar.time == null) {
      wx.showToast({
        title: '时间不能为空！',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      //提交
      var operation = this.data.operation;
      if (operation == "edit") {
        //更新
        var id = this.data.id;
        var companyId = wx.getStorageSync('companyId');
        wx.request({
          url: 'http://localhost:81/seminar/update',
          method: 'POST',
          data: {
            id: id,
            companyId: companyId,
            seminar: JSON.stringify(seminar)
          },
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data) {
              wx.showToast({
                title: '编辑成功',
                icon: 'none',
                duration: 1500,
                mask: true
              })
              // 刷新并返回上一页
              var pages = getCurrentPages();
              var beforePage = pages[pages.length - 2];
              beforePage.onLoad();
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      } else {
        //添加
        var companyId = wx.getStorageSync('companyId');
        wx.request({
          url: 'http://localhost:81/seminar/add',
          method: 'POST',
          data: {
            companyId: companyId,
            seminar: JSON.stringify(seminar)
          },
          dataType: 'json',
          contentType: 'application/json;charset=utf-8',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (res) {
            if (res.data) {
              wx.showToast({
                title: '添加成功',
                icon: 'none',
                duration: 1500,
                mask: true
              })
              // 刷新并返回上一页
              var pages = getCurrentPages();
              var beforePage = pages[pages.length - 2];
              beforePage.onLoad();
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      }
    }
  },


})