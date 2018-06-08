// pages/fill.js
const app = getApp();
var radioC="../../image/radio-checked.png" ;
var radio = "../../image/radio.png";
Page({
  data: {
    name:"",//姓名
    job:"", //单选值 ''
    company:"",
    mobile:"",
    email:"",
    manage_assets: "",//多选值 ["股票类", "债券固收类", "商品期货类"]
    radioC: "../../image/radio-checked.png" ,
    radio: "../../image/radio.png",
    quearr1: {
      index: "1",
      name: "您在贵公司的职务：",
      checked:"",
      value: ["基金经理", "投研人员", "市场人员"],
    },
    quearr2: {
      index: "2",
      checked:[],
      name: "请问您所管理的基金覆盖哪些大类资产？(多选)",
      value: ["股票类", "债券固收类", "商品期货类"],
    },
  },

  goToQue: function () {
    var that = this;
    if(!this.data.name){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
    } else if (!this.data.company){
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none'
      })
    } else if (!this.data.mobile) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
    } else if (!this.data.job) {
      wx.showToast({
        title: '请选择您在贵公司的职务',
        icon: 'none'
      })
    } else if (!this.data.manage_assets) {
      wx.showToast({
        title: '请选择您所管理的基金覆盖的资产',
        icon: 'none'
      })
    }else if (this.data.mobile) {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (this.data.mobile.length != 11) {
        wx.showToast({
          title: '手机号长度有误！',
          icon: 'none'
        })
        return false;
      }else if (!myreg.test(this.data.mobile)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'none'
        })
        return false;
      } else {
        wx.request({
          url: app.globalData.apiPath + '/user_info/',
          method: "POST",
          data: {
            user_id: app.globalData.userId,
            user_name: that.data.name,
            company: that.data.company,
            mobile: that.data.mobile,
            job: that.data.job,
            email: that.data.email,
            manage_assets: that.data.manage_assets,
          },
          success: res => {
            wx.navigateTo({
              url: '../fill/fill'
            })
          },
          fail: res=>{
          }
        });
       
      }
    }
    
  },
  radioChange(e){
    this.setData({
      job: e.detail.value 
    })
  },
  checkboxChange(e){
    this.setData({
      manage_assets: e.detail.value 
    })
  },
  bindname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindcompany: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  bindnumber: function (e) {
    this.setData({
      mobile: e.detail.value  
    })
  },
  bindemail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户信息 判断是否填写过问卷
    wx.request({
      url: app.globalData.apiPath + '/user_info',
      method: "GET",
      data: {
        user_id: app.globalData.userId,
      },
      success: res => {
        if(res.data.success){ //有数据
          var resp = res.data.user_info;
                      // manage_assets: that.data.manage_assets,
          this.data.quearr1.checked = resp.job;
          this.data.quearr2.checked = resp.manage_assets;
          this.setData({
            name: resp.user_name,
            company: resp.company,
            mobile: resp.mobile,
            job: resp.job,
            email: resp.email,
            quearr1: this.data.quearr1,
            quearr2: this.data.quearr2,
            manage_assets: resp.manage_assets,
          })         
        }
        
      }
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