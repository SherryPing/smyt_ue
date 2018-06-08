/**
 * 归因分析.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	require('heatmap');
	var $ = require('jquery');
	var highcharts = require('highcharts');
	var util = require('util');
	require('bootstrap_datetimepicker');
	require('bootstrap_table_zh');
	require('slider');
	require('moment');
	require('daterangepicker');
	var constant = require('constant');
	var dzmcombo = require('dzmcombo');
	require('highchartsMore');
	// 变量区域
	var isFirst;
	var benchmarkCombo;
	var dateEnd;
	var conditionDatas;
	var stockIndustryData;
	
	
	function _init(){
		yieldContribution();
		riskContribution();
		factorsCorrelation();
		initAction();         
    }
	function initAction(){

	}
	//收益贡献分解
	function yieldContribution(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/external_attribution/income_compose/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				$('#starDate1').text(resp.section_date_range.min);
				$('#endDate1').text(resp.section_date_range.max);
				composeCharts($('#returnsColumn'),resp)
				initSpider($('#returnsSpider'),resp)
			}
		})
	}
	//风险贡献分解
	function riskContribution(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/external_attribution/risk_compose/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				$('#starDate2').text(resp.section_date_range.min);
				$('#endDate2').text(resp.section_date_range.max);
				composeCharts1($('#riskColumn'),resp)
				initSpider($('#riskSpider'),resp)
			},error:function(resp){
				layer.msg(resp.responseJSON.msg);
			}
		})
	}
	//因子相关性
	function factorsCorrelation(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/external_attribution/correlation/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				var title="";
				var left_title="";
				if(resp.succeed==false){
					layer.msg(resp.msg)
				}else{
					$('#starDate3').text(resp.date_range.min);
					$('#endDate3').text(resp.date_range.max);
					initColumn($("#correlationTbl"),{"categories":resp.corr.categories,"series":[resp.corr.series[0]]});
				}
			},error:function(){
			}
		})
	}
	//收益贡献分解条形图
	function composeCharts(dom,resp){
		var data = resp.section_data.series;
		var series = [{name:' ',data:[]},{name:' ',data:[]}]
		for(var i=0;i<data.length;i++){
			if(data[i].data >= 0){
				series[0].data.push(data[i].data);
				series[1].data.push(0);
			}
			else{
				series[1].data.push(data[i].data);
				series[0].data.push(0);
			}
		}
		    	dom.highcharts({
		            chart: {
		                type: 'bar'
		            },
		            title: {
		                text: ' '
		            },
		            colors:['#F32A31','#16A088'],
		            subtitle: {
		                useHTML: true,
		                text: ' '
		            },
		            credits: {
			            enabled: false	//屏蔽highcharts链接
			        },
		            xAxis: {
		                categories: resp.series_data.categories,
		                reversed: false,
		                labels: {
		                    step: 1
		                }
		            },
		            yAxis: {
		                title: {
		                    text: null
		                },
		                labels: {
			                formatter: function () {
			                	return util.fmtRatio(this.value);
			                }
			            }
		            },
		            legend:{
						enabled:false
					},
		            plotOptions: {
		                series: {
		                    stacking: 'normal'
		                }
		            },
		            tooltip: {
		                formatter: function () {
		                	return '<span style="color:'+this.series.color+'">'+this.x+'</span>: <b>'+util.fmtRatio(this.y)+'</b> <br/>';
		                }
		            },
		            series:series
		        });
	}
	//风险贡献分解条形图
	function composeCharts1(dom,resp){
				var data = resp.section_data.series;
				var series = [{name:' ',data:[]},{name:' ',data:[]}]
				for(var i=0;i<data.length;i++){
					if(data[i].data >= 0){
						series[0].data.push(data[i].data);
						series[1].data.push(0);
					}
					else{
						series[1].data.push(data[i].data);
						series[0].data.push(0);
					}
				}
		    	dom.highcharts({
		            chart: {
		                type: 'bar'
		            },
		            colors:['#F32A31','#16A088'],
		            title: {
		                text: ' '
		            },
		            subtitle: {
		                useHTML: true,
		                text: ''
		            },
		            credits: {
			            enabled: false	//屏蔽highcharts链接
			        },
		            xAxis: {
		                categories: resp.series_data.categories,
		                reversed: false,
		                labels: {
		                    step: 1
		                }
		            },
		            yAxis: {
		                title: {
		                    text: null
		                },
		                labels: {
			                formatter: function () {
			                	return ((this.value)*100).toFixed(4)+"%";
			                }
			            }
		            },
		            legend:{
						enabled:false
					},
		            plotOptions: {
		                series: {
		                    stacking: 'normal'
		                }
		            },
		            tooltip: {
		                formatter: function () {
		                	return '<span style="color:'+this.series.color+'">'+this.x+'</span>: <b>'+((this.y)*100).toFixed(4)+'%'+'</b> <br/>';
		                }
		            },
		            series:series
		        });
	}
	//蜘蛛图
	function initSpider(dom,resp){
		var series = [];
		for(var i = 0;i<resp.series_data.series.length;i++){
			series.push({name: resp.series_data.series[i].name,data:resp.series_data.series[i].data,pointPlacement:'on'});
		}
	    dom.highcharts({
	        chart: {
	            polar: true,
	            type: 'line'
	        },
	        colors:["#0428AB","#5AAAD9","#F5A92B","#3DB09C","#57730E"],
	        title: {
	            text: ' ',
	            x: -80
	        },
	        pane: {
	            size: '90%'
	        },
	        credits: {
	            enabled: false	//屏蔽highcharts链接
	        },
	        xAxis: {
	            categories: resp.series_data.categories,
	            tickmarkPlacement: 'on',
	            lineWidth: 0,
	            
	        },
	        yAxis: {
	            gridLineInterpolation: 'polygon',
	            lineWidth: 0,
	            labels: {
	                formatter: function () {
	                	return ((this.value)*100).toFixed(4)+'%';
	                }
	            }
	        },
	        tooltip: {
	        	pointFormatter: function(){
					return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+((this.y)*100).toFixed(4)+'%'+'</b> <br/>';
		        },
	            shared: true
	        },
	        series: series
	    });
	}
	//初始化堆叠图 百分比
	function initColumn(dom,resp){
		dom.highcharts({
			chart: {
	            type: 'column'
	        },
	        title: {
	        	style:{color:'#fff'},
	            text: ' '
	        },
	        xAxis: {
	        	labels: {
	                enabled: true
	            },
	            categories: resp.categories
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            labels: {
	                formatter: function () {
	                    return util.fmtRatio(this.value);
	                },
	                enabled: true //轴可见
	            }
	        
	        },
	        tooltip: {
	        	pointFormatter: function(){
	        		return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+util.fmtRatio(this.y)+'</b> <br/>';
	        },
			shared: true
	        },
	        legend:{
				enabled:false
			},
	        credits: {
	            enabled: false	//不显示highcharts链接
	        },
	        exporting: { 
	        	enabled: false  //设置导出按钮不可用
	        },
	        series: resp.series
	    });
	}
	//输出区域
	exports.init = _init;
});