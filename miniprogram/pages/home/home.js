import { tool } from '../../js/tool.js'


Page({

  data: {

    dateBookingData: [],
    selectDate: '',
    dateshouru: 0,
    datezhichu: 0,
    start: '',
    end: '',
    monthshouru: 0,
    monthzhichu: 0,
    jieyu: {
      int: 0,
      decimal: '00'
    }

  },

  onShow: function () {
    var date = tool.formatDate(new Date());

    console.log('date ==> ', date);

    var start = date.slice(0, -2) + '01';

    this.setData({
      start: start,
      end: date
    })

    this.getBookingDatabyDate(date);
    this.getBookingDataByMonth(start, date);
  },

  getBookingDatabyDate: function (date) {
    wx.showLoading({
      title: '加载中...'
    })
    wx.cloud.callFunction({
      name: 'get_booking',
      data: {
        date: date
      },
      success: res => {
        wx.hideLoading();
        console.log('res ==> ', res);

        this.data.dateshouru = 0;
        this.data.datezhichu = 0;


        var d = date.split('-');

        res.result.data.forEach(v => {
          this.data['date' + v.titles.type] += Number(v.money);
          v.money= tool.thousandthPlace(v.money)
        })

        this.setData({
          dateBookingData: res.result.data,
          dateshouru: tool.thousandthPlace(this.data.dateshouru),
          datezhichu: tool.thousandthPlace(this.data.datezhichu),
          selectDate: d[1] + '月' + d[2] + '日'
        })
      },
      fail: err => {
        wx.hideLoading();
        console.log('err ==> ', err);
      }
    })
  },

  getDataByDate: function (e) {
    // console.log('e ==> ', e);
    var date = e.detail.value.split('-');
    // console.log('date ==> ', date);

    var d = date[1] + '月' + date[2] + '日';
    if (d == this.data.selectDate) {
      console.log('相同日期');
      return;
    }

    this.setData({
      selectDate: d
    })

    this.getBookingDatabyDate(e.detail.value);
  },
  getBookingDataByMonth: function (start, end) {
    

    wx.showLoading({
      title: '加载中...'
    })

    //调用云函数
    wx.cloud.callFunction({
      name: 'get_booking_bymonth',
      data: {
        start: start,
        end: end
      },
      success: res => {
        wx.hideLoading();
        console.log('res ==> ', res);

          this.data.monthshouru=0;
          this.data.monthzhichu=0;
        res.result.data.forEach(v => {
          this.data['month' + v.titles.type] += Number(v.money);
        })
      
        var jieyu = (this.data.monthshouru - this.data.monthzhichu).toFixed(2);

        console.log('jieyu ==> ', jieyu);


        var jieyuMoney = jieyu.split('.');
        console.log('jieyuMoney ==> ', jieyuMoney);



        this.setData({
          monthshouru: tool.thousandthPlace(this.data.monthshouru),
          monthzhichu: tool.thousandthPlace(this.data.monthzhichu),
          jieyu: {
            int: tool.thousandthPlace(jieyuMoney[0]),
            decimal: jieyuMoney[1]
          }
        })
      },
      fail: err => {
        wx.hideLoading();
        console.log('err ==> ', err);
      }
    })
  }


})