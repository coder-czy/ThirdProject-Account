//导入tool.js
import { tool } from '../../js/tool.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    allBookingData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllBookingData();
  },


  getAllBookingData: function () {
    wx.showLoading({
      title: '加载中...'
    })

    wx.cloud.callFunction({
      name: 'get_booking',
      success: res => {
        wx.hideLoading();

        res.result.data.forEach(v => {
          v.money = tool.thousandthPlace(v.money);
        })

        res.result.data.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        })

        this.setData({
          allBookingData: res.result.data
        })

        console.log('res ==> ', res);
      },
      fail: err => {
        wx.hideLoading();
        console.log('err ==> ', err);
      }
    })
  },

  removeBookingData: function (e) {
    console.log('e ==> ', e);
    wx.showLoading({
      title: '加载中...'
    })

    wx.cloud.callFunction({
      name: 'remove_booking',
      data: {
        id: e.currentTarget.dataset.id
      },
      success: res => {
        wx.hideLoading();
        console.log('res ==> ', res);
        if (res.result.stats.removed == 1) {
          this.data.allBookingData.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            allBookingData: this.data.allBookingData
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: err => {
        wx.hideLoading();
        console.log('err ==> ', err);
      }
    })
  }

})