Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusIndex: 0,
    salaryIndex: 0,
    status: [
      "离职，随时到岗",
      "离职，考虑机会",
      "在职，月内到岗",
      "在职，考虑机会",
      "在职，暂不考虑"
    ],
    salary: [
      "不限",
      "3K以下",
      "3-5K",
      "5-10K",
      "10-20K",
      "20-50K",
      "50K以上"
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var statusIndex = wx.getStorageSync("statusIndex")
    var salaryIndex = wx.getStorageSync("salaryIndex")
    this.setData({
      statusIndex: statusIndex,
      salaryIndex: salaryIndex
    })
  },

  //求职状态改变
  bindStatusChange: function (e) {
    var statusIndex = e.detail.value
    var status = this.data.status[statusIndex]
    console.log("求职状态：", status)
    this.setData({
      statusIndex: statusIndex
    })
    wx.setStorageSync('statusIndex', statusIndex)
  },

  //薪资要求改变
  bindSalaryChange: function (e) {
    var salaryIndex = e.detail.value
    var salary = this.data.salary[salaryIndex]
    console.log("薪资要求：", salary)
    this.setData({
      salaryIndex: salaryIndex
    })
    wx.setStorageSync('salaryIndex', salaryIndex)
  },

})