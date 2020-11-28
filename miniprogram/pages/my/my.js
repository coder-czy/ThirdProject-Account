var app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      {
        title: '我的记账',
        page: 'mybooking'
      },
      {
        title: '疫情监控',
        page: 'epidemic'
      }
    ],
    userInfo:{}
  },
  onShow:function(){
var isAuth = app.globalData.isAuth;
if(isAuth){
  // 需授权才可使用
  wx.getUserInfo({
    success:res=>{
      console.log('res==>',res)
      this.setData({
        userInfo:{
          img:res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        }
      })
    }
  })
}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goPage(e) {
    console.log('e ==> ', e);
    var pageName = e.currentTarget.dataset.page;
    var url = '../' + pageName + '/' + pageName;
    console.log(url)
    wx.navigateTo({
      url: url
    })
  }

})