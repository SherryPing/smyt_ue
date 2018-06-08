//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    auth:false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  goToFill: function () {  
      wx.navigateTo({
        url: '../infoFill/infoFill'
      })
  },
  goToReport: function () {
      wx.navigateTo({
        url: '../report/report'
      })
  },
  onShareAppMessage: function (res) {
    return {
      title: '',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  onLoad: function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      app.login(app);
    }else{
      wx.navigateBack({
        delta: -1
      })
    }
  },
  onReady: function () {
   
  },
  onShow: function () {
    var that = this;
    setTimeout(function () {
      wx.request({
        url: app.globalData.apiPath + '/questionnaire',
        method: "GET",
        data: {
          user_id: app.globalData.userId,
          statistic_month: app.globalData.statistic_month
        },
        success: res => {
          if (res.data.success) {
            if (res.data.questionnaire_list) {
              that.setData({
                auth: true,
              })
              app.globalData.auth = true;
            }
          }
        }
      })
    }, 1000)   
  },
 
})
