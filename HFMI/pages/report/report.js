// pages/my/about/about.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    auth:false,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    ec2: {
      onInit: initChart
    },
    isLoaded: false,
    isDisposed: false,
    tab:"ago",
    width: "20",
    questionnaire_result: [ //用于接收--假数据
      { index: "1", name: "相较上月，贵公司本月资产管理总规模变化情况？", value: [{name:"增加",value:0.25}, {name: "基本持平",value: 0.4},{name: "减少",value: 0.35}]},
      { index: "2", name: "相较上月，本月来访贵公司尽调的机构投资者数量变化情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "3", name: "今年以来，贵公司累计新发产品数量同比情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "4", name: "今年以来，贵公司新研发策略上线数量同比情况？", value:[{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "5", name: "相较上月，本月股票类策略的配比情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "6", name: "相较上月，本月月末您所管理产品的股票资产仓位变化情况？", value:[{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "7", name: "相较上月，贵公司股票账户融资融券占比情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "8", name: "您对于大盘股下月行情判断？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "9", name: "您对于中小盘股下月行情判断？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "10", name: "相较上月，本月债券固收类策略的配比情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "11", name: "相较上月，本月月末您所管理产品的债券固收类资产仓位变化情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "12", name: "相较上月，贵公司债券质押式回购占比情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "13", name: "您对于债市下月行情判断？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "14", name: "相较上月，本月商品期货类策略的配比情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "15", name: "相较上月，本月月末您所管理产品的商品期货类资产仓位变化情况？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "16", name: "您对于下月基差的预期？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "17", name: "您对于“黑色系”期货市场下月行情判断？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "18", name: "您对于“农产品”期货市场下月行情判断？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "19", name: "您对于“有色”期货市场下月行情判断？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] },
      { index: "20", name: "您对于“能化”期货市场下月行情判断？", value: [{ name: "增加", value: 0.25 }, { name: "基本持平", value: 0.4 }, { name: "减少", value: 0.35 }] }
    ],
    color: ["red", "blue", "green","gold"],
    statistic_number:"102",

  },
  tabView:function(e) {
    var that=this;
    if (e.currentTarget.dataset.id=="month"){
      this.setData({
        tab: "month"
      })
    }else{
      this.setData({
        tab: "ago",   
      })
      this.ecComponent = this.selectComponent('#mychart-dom-bar');
      that.init();
    }
  },
  previewImage: function (e) {
    var secen ="https://wxgzh.fofpower.com/fofpower_code.png"
    wx.previewImage({
      urls: secen.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })
  },
  
  // 点击按钮后初始化图表
  init: function () {    
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      auth: app.globalData.auth,
    });
    if(this.data.auth){
      this.setData({
        tab: "month"
      });    
    }
    // this.ecComponent = this.selectComponent('#mychart-dom-bar');
    // this.init();
    wx.request({
      url: app.globalData.apiPath + '/month_result',
      method: "GET",
      data: {
        user_id: app.globalData.userId,
        statistic_month: app.globalData.statistic_month,
      },
      success: res => {
        if (res.data.success) {
          this.setData({
            questionnaire_result: res.data.questionnaire_result,
            statistic_number: res.data.statistic_number,
          });
        }

      }
    })
  },

  gotopublic: function (e) {
    var index = e.currentTarget.dataset.id;
    if(index==1){
      wx.navigateTo({
        url: '../result1/result'
      })
    }else if(index==2){
      wx.navigateTo({
        url: '../result2/result'
      })
    }else if(index==3){
      wx.navigateTo({
        url: '../result/result'
      })
    }
    else if (index == 4) {
      wx.navigateTo({
        url: '../result3/result'
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.ecComponent = this.selectComponent('#mychart-dom-bar');
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
//切换tab显示图表
function setOption(chart) {
  const option = {
    color: ['#22BFFF'],   
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        },
        data: ['2018-01', '2018-02', '2018-03','2018-04'],
      }
    ],
    yAxis: [
      {
        axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
        type: 'value',
        axisTick: { show: false },
        min: function (value) {
        return value.min - 1;
      }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'line',
        smooth: true,
        label: {
          normal: {
            show: true,
            
          }
        },
        data: [57.99, 59.42, 56.78,56.67],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(34, 191, 255, 1)' // 0% 处的颜色
          },  {
              offset: 1, color: 'rgba(255, 255, 255, 0.1)' // 100% 处的颜色
            }],
          globalCoord: false // 缺省为 false
        }
      }
      },
      {
        name: '正面',
        type: 'line',
        stack: '总量',
        smooth: true,
        label: {
          normal: {
            show: true
          }
        },
        data: [57.99, 59.42, 56.78],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      
    ]
  };
  chart.setOption(option);
}


//主页进入报告 图表显示
function initChart(canvas, width, height) {
  if(width>0&&height>0){
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#22BFFF'],
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        },
        data: ['2018-01', '2018-02', '2018-03','2018-04'],
      }
    ],
    yAxis: [
      {
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        type: 'value',
        axisTick: { show: false },
        min: function (value) {
          return value.min - 1;
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'line',
        smooth: true,
        label: {
          normal: {
            show: true,

          }
        },
        data: [57.99, 59.42, 56.78],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(34, 191, 255, 1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(255, 255, 255, 0.1)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      },
      {
        name: '正面',
        type: 'line',
        stack: '总量',
        smooth: true,
        label: {
          normal: {
            show: true
          }
        },
        data: [57.99, 59.42, 56.78,56.67],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },

    ]
  };
  chart.setOption(option);
  return chart;
  }
}
