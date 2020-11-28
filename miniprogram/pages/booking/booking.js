import {tool}from '../../js/tool.js'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:[
      {
        title:'收入',
        type:'shouru',
        isActive:true
      },
      {
        title:'支出',
        type:'zhichu',
        isActive:false
      }
    ],
    bookingIconsData :[],
    accountData:[
      {
        title:'现金',
        isActive:true
      },
      {
        title:'支付宝',
        isActive:false
      },
      {
        title:'微信',
        isActive:false
      },
      {
        title:'信用卡',
        isActive:false
      },
      {
        title:'储蓄卡',
        isActive:false
      },
    ],
    date:'请选择日期',
    end:'',
    money:'',
    comment:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // 获取当前时键
  // var currentDate = new Date();
  // var year = currentDate.getFullYear();
  // var month = currentDate.getMonth();
  // month=month >10 ?month : '0'+month
  // var date = currentDate.getDate();
  // date = date > 10 ? date : '0' + date
  var date = new Date()
  var end = tool.formatDate(date)
  this.setData({
    end:end
  })

  this.getBookingIcons();
  },
  toggleTitle:function(e){
   this.toggle(e,'titles')
  },
  toggleIcons:function(e){
    this.toggle(e,'bookingIconsData')
  },
  toggleAccount:function(e){
    this.toggle(e,'accountData')
  },
  // 切换的公共方法
  toggle:function(e,dataKey){
    if (e.currentTarget.dataset.active) {
      return;
    }
    for (var i = 0; i < this.data[dataKey].length; i++) {
      if (this.data[dataKey][i].isActive) {
        this.data[dataKey][i].isActive = false;
        break;
      }
    }
    this.data[dataKey][e.currentTarget.dataset.index].isActive = true;
    this.setData({
      [dataKey]: this.data[dataKey]
    })
  },
  // 获取云端图片
  getBookingIcons:function(){
    wx.showLoading({
      title: '加载中...'
    })
    wx.cloud.callFunction({
      name:'get_bookingIcons',

      success: res =>{
        wx.hideLoading();
        console.log('res=>',res)
        res.result.data.forEach(v=>{
          v.isActive=false
        })
        this.setData({
          bookingIconsData:res.result.data
        })
      },
      fail:res=>{
        wx.hideLoading();
        console.log('err=>',err)
      }
    })

  },
  selectDate:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  modifyMoney:function(e){
    console.log(e)
    this.setData({
      money:e.detail.value
    })
  },

  modifyComment: function (e) {
    console.log(e)
    this.setData({
      comment: e.detail.value
    })
  },

// 保存
  save:function(){

    var isAuth = app.globalData.isAuth;
    console.log('isAuth==>',isAuth)
    if(!isAuth){
      wx.navigateTo({
        url: '../auth/auth',
      })
      return
    }
    // 类型
    var typeIcons='';

    var iconsData=this.data.bookingIconsData;
    for(var i=0;i<iconsData.length;i++){
      if(iconsData[i].isActive){
        typeIcons={
          title:iconsData[i].title,
          type:iconsData[i].type,
          icon:iconsData[i].icon
        };
        break;
      }
    }
    if(typeIcons==''){
      wx.showToast({
        title: '请选择记账类型',
        icon:'none',
        duration:2000
      })
      return;
    }
    if(this.data.date=='请选择日期'){
      wx.showToast({
        title: '请填写日期',
        icon:'none',
        duration:2000
      })
      return;
    }
    if(this.data.money=='' || parseFloat(this.data.money)==0){
      wx.showToast({
        title: '请填写金额且不能为0',
        icon: 'none',
        duration: 2000
      })
      return;

    }

    var data ={
      typeIcons:typeIcons,
      date:this.data.date,
      money:this.data.money,
      comment:this.data.comment
    };
  // 收入支出
    for(var j=0;j<this.data.titles.length;j++){
      if(this.data.titles[j].isActive){
        data.titles={
          title:this.data.titles[j].title,
          type:this.data.titles[j].type
        }
        break;
      }
    }
    // 账户选择
    for(var k=0;k<this.data.accountData.length;k++){
      if(this.data.accountData[k].isActive){
        data.account=this.data.accountData[k].title;
      }
    }
      console.log('data==>',data)

    wx.showLoading({
      title: '加载中...'
    })
      wx.cloud.callFunction({
        name:'add_booking',
        data:data,
        success:res=>{
          wx.hideLoading()
          wx.showToast({
            title: '记账成功',
            icon: 'success',
            duration: 2000
          })
          console.log('res==>',res)
        },
        fail:err=>{
          wx.hideLoading()
          console.log('ecent==>',e)
        }
      })
  }
})