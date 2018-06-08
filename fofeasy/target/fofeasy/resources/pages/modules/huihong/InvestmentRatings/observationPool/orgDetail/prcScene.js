/**
 * 情景分析.js
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
	// 变量区域
	var isFirst;
	var dateStart = null;
	var dateEnd = null;
	var benchmarkCombo;
	var dateEnd;
	var conditionDatas;
	var stockIndustryData;


	function _init() {
		initConfig();
		initAction();
	}
	function initConfig() {
		initSceneEvents();
		initMarketAnalysis();
		$('.cdata').datetimepicker({ //日期选择
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
		//市道分析日期选择
		$('#Retreat_date_end,#Retreat_date_start').on('change', function() {
			if ($(this).attr('name') == 'date_start') {
				dateStart = $(this).val();
				$('#Retreat_date_end').datetimepicker('setStartDate', $(this).val());
			} else {
				dateEnd = $(this).val();
				$('#Retreat_date_start').datetimepicker('setEndDate', $(this).val());
			}
			initMarketAnalysis();
		});
	}
	/*
	 * 压力测试
	 * */
	function initSceneEvents() {
		params = $.extend({}, {
			'fund_id' : $('#fundId').val(),
			'user_id' : useUserId
		});
		$.ajax({
			url : apiPath + "/api/v1/fof_easy/scene_analysis/stress_testing/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed == false) {
					$('#event-main-table').text(resp.msg);
				}
				var tableDatas = []
				for (var i = 0; i < resp.table_data.data.length; i++) {
					var data = resp.table_data.data[i];
					data['date_range'] = resp.table_data.data[i]['interval']['date_start'] + " ~ " + resp.table_data.data[i]['interval']['date_end']
					tableDatas.push(data)
				}

				initEventTable(tableDatas);
				initchart($('#earningStatistic1'), resp.graphic_data, {
					'reservations' : 'percent',
					'chart_type' : 'column',
					'columnPointWidth':"20",
					legend : {enabled:true}
				});
			},
			error : function(resp) {
				layer.msg(resp);
			}
		});
	}

	/*
	 * 市道分析
	 */
	function initMarketAnalysis() {
		dateStart = $('#Retreat_date_start').val();
		dateEnd = $('#Retreat_date_end').val();
		params = $.extend({}, {
			'fund_id' : $('#fundId').val(),
			'date_start' : dateStart,
			'date_end' : dateEnd,
			'user_id' : useUserId
		});
		$.ajax({
			url : apiPath + "/api/v1/fof_easy/scene_analysis/market_analysis/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $('#market-main-table');
				if (resp.succeed == false) {
					$('#market-main-table').text(resp.msg);
				} else {
					initMarketTable(resp.table_data.data);
					initchart($('#earningStatistic2'), resp.graphic_data, {
						'reservations' : 'percent',
						'chart_type' : 'column',
						'columnPointWidth':"20",
						legend : {enabled:true}
					});
					$('#Retreat_date_start').val(dateStart == null ? resp.interval.min : dateStart);
					$('#Retreat_date_end').val(dateEnd == null ? resp.interval.max : dateEnd);
					$('#Retreat_date_start').datetimepicker('setStartDate', resp.interval.min);
					$('#Retreat_date_end').datetimepicker('setEndDate', resp.interval.max);
					dom.bootstrapTable('load', resp.table_data.data);
				}
			},
			error : function(resp) {
				layer.msg(resp);
			}
		});
	}

	/*
	 * hcharts 压力测试 - 表格
	 */
	function initEventTable(jsonData) {
		mainGrid = $('#event-main-table').bootstrapTable({
			sidePagination : 'client',
			cache : false,
			data : jsonData,
			pagination : false,
			search : false,
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			undefinedText : '--',
			columns : [
				{
					field : 'row_name',
					title : '事件',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'date_range',
					title : '日期范围',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'bm',
					title : '沪深300涨跌幅',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'pe',
					title : '策略指数涨跌幅',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'fund',
					title : '基金收益率',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},

			],
		});
	}

	/*
	 * hcharts 市道分析 - 表格
	 */
	function initMarketTable(jsonData) {
		mainGrid = $('#market-main-table').bootstrapTable({
			sidePagination : 'client',
			cache : false,
			data : jsonData,
			pagination : false,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 50 ],
			search : false,
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			undefinedText : '--',
			columns : [
				{
					field : 'row_name',
					title : '',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle'
				},
				{
					field : '3',
					title : '大于3%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : '2_3',
					title : '2%至3%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : '1_2',
					title : '1%至2%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : '0_1',
					title : '0%至1%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : '-1_0',
					title : '-1%至0%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : '-2_-1',
					title : '-2%至-1%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : '-3_-2',
					title : '-3%至-2%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : '-3',
					title : '小于-3%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},

			],
		});
	}
	//输出区域
	exports.init = _init;
});