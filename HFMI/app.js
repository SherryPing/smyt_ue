//app.js
App({
  onLaunch: function () {
    var that=this
    that.login(that);
    // wx.getUserInfo({
    //   success: res => {
    //     that.globalData.userInfo = res.userInfo
    //     that.login(that);
    //   }
    // });
   
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    // this.globalData.statistic_month = getNowFormatDate();
  },
  login:function(that){
    // 登录
    //登录获取code    
        wx.login({
          success: res2 => {
            console.log(res2);
            if (res2.code) {
              var code = res2.code;
              //发起网络请求 获取用户唯一的id
              wx.request({
                url: this.globalData.apiPath + '/wechat_login/',
                method: "POST",
                data: {
                  code: res2.code
                },
                success: res3 => {
                  console.log(res3)
                  that.globalData.userId = res3.data.openid;
                }
              })
            }
          }
        })    
  },
  globalData: {
    userInfo: null,
    userId: "", //用户id
    apiPath: "https://wx.fofpower.com/hfmi",
    statistic_month:"2018-05",
    auth:false
  },
})
// function getNowFormatDate() {
//   var date = new Date();
//   var seperator1 = "-";
//   var year = date.getFullYear();
//   var month = date.getMonth();
//   if (month >= 1 && month <= 9) {
//     month = "0" + month;
//   }
//   var currentdate = year + seperator1 + month;
//   return currentdate;
// }