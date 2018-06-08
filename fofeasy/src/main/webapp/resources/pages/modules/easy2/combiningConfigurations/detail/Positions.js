/**
 * 组合配置-详情-持仓.js
 */

define(function(require, exports, module) {
	// 引入js和css区域
	// 引入js和css区域
	var $ = require('jquery');
	require("datepicker_zh");
	require("move");
	require("highstock")
	// require("highcharts_zh_CN");
	require('bootstrap_table_zh');
	require("chartCollection");
	require("highchartmap");
	var util = require('util');

	// 变量区域
	var heatmapdata;
	var fundId = $('#fundId').val();
	var ccfreq = "y1";
	var cc_startdate1 = null;
	var cc_enddate1 = null;
	var params;
	var request;


	function _init() {
		initConfig();
		initEvent();
		load();

	}

	//初始化配置
	function initConfig() {
		params = {
			"fund_id" : fundId,
			"user_id" : useUserId,
			"freq" : $('#freqInput').val()
		};
		refreshParams();
		$('.dateInp').datetimepicker({
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
	}

	//初始化事件
	function initEvent() {
		$('.mother_date').on('change', function() {
			refreshParams();
			var index = $('.mother_date').index($(this))
			switch ($('.mother_date').index($(this))) {
			case 0:
			case 1:
				parentTbl(request.fund[0]);
				parentincome(request.fund[1]);
				parentRound(request.fund[2]);
				strategyvar(request.fund[3]);
				strategystdev(request.fund[4]);
				break;
			case 2:
			case 3:
				parentsequencediagram(request.fund[5]);
				break;
			case 4:
			case 5:
				assetAccountTab(request.strategy[0]);
				parentincome(request.strategy[1]);
				parentRound(request.strategy[2]);
				strategyvar(request.strategy[3]);
				strategystdev(request.strategy[4]);
				break;
			case 6:
			case 7:
				assetAccountGrid(request.strategy[5]);
				break;
			default:
				break;
			}
		});
		//基金与指数滚动相关系数
		$('#headtMapdiv .checkboxBtn').on('click', function() {
			$(this).toggleClass("checkboxActive");
			var check = $("#headtMapdiv .checkboxBtn");
			var count = 0;
			for (var i = 0; i < check.length; i++) {
				var state = $(check[i]).hasClass('checkboxActive');
				if (state == 1) {
					count += 1;
				}
			}
			if (count < 1) {
				layer.msg('指标至少选1个');
				$(this).addClass("checkboxActive");
			} else if (count > 6) {
				layer.msg('指标最多只能选择6个');
				$(this).removeClass("checkboxActive");
			} else {
				heatchoice();
			}
		});
		//母基金var 和波动率选择
		$('.momchoicebtn').click(function() {
			var btn = $('.momchoicebtn');
			var div = $('.momchoiceDiv');
			for (var i = 0; i < btn.length; i++) {
				$(btn[i]).removeClass('positionChoice_ac');
				$(div[i]).fadeOut(10)
			}
			$(this).addClass('positionChoice_ac');
			$(div[$(this).index()]).fadeIn(1000);
		});
		//策略配置 var 和波动率选择
		$('.choicebtn').click(function() {
			var btn = $('.choicebtn');
			var div = $('.choiceDiv');
			for (var i = 0; i < btn.length; i++) {
				$(btn[i]).removeClass('positionChoice_ac');
				$(div[i]).fadeOut(10)
			}
			$(this).addClass('positionChoice_ac');
			$(div[$(this).index()]).fadeIn(1000);
		});
		//策略相关性，频率选择
		$('.freSlcul .slcliBtn').on('click', function() {
			var btn = $(this).parents('ul').find('.slcliBtn');
			$('.freSlcul li:last-child').removeClass('slcliBtnactiv');
			for (var i = 0; i < btn.length; i++) {
				$(btn[i]).removeClass('slcliBtnactiv');
			}
			$(this).addClass('slcliBtnactiv');
			ccfreq = $(this).attr('id');
			cc_startdate1 = null;
			cc_enddate1 = null;
			ccOfsubfund();
		});
		$('.freSlcul li:last-child').on('change', function() {
			var btn = $(this).parents('ul').find('.slcliBtn');
			for (var i = 0; i < btn.length; i++) {
				$(btn[i]).removeClass('slcliBtnactiv');
			}
			$(this).addClass('slcliBtnactiv');
			ccfreq = null ;
			cc_startdate1 = $('.freSlcul .form_date:even').val();
			cc_enddate1 = $('.freSlcul .form_date:odd').val();
			ccOfsubfund();
		});
	}

	//加载
	function load() {
		if ($('#portfolio_type').val() == 'fund') {
			$('#fund_allocation').removeClass('hidden');
			parentTbl(request.fund[0]);
			parentincome(request.fund[1]);
			parentRound(request.fund[2]);
			strategyvar(request.fund[3]);
			strategystdev(request.fund[4]);
			parentsequencediagram(request.fund[5]);
		}
		assetAccountTab(request.strategy[0]);
		parentincome(request.strategy[1]);
		parentRound(request.strategy[2]);
		strategyvar(request.strategy[3]);
		strategystdev(request.strategy[4]);
		assetAccountGrid(request.strategy[5]);
		Policydependencies();
		ccOfsubfund();
	}


	//基金表格
	function parentTbl(r) {
		$.ajax({
			url : apiPath + r.url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(r.params),
			success : function(resp) {
				initmotherTab(r.dom, resp.result);
				r.dom.bootstrapTable('load', resp.result.data);
				$('.mother_date:eq(0)').val(resp.date_range.min);
				$('.mother_date:eq(1)').val(resp.date_range.max);
				$('.mother_date').datetimepicker('setStartDate', resp.interval.min).datetimepicker('setEndDate', resp.interval.max);
			}
		})
	}
	//收益贡献占比
	function parentincome(r) {
		$.ajax({
			url : apiPath + r.url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(r.params),
			success : function(resp) {
				/*initColumn3(r.dom, resp.return_data, [ '#f8354f', '#FFA1CC', '#7bbdf5', '#1f8aee', '#2FB9A1', '#FAE091', '#FEABA4' ]);*/
				initchart(r.dom,resp.return_data,{
					chart_type:'column',
					'columnPointWidth':"20",
					reservations:"percent",	
					legend:{
						enabled:true,
					},
				});
			}
		})
	}
	//资产占比
	function parentRound(r) {
		$.ajax({
			url : apiPath + r.url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(r.params),
			success : function(resp) {
				init3dchart(r.dom, resp);
			}
		})
	}
	//var贡献占比
	function strategyvar(r) {
		// console.log(r)
		$.ajax({
			url : apiPath + r.url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(r.params),
			success : function(resp) {
				/*initColumn3(r.dom, resp.var_data, [ '#f8354f', '#FFA1CC', '#7bbdf5', '#1f8aee', '#2FB9A1', '#FAE091', '#FEABA4' ]);*/
				initchart(r.dom,resp.var_data,{
					chart_type:'column',
					'columnPointWidth':"20",
					reservations:"percent",	
					legend:{
						enabled:true,
					},
				});
			}
		})
	}
	//波动率
	function strategystdev(r) {
		$.ajax({
			url : apiPath + r.url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(r.params),
			success : function(resp) {
				/*initColumn3(r.dom, resp.dev_data, [ '#f8354f', '#FFA1CC', '#7bbdf5', '#1f8aee', '#2FB9A1', '#FAE091', '#FEABA4' ]);*/
				initchart(r.dom,resp.dev_data,{
					chart_type:'column',
					'columnPointWidth':"20",
					reservations:"percent",	
					legend:{
						enabled:true,
					},
				});
			}
		})
	}
	//组合时序图
	function parentsequencediagram(r) {
		$.ajax({
			url : apiPath + r.url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(r.params),
			success : function(resp) {
				initArea(r.dom,{'date' : resp.result.categories,'series' : resp.result.series},{
					color:  [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
					reservations: "percent1",
					stacking: "percent",
					lineColor: "#ffffff",
					markerLineWidth: 1,
					markerRadius: 1,
					legend : {
						enabled : true
					}
				})
				$('.mother_date:eq(2)').val(resp.date_range.min);
				$('.mother_date:eq(3)').val(resp.date_range.max);
			}
		})
	}

	//策略-表格
	function assetAccountTab(r) {
		$.ajax({
			url : apiPath + r.url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(r.params),
			success : function(resp) {
				initmotherTab1(r.dom, resp.result);
				r.dom.bootstrapTable('load', resp.result.data);
				$('.mother_date:eq(4)').val(resp.date_range.min);
				$('.mother_date:eq(5)').val(resp.date_range.max);
				$('.mother_date').datetimepicker('setStartDate', resp.interval.min).datetimepicker('setEndDate', resp.interval.max);
			}
		})
	}

	//组合时序图
	function assetAccountGrid(r) {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			'freq' : $('#freqInput').val(),
			date_range : {
				"min" : mother_startdate2,
				"max" : mother_enddate2
			}
		};
		$.ajax({
			url : apiPath + r.url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(r.params),
			success : function(resp) {
				initArea(r.dom,{'date' : resp.result.categories,'series' : resp.result.series},{
					color:  [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
					reservations: "percent1",
					stacking: "percent",
					lineColor: "#ffffff",
					markerLineWidth: 1,
					markerRadius: 1,
					legend : {
						enabled : true
					}
				})
				$('.mother_date:eq(6)').val(resp.date_range.min);
				$('.mother_date:eq(7)').val(resp.date_range.max);
			}
		})
	}


	//策略相关性-热力图
	function Policydependencies() {
		$.ajax({
			url : apiPath + '/api/v1/portfolio/position/strategy/dynamic_corref/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					heatmapdata = resp;
					heatmap(heatmapdata);
					heatchoice();
				}
			},
			error : function(resp) {
				console.log(resp);
			}
		})
	}

	//子基金相关系数
	function ccOfsubfund() {
		var params = {
			"fund_id" : fundId,
			"freq_length" : ccfreq,
			"date_range" : {
				'min' : cc_startdate1,
				'max' : cc_enddate1
			},
			'user_id' : useUserId,
			'freq' : $('#freqInput').val()
		};
		$.ajax({
			url : apiPath + '/api/v1/portfolio/position/fund/fund_corref/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed == false) {
                    $('#left_titlediv2').html("");
                    $('#correlationTblhead').html("");
                    // $('#correlationTblbody').html(data.tbl);
					$("#correlationTblbody").html("<p class='tip center'>"+resp.msg+"</p>")
				} else {
					// var data = smalldotChart(resp.coef_data);
					// $('#left_titlediv2').html(data.left_title);
					// $('#correlationTblhead').html(data.title);
					// $('#correlationTblbody').html(data.tbl);
                    //热力图
                    var series=[];
                    for(var i =0;i<resp.coef_data.series.length;i++) {
                        var dataLabels ;
                        for(var j =0;j<resp.coef_data.series[i].data.length;j++){
                            var dataTemp=[];
                            var temp={};
                            temp.x=i;
                            temp.y=j;
                            if(resp.coef_data.series[i].data[j]=="-"){
                                resp.coef_data.series[i].data[j]=0;
                            }
                            if(i==j){
                                resp.coef_data.series[i].data[j]=1;
                            }
                            temp.value=util.fmtFixed(resp.coef_data.series[i].data[j],2);
                            dataTemp.push(temp);
                            var name=resp.coef_data.categories[i]+"与"+resp.coef_data.categories[j]+"相关性系数：";
                            // if(resp.coef_data.data[i][j]==-2){
                            //     dataLabels = {enabled: true, color: '#70757b', align: 'left',padding: 5,formatter: function () {
                            //         return "--";
                            //     }}
                            // }else{
                            dataLabels = {enabled: true, color: '#333', align: 'left',padding: 5,}
                            // }
                            series.push({data: dataTemp, name: name, dataLabels: dataLabels});
                        }
                    }
                    var categories=resp.coef_data.categories;

                    initHeatMap($('#correlationTbl'),{categories:categories,series:series});
					$('[data-toggle="tooltip"]').tooltip();
				}
			},
			error : function(resp) {
				console.log(resp);
			}
		})
	}
    //热力图
    function initHeatMap(dom, resp) {
        // var data = [];
        // for (var i = 0; i < resp.data.length; i++) {
        //     for (var j = 0; j < resp.data[i].length; j++) {
        //         data.push([ i, j, util.fmtFixed(resp.data[i][j], 2)=='--'?0:util.fmtFixed(resp.data[i][j], 2) ]);
        //     }
        // }
        dom.highcharts({
            chart : {
                type : "heatmap",
            },
            colorAxis: {
                min:-1,
                max:1,
                minColor: '#fff',
                maxColor: '#7cb5ec',
                tickPixelInterval:25,
            },
            title : {
                text : null,
            },
            xAxis : {
                categories : resp.categories,
                opposite : true,
                labels:{
                    style: {
                        color: '#333',//颜色
                        fontSize:'12px'  //字体
                    }
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'bottom',
                y: 10,
                symbolHeight: 230
            },
            yAxis: {
                categories: resp.categories,
                reversed:true,//反转刻度
                title: null,
                labels:{
                    style: {
                        color: '#333',//颜色
                        fontSize:'12px'  //字体
                    }
                }
            },
            tooltip : {
                pointFormatter : function() {
                    if(this.value==-2){
                        return "--"
                    }else{
                        return this.value;
                    }
                },
            },
            credits : {
                enabled : false //不显示highcharts链接
            },
            exporting : {
                enabled : false //设置导出按钮不可用
            },
            series : resp.series
        })
    }




	//刷新参数
	function refreshParams() {
		request = {
			'fund' : [ {
				'url' : '/api/v2/portfolio/position/fund/section/',
				'dom' : $('#parentfTbl'),
				'params' : $.extend({}, params, {
					'date_range' : {
						'min' : $('.mother_date:eq(0)').val(),
						'max' : $('.mother_date:eq(1)').val()
					}
				})
			},
				{
					'url' : '/api/v2/portfolio/position/fund/return/',
					'dom' : $('#mincomeChart'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(0)').val(),
							'max' : $('.mother_date:eq(1)').val()
						}
					})
				},
				{
					'url' : '/api/v2/portfolio/position/fund/proportion/',
					'dom' : $('#montherRoundchart'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(0)').val(),
							'max' : $('.mother_date:eq(1)').val()
						}
					})
				},
				{
					'url' : '/api/v2/portfolio/position/fund/var/',
					'dom' : $('#FluctuationChar'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(0)').val(),
							'max' : $('.mother_date:eq(1)').val()
						}
					})
				},
				{
					'url' : '/api/v2/portfolio/position/fund/stdev/',
					'dom' : $('#momVolatility'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(0)').val(),
							'max' : $('.mother_date:eq(1)').val()
						}
					})
				},
				{
					'url' : '/api/v2/portfolio/position/fund/series/',
					'dom' : $('#momtimeChart'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(2)').val(),
							'max' : $('.mother_date:eq(3)').val()
						}
					})
				} ],
			'strategy' : [ {
				'url' : '/api/v2/portfolio/position/strategy/section/',
				'dom' : $('#policyTbl'),
				'params' : $.extend({}, params, {
					'date_range' : {
						'min' : $('.mother_date:eq(4)').val(),
						'max' : $('.mother_date:eq(5)').val()
					}
				})
			},
				{
					'url' : '/api/v2/portfolio/position/strategy/return/',
					'dom' : $('#incomeChart'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(4)').val(),
							'max' : $('.mother_date:eq(5)').val()
						}
					})
				},
				{
					'url' : '/api/v2/portfolio/position/strategy/proportion/',
					'dom' : $('#policyRound'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(4)').val(),
							'max' : $('.mother_date:eq(5)').val()
						}
					})
				},
				{
					'url' : '/api/v2/portfolio/position/strategy/var/',
					'dom' : $('#policyVar'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(4)').val(),
							'max' : $('.mother_date:eq(5)').val()
						}
					})
				},
				{
					'url' : '/api/v2/portfolio/position/strategy/stdev/',
					'dom' : $('#policyVolatility'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(4)').val(),
							'max' : $('.mother_date:eq(5)').val()
						}
					})
				},
				{
					'url' : '/api/v2/portfolio/position/strategy/series/',
					'dom' : $('#policytimeChart'),
					'params' : $.extend({}, params, {
						'date_range' : {
							'min' : $('.mother_date:eq(6)').val(),
							'max' : $('.mother_date:eq(7)').val()
						}
					})
				} ]
		}
	}







	//母基金表格
	function initmotherTab(dom, resp) {
		dom.bootstrapTable({
			striped : true,
			sidePagination : 'client',
			cache : false,
			data : resp.data,
			pagination : false,
			search : false,
			undefinedText : '--',
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			columns : [
				{
					field : 'row_name',
					title : resp.columns.row_name,
					sortable : false,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'strategy',
					title : resp.columns.strategy,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 's_asset',
					title : resp.columns.s_asset,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val / 10000, 2);
					}
				},
				{
					field : 'e_asset',
					title : resp.columns.e_asset,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val / 10000, 2);
					}
				},
				{
					field : 'proportion',
					title : resp.columns.proportion,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'pl',
					title : resp.columns.pl + "(万元)",
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val / 10000, 2);
					}
				},
				{
					field : 's_nav',
					title : resp.columns.s_nav,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'e_nav',
					title : resp.columns.e_nav,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'income',
					title : resp.columns.income,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'mdd',
					title : resp.columns.mdd,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'standard_dev',
					title : resp.columns.standard_dev,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'VaR',
					title : resp.columns.VaR,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.SecondLevel
		});
	}
	function initmotherTab1(dom, resp) {
		dom.bootstrapTable({
			striped : true,
			sidePagination : 'client',
			cache : false,
			data : resp.data,
			pagination : false,
			search : false,
			undefinedText : '--',
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			columns : [
				{
					field : 'row_name',
					title : resp.columns.row_name,
					sortable : false,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 's_asset',
					title : resp.columns.s_asset,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val / 10000, 2);
					}
				},
				{
					field : 'e_asset',
					title : resp.columns.e_asset,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val / 10000, 2);
					}
				},
				{
					field : 'proportion',
					title : resp.columns.proportion,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'pl',
					title : resp.columns.pl + "(万元)",
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val / 10000, 2);
					}
				},
				{
					field : 's_nav',
					title : resp.columns.s_nav,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'e_nav',
					title : resp.columns.e_nav,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'income',
					title : resp.columns.income,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'mdd',
					title : resp.columns.mdd,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'standard_dev',
					title : resp.columns.standard_dev,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'VaR',
					title : resp.columns.VaR,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.SecondLevel
		});
	}
	//初始化饼图
	function init3dchart(dom, resp) {
		var data = [];
		for (var i = 0; i < resp.proportion.series.length; i++) {
			data.push([ resp.proportion.series[i].name, resp.proportion.series[i].data[0] ]);
		}
		dom.highcharts({
			chart : {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				spacing : [ 10, 0, 0, 0 ]
			},
			title : {
				floating : true,
				text : resp.proportion.categories[0],
				align : "center"
			},
			colors : [ '#f8354f', '#FFA1CC', '#7bbdf5', '#1f8aee', '#2FB9A1', '#FAE091', '#FEABA4' ],
			tooltip : {
				pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : false,
						format : '<b>{point.name}</b>: {point.percentage:.1f} %',
						style : {
							color : (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					},
					point : {
					},
					showInLegend : true
				}
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			series : [ {
				type : 'pie',
				innerSize : '90%',
				name : '资产占比',
				data : data
			} ]
		}, function(c) {
			// 环形图圆心
			var centerY = c.series[0].center[1],
				titleHeight = parseInt(c.title.styles.fontSize);
			c.setTitle({
				y : centerY + titleHeight / 2
			});
			chart = c;
		});
	}
	//初始化堆叠图 百分比
	function initColumn3(dom, resp, color) {
		dom.highcharts({
			chart : {
				type : 'column'
			},
			colors : color,
			title : {
				style : {
					color : '#fff'
				},
				text : ' '
			},
			xAxis : {
				labels : {
					enabled : true
				},
				categories : resp.categories
			},
			yAxis : {
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return util.fmtRatio(this.value);
					},
					enabled : true //轴可见
				}
			},
			tooltip : {
				pointFormatter : function() {
					return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + util.fmtRatio(this.y) + '</b> <br/>';
				},
				shared : true
			},
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0,
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			exporting : {
				enabled : false //设置导出按钮不可用
			},
			series : resp.series
		});
	}
	//热力图
	function heatmap(resp) {
		var xcategories = resp.coef_data.categories;
		var ycategories = [];
		for (var i = 0; i < resp.coef_data.series.length; i++) {
			ycategories.push(resp.coef_data.series[i].name);
		}
		var data = [];
		for (var i = 0; i < resp.coef_data.series.length; i++) {
			for (var j = 0; j < resp.coef_data.series[i].data.length; j++) {
				data.push([ j, i, util.fmtFixed(parseFloat(resp.coef_data.series[i].data[j]), 2) * 1 ]);
			}
		}
		$('#corLhotchar').highcharts({
			chart : {
				type : 'heatmap',
				marginTop : 40,
				marginBottom : 80
			},
			title : {
				text : ' '
			},
			xAxis : {
				categories : xcategories
			},
			yAxis : {
				categories : ycategories,
				title : null
			},
			colorAxis : {
				minColor : '#FFFFFF',
				maxColor : Highcharts.getOptions().colors[0]
			},
			legend : {
				align : 'right',
				layout : 'vertical',
				margin : 0,
				verticalAlign : 'top',
				y : 25,
				symbolHeight : 230
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br><b>母基金与' +
					this.series.yAxis.categories[this.point.y] + '的相关性系数为：</b><br><b>' +this.point.value + '</b>';
				}
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
            exporting : {
                enabled : false //设置导出按钮不可用
            },
			series : [ {
				name : ' ',
				// borderWidth : 1,
				data : data,
				dataLabels : {
					enabled : true,
					color : '#000000'
				}
			} ]
		});
	}
	function heatchoice() {
		var data = {
			"coef_data" : {
				"categories" : [],
				"series" : []
			}
		};
		data.coef_data.categories = heatmapdata.coef_data.categories;
		var check = $("#headtMapdiv .checkboxBtn");
		for (var i = 0; i < check.length; i++) {
			var status = $(check[i]).hasClass("checkboxActive");
			if (status == 1) {
				for (var j = 0; j < heatmapdata.coef_data.series.length; j++) {
					if (heatmapdata.coef_data.series[j].name == $(check[i]).val()) {
						data.coef_data.series.unshift(heatmapdata.coef_data.series[j]);
					}
				}
			}
		}
		heatmap(data);
	}

	//输出区域
	exports.init = _init;
});