// pages/fill.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manage_assets: [],
    manage_num:0,
    //股票类
    stock: [
      {
        index: 5,
        name: "相较上月，本月股票类策略的配比情况？",
        value: ["增加", "基本持平", "减少"],
      },
      {
        index: 6,
        name: "相较上月，本月月末您所管理产品的股票资产仓位变化情况？",
        value: ["增加", "基本持平", "减少"],
      },
      {
        index: 7,
        name: "相较上月，贵公司股票账户融资融券占比情况？",
        value: ["增加", "基本持平", "减少", "无此类资产"],
      },
      {
        index: 8,
        name: "您对于大盘股下月行情判断？",
        value: ["看涨", "窄幅震荡", "看跌", "不确定"],
      },
      {
        index: 9,
        name: "您对于中小盘股下月行情判断？",
        value: ["看涨", "窄幅震荡", "看跌", "不确定"],
      },
    ],
    //债券固收类
    bond: [
      {
        index: 10,
        name: "相较上月，本月债券固收类策略的配比情况？",
        value: ["增加", "基本持平", "减少"],
      },
      {
        index: 11,
        name: "相较上月，本月月末您所管理产品的债券固收类资产仓位变化情况？",
        value: ["增加", "基本持平", "减少"],
      },
      {
        index: 12,
        name: "相较上月，贵公司债券质押式回购占比情况？",
        value: ["增加", "基本持平", "减少", "无此类资产"],
      },
      {
        index: 13,
        name: "您对于债市下月行情判断？",
        value: ["看涨", "窄幅震荡", "看跌", "不确定"],
      }
    ],
    //商品期货类
    future: [
      {
        index: 14,
        name: "相较上月，本月商品期货类策略的配比情况？",
        value: ["增加", "基本持平", "减少"],
      },
      {
        index: 15,
        name: "相较上月，本月月末您所管理产品的商品期货类资产仓位变化情况？",
        value: ["增加", "基本持平", "减少"],
      },
      {
        index: 16,
        name: "您对于下月基差的预期？",
        value: ["扩大", "基本持平", "收窄", "不确定"],
      },
      {
        index: 17,
        name: "您对于“黑色系”期货市场下月行情判断？",
        value: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"],
      },
      {
        index: 18,
        name: "您对于“农产品”期货市场下月行情判断？",
        value: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"],
      },
      {
        index: 19,
        name: "您对于“有色”期货市场下月行情判断？",
        value: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"],
      },
      {
        index: 20,
        name: "您对于“能化”期货市场下月行情判断？",
        value: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"],
      }
    ],
    //必答题
    questionnaire_list: [
      {
        index: 1,
        name: "相较上月，贵公司本月资产管理总规模变化情况？",
        value: ["增加", "基本持平","减少"],
      },
      {
        index: 2,
        name: "相较上月，本月来访贵公司尽调的机构投资者数量变化情况？",
        value: ["增加", "基本持平", "减少"],
      },
      {
        index: 3,
        name: "今年以来，贵公司累计新发产品数量同比情况？",
        value: ["增加", "基本持平", "减少"],
      },
      {
        index: 4,
        name: "今年以来，贵公司新研发策略上线数量同比情况？",
        value: ["增加", "基本持平", "减少"],
      },      
    ], 
    // questionnaire_list2: [],//用于提交
    list3:false,//用于判断是否需要接收选项
    // questionnaire_list3: [ //用于接收--假数据
    //   { index: "1", name: "相较上月，贵公司本月资产管理总规模变化情况？", value: "增加" },
    //   { index: "2", name: "相较上月，本月来访贵公司尽调的机构投资者数量变化情况？", value: "基本持平" },
    //   { index: "3", name: "今年以来，贵公司累计新发产品数量同比情况？", value: "基本持平" },
    //   { index: "4", name: "今年以来，贵公司新研发策略上线数量同比情况？", value: "增加" },
    //   { index: "5", name: "相较上月，本月股票类策略的配比情况？", value: "基本持平" },
    //   { index: "6", name: "相较上月，本月月末您所管理产品的股票资产仓位变化情况？", value: "增加" },
    //   { index: "7", name: "相较上月，贵公司股票账户融资融券占比情况？", value: "减少" },
    //   { index: "8", name: "您对于大盘股下月行情判断？", value: "窄幅震荡" },
    //   { index: "9", name: "您对于中小盘股下月行情判断？", value: "窄幅震荡" },
    //   { index: "10", name: "相较上月，本月债券固收类策略的配比情况？", value: "基本持平" },
    //   { index: "11", name: "相较上月，本月月末您所管理产品的债券固收类资产仓位变化情况？", value: "增加" },
    //   { index: "12", name: "相较上月，贵公司债券质押式回购占比情况？", value: "基本持平" },
    //   { index: "13", name: "您对于债市下月行情判断？", value: "看涨" },
    //   { index: "14", name: "相较上月，本月商品期货类策略的配比情况？", value: "增加" },
    //   { index: "15", name: "相较上月，本月月末您所管理产品的商品期货类资产仓位变化情况？", value: "增加" },
    //   { index: "16", name: "您对于下月基差的预期？", value: "收窄" },
    //   { index: "17", name: "您对于“黑色系”期货市场下月行情判断？", value: "下跌趋势明显" },
    //   { index: "18", name: "您对于“农产品”期货市场下月行情判断？", value: "窄幅震荡" },
    //   { index: "19", name: "您对于“有色”期货市场下月行情判断？", value: "下跌趋势明显" },
    //   { index: "20", name: "您对于“能化”期货市场下月行情判断？", value: "上涨趋势明显" }
    // ],
    base1:[
      { index: 1, name: "相较上月，贵公司本月资产管理总规模变化情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 2, name: "相较上月，本月来访贵公司尽调的机构投资者数量变化情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 3, name: "今年以来，贵公司累计新发产品数量同比情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 4, name: "今年以来，贵公司新研发策略上线数量同比情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
    ],
    stock1:[
      { index: 5, name: "相较上月，本月股票类策略的配比情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 6, name: "相较上月，本月月末您所管理产品的股票资产仓位变化情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 7, name: "相较上月，贵公司股票账户融资融券占比情况？", value: "", value_all: ["增加", "基本持平", "减少", "无此类资产"] },
      { index: 8, name: "您对于大盘股下月行情判断？", value: "", value_all: ["看涨", "窄幅震荡", "看跌", "不确定"] },
      { index: 9, name: "您对于中小盘股下月行情判断？", value: "", value_all: ["看涨", "窄幅震荡", "看跌", "不确定"] },
    ],
    bond1:[
      { index: 10, name: "相较上月，本月债券固收类策略的配比情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 11, name: "相较上月，本月月末您所管理产品的债券固收类资产仓位变化情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 12, name: "相较上月，贵公司债券质押式回购占比情况？", value: "", value_all: ["增加", "基本持平", "减少", "无此类资产"] },
      { index: 13, name: "您对于债市下月行情判断？", value: "", value_all: ["看涨", "窄幅震荡", "看跌", "不确定"] },
    ],
    future1:[
      { index: 14, name: "相较上月，本月商品期货类策略的配比情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 15, name: "相较上月，本月月末您所管理产品的商品期货类资产仓位变化情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 16, name: "您对于下月基差的预期？", value: "", value_all: ["扩大", "基本持平", "收窄", "不确定"] },
      { index: 17, name: "您对于“黑色系”期货市场下月行情判断？", value: "", value_all: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"] },
      { index: 18, name: "您对于“农产品”期货市场下月行情判断？", value: "", value_all: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"] },
      { index: 19, name: "您对于“有色”期货市场下月行情判断？", value: "", value_all: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"] },
      { index: 20, name: "您对于“能化”期货市场下月行情判断？", value: "", value_all: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"] }
    ],
    questionnaire_list2: [ //用于提交
      { index: 1, name: "相较上月，贵公司本月资产管理总规模变化情况？", value: "", value_all: ["增加", "基本持平", "减少"] },
      { index: 2, name: "相较上月，本月来访贵公司尽调的机构投资者数量变化情况？", value: "", value_all:["增加", "基本持平", "减少"] },
      { index: 3, name: "今年以来，贵公司累计新发产品数量同比情况？", value: "",  value_all:["增加", "基本持平", "减少"]},
      { index: 4, name: "今年以来，贵公司新研发策略上线数量同比情况？", value: "", value_all:["增加", "基本持平", "减少"]},
      { index: 5, name: "相较上月，本月股票类策略的配比情况？", value: "", value_all: ["增加", "基本持平", "减少"]},
      { index: 6, name: "相较上月，本月月末您所管理产品的股票资产仓位变化情况？", value: "", value_all: ["增加", "基本持平", "减少"]},
      { index: 7, name: "相较上月，贵公司股票账户融资融券占比情况？", value: "", value_all: ["增加", "基本持平", "减少", "无此类资产"]},
      { index: 8, name: "您对于大盘股下月行情判断？", value: "", value_all: ["看涨", "窄幅震荡", "看跌", "不确定"] },
      { index:9, name: "您对于中小盘股下月行情判断？", value: "", value_all: ["看涨", "窄幅震荡", "看跌", "不确定"]},
      { index: 10, name: "相较上月，本月债券固收类策略的配比情况？", value: "", value_all: ["增加", "基本持平", "减少"]},
      { index: 11, name: "相较上月，本月月末您所管理产品的债券固收类资产仓位变化情况？", value: "", value_all: ["增加", "基本持平", "减少"]},
      { index: 12, name: "相较上月，贵公司债券质押式回购占比情况？", value: "", value_all: ["增加", "基本持平", "减少", "无此类资产"]},
      { index: 13, name: "您对于债市下月行情判断？", value: "", value_all: ["看涨", "窄幅震荡", "看跌", "不确定"]},
      { index: 14, name: "相较上月，本月商品期货类策略的配比情况？", value: "", value_all: ["增加", "基本持平", "减少"]},
      { index: 15, name: "相较上月，本月月末您所管理产品的商品期货类资产仓位变化情况？", value: "", value_all: ["增加", "基本持平", "减少"]},
      { index: 16, name: "您对于下月基差的预期？", value: "", value_all: ["扩大", "基本持平", "收窄", "不确定"]},
      { index: 17, name: "您对于“黑色系”期货市场下月行情判断？", value: "", value_all: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"]},
      { index: 18, name: "您对于“农产品”期货市场下月行情判断？", value: "", value_all: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"]},
      { index: 19, name: "您对于“有色”期货市场下月行情判断？", value: "", value_all: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"]},
      { index: 20, name: "您对于“能化”期货市场下月行情判断？", value: "", value_all: ["上涨趋势明显", "窄幅震荡", "下跌趋势明显", "不确定"]}
    ],
    questionnaire_list3:[]
     
  },
  goToReport: function () {
    var complete=0;
    //验证所有题目已回答
    this.data.questionnaire_list2.forEach(function(val,index){      
      if (val.value){
        complete++;  
      }
    }) 
    
    if (complete >= this.data.manage_num){
      wx.request({
        url: app.globalData.apiPath + '/questionnaire/',
        method: "POST",
        data: {
          user_id: app.globalData.userId,
          statistic_month: app.globalData.statistic_month,
          questionnaire_list: this.data.questionnaire_list2
        },
        success: res => {
          if (res.data.success) {
            app.globalData.auth = true;
            wx.navigateTo({
              url: '../report/report'
            })
          }

        }
      })      
    }else{
      var left = this.data.manage_num - complete
      var t = '您还有' + left +'题未选择，请选择';
      wx.showToast({
        title: t,
        icon: 'none'
      })
    }
  },
  radioChange(e) {
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i < this.data.questionnaire_list2.length;i++){
      if (this.data.questionnaire_list2[i].index==index){
        this.data.questionnaire_list2[i].value = e.detail.value;
      }
    }
    this.setData({
      questionnaire_list2: this.data.questionnaire_list2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // //获取用户信息，来判断对应题目数量及内容
    wx.request({
      url: app.globalData.apiPath + '/user_info',
      method: "GET",
      data: {
        user_id: app.globalData.userId,
      },
      success: res => {     
        var num = this.manage_assets_num(res.data.user_info.manage_assets);
        this.setData({
          manage_num: num,//数量
          manage_assets: res.data.user_info.manage_assets
        })
        var title = '本次共需答' + num + '题';
        wx.showModal({
          title: title,
          content: '提交问卷即可看到经理人指数报告！',
          showCancel: false,
          confirmText: "开始答题",
          confirmColor: "#22BFFF",
          success: function (resp) {
            if (resp.confirm) {
            } 
          }
        })

        //请求列表--如果用户认证已填写过信息
        wx.request({
          url: app.globalData.apiPath + '/questionnaire',
          method: "GET",
          data: {
            user_id: app.globalData.userId,
            statistic_month: app.globalData.statistic_month
          },
          success: res => {
            if (res.data.success) {
              var res = res.data;
              var base = res.questionnaire_list.slice(0, 4)
              var stock = res.questionnaire_list.slice(4, 9);
              var bond = res.questionnaire_list.slice(9, 13);
              var future = res.questionnaire_list.slice(13, 20);
              this.manage_assets_n(this.data.manage_assets, base, stock, bond, future)
            }

          }
        })
      }
    })
        
      }, 
  manage_assets_num(arr){
    var that = this;
    var num=4;
    var list = that.data.questionnaire_list;
    arr.forEach(function(val,index){
      if (val =="股票类"){
        num += 5;
        list=list.concat(that.data.stock)
      } else if (val == "债券固收类"){
        num += 4;
        list=list.concat(that.data.bond)
      } else if (val == "商品期货类") {
        num += 7;
        list=list.concat(that.data.future) 
      }
    })
    that.setData({
      questionnaire_list: list,
      // questionnaire_list2: list,
    })
    return num;
  },
  manage_assets_n(arr,base,stock,bond,future) {
    var that = this;
    var num = 4;
    var list = base;
    var list2 = base;
    var s=false;
    var b=false;
    var f=false;
    // if (arr[0])
    arr.forEach(function (val, index) {
      if (val == "股票类") {        
        list = list.concat(stock)
        list2 = list2.concat(stock)
        s=true;
      } else if (val == "债券固收类") {
        if(!s){
          list2 = list2.concat(that.data.stock1)
        }
        list2 = list2.concat(bond)          
        list = list.concat(bond)
        b=true;
      } else if (val == "商品期货类") {
        if (!s&&!b) { //以上两个都没选
          list2 = list2.concat(that.data.stock1)
          list2 = list2.concat(that.data.bond1)
        }else if (!b&&s) { //选了股票类 没选债券类
          list2 = list2.concat(that.data.bond1)
        } //选债券类 没选股票类
         
        list2 = list2.concat(future)
        list = list.concat(future)
      }
    })
    that.setData({
      questionnaire_list3: list,
      questionnaire_list2: list,
      list3:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
