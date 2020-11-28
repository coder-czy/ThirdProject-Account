// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detailBookingData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 截取参数
    var ids = options.ids;
    this.getBookingDataByIds(ids)

  },
  getBookingDataByIds:function(ids){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:'get_booking_byids',
      data:{
        ids:ids
      },
      success:res=>{
        wx.hideLoading();
        console.log('res==>',res)
        this.setData({
          detailBookingData:res.result.data
        })
      },
      fail:err=>{
        console.log('err==>',err)
      }
    })
  }

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
})