var app = getApp()
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

  },
  // 获取授权
  getUserAuthInfo:function(res){
    console.log('res==》',res)
    if(res.detail&&res.detail.userInfo){
      app.globalData.isAuth = true;
      wx.navigateBack({
        delta: 0,
      })
    }else{
      app.globalData.isAuth=false;
    }
  }
  
})