import { tool } from '../../js/tool.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        epidemic: {

        }
    },

    onLoad: function() {
        wx.showLoading({
            title: '加载中...',
        })

        wx.request({
            url: 'https://api.tianapi.com/txapi/ncov/index',
            data: {
                key: '天行数据的key'
            },
            success: res => {
                wx.hideLoading()
                console.log('res==>', res)
                var epidemic = res.data.newslist[0].desc
                var date = tool.formatDate(new Date(epidemic.modifyTime))

                this.setData({
                    epidemic: {
                        date: date,
                        currentConfirmedCount: epidemic.currentConfirmedCount,
                        confirmedCount: epidemic.confirmedCount,
                        suspectedCount: epidemic.suspectedCount,
                        curedCount: epidemic.curedCount,
                        deadCount: epidemic.deadCount,
                        seriousCount: epidemic.seriousCount,
                        suspectedIncr: epidemic.suspectedIncr,
                        currentConfirmedIncr: epidemic.currentConfirmedIncr,
                        confirmedIncr: epidemic.confirmedIncr,
                        curedIncr: epidemic.curedIncr,
                        deadIncr: epidemic.deadIncr,
                        seriousIncr: epidemic.seriousIncr,
                        globalConfirmedCount: epidemic.globalStatistics.confirmedCount,
                        globalConfirmedIncr: epidemic.globalStatistics.confirmedIncr

                    }
                })
            },
            fail: err => {
                wx.hideLoading()
                console.log('err==>', err)

            }
        })
    }
})