/**
 * 组合配置-详情-业绩指标.js
 */

define(function(require, exports, module) {
	// 引入js和css区域

	var $ = require('jquery');
	var util = require('util');
	require("highchartmap");
	// 变量区域
	var riskState = false;
	var benchmarkState = false;
	var dateStart = null;
	var dateEnd = null;
	var dateStart1 = null;
	var dateEnd1 = null;
	var indicator;
	var dateStart2;
	var dateEnd2;
	var dateStart3;
	var dateEnd3;

	// 初始化区域
	function _init() {
		initConfig();
		initAction();
	}
	function initConfig() {
		isFirst = true;
		fundId = $("#fundId").val();
		freq = $(".frequencyLdiv .frequencyActive").data('freq');
		initEvent();
		incomeIndicators();
		riskIndicators();
		dynamicRetreat();
		riskAdjustment();
		relativeIndex();
		loadNavChart();
	}

	//初始化事件
	function initEvent() {
        $("[data-toggle='popover']").popover();
		$('.cdata').datetimepicker({ //日期选择
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
		$('.productName').hover(function() {
			$(this).attr('title', $(this).text())
		});
		
		//累计收益率日期选择
		$('#yield_date_start,#yield_date_end').on('change', function() {
			if ($(this).attr('name') == 'date_start') {
				dateStart1 = $(this).val();
				/*console.log(dateStart1)*/
				$('#yield_date_end').datetimepicker('setStartDate', $(this).val());
			} else {
				dateEnd1 = $(this).val();
				$('#yield_date_start').datetimepicker('setEndDate', $(this).val());
			}
			loadNavChart()
		});
		//累计收益率近一年
		$('#lastYear').click(function() {
			dateStart1 = dateStart2;
			dateEnd1 = dateEnd2;
			loadNavChart()
		})
		//动态回撤近一年
		$('#lastYear1').click(function() {
			dateStart = dateStart3;
			dateEnd = dateEnd3;
			dynamicRetreat()
		})
		//动态回撤日期选择
		$('#Retreat_date_end,#Retreat_date_start').on('change', function() {
			if ($(this).attr('name') == 'date_start') {
				dateStart = $(this).val();
				$('#Retreat_date_end').datetimepicker('setStartDate', $(this).val());
			} else {
				dateEnd = $(this).val();
				$('#Retreat_date_start').datetimepicker('setEndDate', $(this).val());
			}
			dynamicRetreat();
		});
		//频率
		$(".frequencyLdiv .netFrequency").on('click', function() {
			var freqcy = $('.netFrequency');
			for (var i = 0; i < freqcy.length; i++) {
				$(freqcy[i]).removeClass('frequencyActive');
			}
			$(this).addClass("frequencyActive");
			freq = $(this).data('freq');
			incomeIndicators();
			riskIndicators();
			riskAdjustment();
			relativeIndex();
		})
		//收益
		$('#incomeUl li').on('click', function() {
			indicator = $(this).data('indicator');
			incomeIndicators();
		})
		$(".headerSright select").on('change', function() {
			switch ($(".headerSright select").index($(this))) {
			case 0:
				incomeIndicators();
				break;
			case 1:
				riskIndicators();
				break;
			case 2:
				riskAdjustment();
                //指标说明
                var title=$("#riskAdjustmentSLT option:selected").text();
                var value=$("#riskAdjustmentSLT option:selected").val();
                $("#incomeScharts2 .pop").html(title+' <img src="'+ctxResources+'/images/info_b.png" class="infoImg" style="width: 16px;height:16px;">');
                $("#incomeScharts2 .pop").attr("data-content",util.explain(value))
				break;
			default:
				break;
			}
		});
		$('#riskAdjustmentSLT1').on('change',relativeIndex)
		$('#showAll').click(function() {
			params = $.extend({}, {
				'fund_id' : $('#fundId').val(),
				'user_id' : useUserId,
				'freq' : $('#freqInput').val()
			});
			$.ajax({
				url : apiPath + "/api/v2/portfolio/indicators/nav/", //return_max_retracement
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					var a = $('#fundId').val();
					$('#yield_date_start').val(resp.interval[a].min);
					$('#yield_date_end').val(resp.interval[a].max);
					$('#yield_date_start').datetimepicker('setStartDate', resp.interval[a].min);
					$('#yield_date_end').datetimepicker('setEndDate', resp.interval[a].max);
					initNavChart(resp);
					initNavTable($('#nav-main-grid'),resp);
				},
				error : function(resp) {
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r);
				}
			});
		});
		$('#showAll1').click(function() {
			params = $.extend({}, {
				'fund_id' : $('#fundId').val(),
				'user_id' : useUserId,
				'freq' : $('#freqInput').val()
			});
			$.ajax({
				url : apiPath + "/api/v2/portfolio/indicators/retracement/", //return_max_retracement
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if (resp.error_log != undefined) {
						layer.msg(resp.error_log);
					} else {
						var data = [];
						$.each(resp.retracement_data.dates, function(i, n) {
							data.push([ new Date(n).getTime(), util.fmtFixed(resp.retracement_data.data_list[0].data[i], 4) * 1 ]);
						})
						resp.retracement_data.data_list[0].data = data;
						$('#Retreat_date_start').val(resp.date_interval.min);
						$('#Retreat_date_end').val(resp.date_interval.max);
						initArea($('#riskBcharts'), {'series' : resp.retracement_data.data_list}, {
							'color':['#7cb5ec'],
							'zoomType':'x',
							'reservations' : 'percent2',
							'x_tickmarkPlacement':'on',
							'lineWidth':2,
							'xType':'datetime',
							legend : {},						
						});;
					}
				},
				error : function(resp) {
					var r = eval('(' + resp.responseJSON + ')');
					layer.msg(r);
				}
			});
		});

	}



	//收益指标
	function incomeIndicators() {
		var dom = $('#incomeIndicatorsTab');
		//默认沪深300
		var benchmark = dom.find('select').val() == undefined ? 'hs300' : dom.find('select').val();
		//默认 成立以来
		var freq_length = $("#incomeIndicatorsSLT").val() == undefined ? 'total' : $("#incomeIndicatorsSLT").val();
		var params = {
			'fund_id' : fundId,
			'benchmark' : benchmark,
			'indicator' : indicator,
			'freq' : $('#freqInput').val(),
			'freq_length' : freq_length,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v2/portfolio/indicators/return/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.error_log != undefined) {
					layer.msg(resp.error_log);
				} else {
					//统计日期
					$('#statistikDato span:eq(1)').text(resp.static_date);
					//下拉框
					var s = resp.freq_length_dict;
					//排序
					var str = "<option value='total'>" + s.total + "</option>" +
						"<option value='year'>" + s.year + "</option>" +
						"<option value='m3'>" + s.m3 + "</option>" +
						"<option value='m6'>" + s.m6 + "</option>" +
						"<option value='y1'>" + s.y1 + "</option>" +
						"<option value='y2'>" + s.y2 + "</option>";
					/*$.each(resp.freq_length_dict,function(i,n){
						str+="<option value='"+i+"'>"+n+"</option>";
					});*/
					$('#incomeIndicatorsSLT').html(str);
					//柱图
					var g = resp.return_indicators.graphic_data;
					/*initGrid($('#incomeBcharts'),{'legend':true,'chart_type':'column','xCategories':g.categories,'series':g.series});*/
					initchart($('#incomeBcharts'), g, {
						chart_type : 'column',
						reservations : "percent",
						'columnPointWidth':"20",
						legend : {
							enabled : true,
						},
					});
					//表
					var onPostBody = function(row, element, field) {
						dom.find('th:eq(2)').html(getSelectIpn(resp.benchmark_dict));
						dom.find('select').on('change', function() {
							incomeIndicators();
						})
					}
					var ts = resp.return_indicators.table_data; //表数据
					ts.columns.row_name = '收益率';
					initTable1(dom, {
						'data' : ts.data,
						'columns' : ts.columns,
						'onPostBody' : onPostBody
					});
					dom.bootstrapTable('load', {
						'data' : ts.data,
						'columns' : ts.columns,
						'onPostBody' : onPostBody
					});
					//饼图
					var p = resp.earning_periods;
					//图例
					$('#return_bm_div').text(p.columns.bm).attr('title', p.columns.bm);
					$('#return_pe_div').text(p.columns.pe).attr('title', p.columns.pe);
					$('#return_fund_div').text(p.columns.fund).attr('title', p.columns.fund);
					initIncomeGrid($('#incomeCycleRatio'), {
						'series' : p
					});
					dom.find('select').val(benchmark);
					$("#incomeIndicatorsSLT").val(freq_length);
				}


			}
		})
	}

	//风险指标
	function riskIndicators() {
		var dom = $('#riskIndicatorsTab');
		var benchmark = dom.find('select').val() == undefined ? 'hs300' : dom.find('select').val();
		var freq_length = $("#riskIndicatorsSLT").val() == undefined ? 'total' : $("#riskIndicatorsSLT").val();
		var params = {
			'fund_id' : fundId,
			'benchmark' : benchmark,
			'freq' : $('#freqInput').val(),
			'freq_length' : freq_length,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v2/portfolio/indicators/risk/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.error_log != undefined) {
					layer.msg(resp.error_log);
				} else {
					//下拉框
					var s = resp.freq_length_dict;
					var str = "<option value='total'>" + s.total + "</option>" + //排序
						"<option value='year'>" + s.year + "</option>" +
						"<option value='m3'>" + s.m3 + "</option>" +
						"<option value='m6'>" + s.m6 + "</option>" +
						"<option value='y1'>" + s.y1 + "</option>" +
						"<option value='y2'>" + s.y2 + "</option>";
					/*$.each(resp.freq_length_dict,function(i,n){
						str+="<option value='"+i+"'>"+n+"</option>";
					});*/
					$('#riskIndicatorsSLT').html(str);
					var onPostBody = function(row, element, field) {
						dom.find('th:eq(2)').html(getSelectIpn(resp.benchmark_dict));
						dom.find('select').on('change', function() {
							riskIndicators();
						})
					}
					var ts = resp.risk_indicators.table_data; //表数据
					initTable1(dom, {
						'data' : ts.data,
						'columns' : ts.columns,
						'onPostBody' : onPostBody
					});
					dom.bootstrapTable('load', {
						'data' : ts.data,
						'columns' : ts.columns,
						'onPostBody' : onPostBody
					});
					//图
					var gs = resp.risk_indicators.graphic_data; //图数据
					/*initGrid($('#riskScharts'),{'legend':true,'chart_type':'column','xCategories':gs.categories,'series':gs.series})*/
					initchart($('#riskScharts'), gs, {
						chart_type : 'column',
						reservations : "percent",
						'columnPointWidth':"20",
						legend : {
							enabled : true,
						},
					});
					dom.find('select').val(benchmark);
					$("#riskIndicatorsSLT").val(freq_length);
				}

			}
		})
	}

	//动态回撤
	function dynamicRetreat() {
		var params = {
			'fund_id' : fundId,
			'date_start' : dateStart,
			'date_end' : dateEnd,
			'user_id' : useUserId,
			'freq' : $('#freqInput').val()
		};
		$.ajax({
			url : apiPath + '/api/v2/portfolio/indicators/retracement/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.error_log != undefined) {
					layer.msg(resp.error_log);
				} else {
					var data = [];
					$.each(resp.retracement_data.dates, function(i, n) {
						data.push([ new Date(n).getTime(), util.fmtFixed(resp.retracement_data.data_list[0].data[i], 4) * 1 ]);
					})
					resp.retracement_data.data_list[0].data = data;
					initArea($('#riskBcharts'), {'series' : resp.retracement_data.data_list}, {
						'color':['#7cb5ec'],
						'zoomType':'x',
						'reservations' : 'percent2',
						'x_tickmarkPlacement':'on',
						'lineWidth':2,
						'xType':'datetime',
						legend : {},						
					});
					dateStart3 = util.minYears(resp.date_interval.max,1);
					dateEnd3 = resp.date_interval.max;
					$('#Retreat_date_start').val(dateStart == null ? resp.date_interval.min : dateStart);
					$('#Retreat_date_end').val(dateEnd == null ? resp.date_interval.max : dateEnd);
					$('#Retreat_date_start').datetimepicker('setStartDate', resp.date_interval.min);
					$('#Retreat_date_end').datetimepicker('setEndDate', resp.date_interval.max);
				}
			}
		})
	}

	//风险调整收益指标
	function riskAdjustment() {
		var dom = $('#riskAdjustmentTab');
		var benchmark = dom.find('select').val() == undefined ? 'hs300' : dom.find('select').val();
		var indicator = $("#riskAdjustmentSLT").val() == undefined ? 'sharp_a' : $('#riskAdjustmentSLT').val()
		var params = {
			'fund_id' : fundId,
			'benchmark' : benchmark,
			'indicator' : indicator,
			'freq' : $('#freqInput').val(),
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v2/portfolio/indicators/risk_adjustment/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.error_log != undefined) {
					layer.msg(resp.error_log);
				} else {
					//下拉框
					if(!riskState){
						var str = "";
						str+="<option value='sharp_a'>" + resp.indicator_dict.sharp_a + "</option>";
						$.each(resp.indicator_dict, function(i, n) {
							if(i!="sharp_a"){
								str += "<option value='" + i + "'>" + n + "</option>";
							}
						});
						$('#riskAdjustmentSLT').html(str);
						riskState = true;
					}
					
					//表
					var onPostBody = function(row, element, field) { //
						dom.find('th:eq(2)').html(getSelectIpn(resp.benchmark_dict));
						dom.find('select').on('change', function() {
							riskAdjustment();
						})
					}
					var ts = resp.risk_adjust_indicators.table_data; //表数据
					initTable3(dom, {
						'data' : ts.data,
						'columns' : ts.columns,
						'onPostBody' : onPostBody
					});
					dom.bootstrapTable('load', {
						'data' : ts.data,
						'columns' : ts.columns,
						'onPostBody' : onPostBody
					});
					//图
					var gs = resp.risk_adjust_indicators.graphic_data; //图数据
					/*initGrid2($('#riskAdjustmentGrid'),{'legend':true,'chart_type':'column','xCategories':gs.categories,'series':gs.series})*/
					initchart($('#riskAdjustmentGrid'), gs, {
						chart_type : 'column',
						reservations : "fixed4",
						'columnPointWidth':"20",
						legend : {
							enabled : true,
						},
					});
                    dom.find('select').val(benchmark);
                    $(".headerSright select:eq(3)").val(indicator);
				}
			}
		})
	}

	//相对指标
	function relativeIndex() {
		var bmk =$('#riskAdjustmentSLT1').find("option:selected").val();
		var params = {
			'fund_id' : fundId,
			'benchmark' : bmk == undefined ? 'hs300' : bmk,
			'freq' : $('#freqInput').val(),
			'freq_length' : $(".headerSright select:eq(4)").val(),
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v2/portfolio/indicators/relative/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.error_log != undefined) {
					$('#relativeIndexTab').text(resp.error_log);
				} else {
					//下拉框
					if(!benchmarkState){
						var str = "";
						if(params.benchmark=='hs300')
                            str+="<option value='hs300' selected='selected'>" + resp.benchmark_dict.hs300 + "</option>";
						else
							str+="<option value='hs300' >" + resp.benchmark_dict.hs300 + "</option>";
						$.each(resp.benchmark_dict, function(i, n) {
							if(i!="hs300"){
								str += "<option value='" + i + "'>" + n + "</option>";
							}
						});
						$('#riskAdjustmentSLT1').html(str);
						benchmarkState = true;
					}
					var dom = $('#relativeIndexTab');
					var ts = resp.relative_indicators.table_data; //表数据
					initTable2(dom, {
						'data' : ts.data,
						'columns' : ts.columns
					});
					dom.bootstrapTable('load', {
						'data' : ts.data,
						'columns' : ts.columns
					});
					//图
					var gs = resp.relative_indicators.graphic_data; //图数据
					$.each(gs.series, function(i, n) {
						if (n.name != '胜率') {
							gs.series[i].visible = false;
						}
					})
					/*initGrid2($('#relativeIndexGrid'),{'legend':true,'chart_type':'column','xCategories':gs.categories,'series':gs.series});*/
					initchart($('#relativeIndexGrid'), gs, {
						chart_type : 'column',
						reservations : "fixed4",
						'columnPointWidth':"20",
						legend : {
							enabled : true,
						},
					});
					var tr_a = $('.tr_a');
					for (var i = 1; i < tr_a.length; i++) {
						if (parseInt($(tr_a[i]).text()) < -1000 || parseInt($(tr_a[i]).text()) > 1000) {
							$(tr_a[i]).text("--");
						}
					}
				}

			}
		})
	}


	function initTable(dom, resp) {
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
					field : 'return_a',
					title : resp.columns.return_a,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return val + "<br/>（" + row.return_a_rank + "）"
					}
				},
				{
					field : 'return',
					title : '累计收益',
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return val + "<br>（" + row.return_rank + "）"
					}
				},
				{
					field : 'sharp_a',
					title : resp.columns.sharp_a,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return val + "<br>（" + row.sharp_a_rank + "）"
					}
				},
				{
					field : 'max_retracement',
					title : resp.columns.max_retracement,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return val + "<br>（" + row.max_retracement_rank + "）"
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.onPostBody
		});
	}

	function initTable1(dom, resp) {
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
					field : 'fund',
					title : resp.columns.fund,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'bm',
					title : resp.columns.bm,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'pe',
					title : resp.columns.pe,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.onPostBody
		});
	}

	function initTable2(dom, resp) {
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
					field : 'odds',
					title : resp.columns.odds,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'benchmark_r',
					title : resp.columns.benchmark_r,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4)
					}
				},
				{
					field : 'inf_a',
					title : resp.columns.inf_a,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'jensen_a',
					title : resp.columns.jensen_a,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4)
					}
				},
				{
					field : 'tr_a',
					title : resp.columns.tr_a,
					sortable : false,
					class : 'tr_a',
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.onPostBody
		});
	}

	function initTable3(dom, resp) {
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
					field : 'fund',
					title : resp.columns.fund,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'bm',
					title : resp.columns.bm,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'pe',
					title : resp.columns.pe,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.onPostBody
		});
	}


	//百分比图
	/*	function initGrid(dom,resp){
			dom.highcharts({
				chart: {
					type: resp.chart_type//'area'
				},
				colors:['#2765B9','#2C8CF8','#FB88B3','#D72F54','#9370DB'],
				title: {
					text: ''
				},
				xAxis: {
					categories: resp.xCategories
				},
				yAxis: [{
					title: {
						text: ''
					},
					labels: {
		                formatter: function () {
		                    return util.fmtRatio(this.value);
		                },
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                },
		                enabled: true //轴可见
		            }
				},{
		            title: {
		                text: ''
		            },
					labels: {
		                formatter: function () {
		                    return util.fmtFixed(this.value,4);
		                },
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                }
		            },
		            opposite: true
		        }],
				legend:{
					layout: 'vertical',
			        align: 'right',
			        verticalAlign: 'middle',
			        borderWidth: 0,
					enabled:resp.legend
				},
				exporting: {
		        	enabled: false  //设置导出按钮不可用
		        },
				credits: {
		            enabled: false	//屏蔽highcharts链接
		        },
				tooltip: {
					pointFormatter: function(){
			        		return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+util.fmtRatio(this.y)+'</b> <br/>';
			        },
					shared: true
				},
				plotOptions: {
					column: {
						//stacking: 'percent'
					}
				},
				series: resp.series
			});
		}*/
	//数值图
	function initGrid2(dom, resp) {
		dom.highcharts({
			chart : {
				type : resp.chart_type //'area'
			},
			colors : [ '#2765B9', '#2C8CF8', '#FB88B3', '#D72F54', '#4BECFF' ],
			title : {
				text : ''
			},
			xAxis : {
				categories : resp.xCategories
			},
			yAxis : [ {
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return util.fmtFixed(this.value, 4);
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					},
					enabled : true //轴可见
				}
			}, {
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return util.fmtRatio(this.value);
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				opposite : true
			} ],
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0,
				enabled : resp.legend
			},
			exporting : {
				enabled : false //设置导出按钮不可用
			},
			credits : {
				enabled : false //屏蔽highcharts链接
			},
			tooltip : {
				pointFormatter : function() {
					return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + util.fmtFixed(this.y, 4) + '</b> <br/>';
				},
				shared : true
			},
			plotOptions : {
				column : {
					//stacking: 'percent'
				}
			},
			series : resp.series
		});
	}

	//嵌套图
	function initGrid3(dom, resp) {
		dom.highcharts({
			chart : {
				type : resp.chart_type //'area'
			},
			colors : [ '#407ED2' ], //['rgba(165,170,217,1)','rgba(126,86,134,.9)'],
			title : {
				text : ''
			},
			xAxis : {
				categories : resp.xCategories
			},
			yAxis : {
				max : 1,
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return util.fmtRatio(this.value);
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					},
					enabled : true //轴可见
				}
			},
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0,
				enabled : resp.legend
			},
			exporting : {
				enabled : false //设置导出按钮不可用
			},
			credits : {
				enabled : false //屏蔽highcharts链接
			},
			tooltip : {
				pointFormatter : function() {
					return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + util.fmtRatio(this.y) + '</b> <br/>';
				},
				shared : true
			},
			plotOptions : {
				column : {
					grouping : false,
					shadow : false,
					borderWidth : 0
				}
			},
			series : resp.series
		});
	}
	//收益指标定制饼图
	function initIncomeGrid(dom, resp) {
		var name = resp.series.columns;
		var data = resp.series.data;
		$.each(data, function(i, n) {
			/*$.each(n,function(j,k){
				if(k == '-')
					data[i][j] = 0;
			})*/
			if (n[0][1] == '-')
				data[i][0][1] = 0
			if (n[1][1] == '-')
				data[i][1][1] = 0
		});
		dom.highcharts({
			title : {
				floating : true,
				text : ''
			},
			tooltip : {
				pointFormat : '{series.name}: <b>{point.y}({point.percentage:.1f}%)</b>'
			},
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : false,
					},
					//showInLegend: true,
					point : {
						/*events: {
						    mouseOver: function(e) {  // 鼠标滑过时动态更新标题
						        // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
						        chart.setTitle({
						            text: e.target.name+ '\t'+ e.target.y + ' %'
						        });
						    }
						}*/
					},
				}
			},
			series : [ {
				type : 'pie',
				innerSize : '85%',
				size : '100%',
				name : name.bm,
				colors : [ '#44ACC3', '#D3D6D9' ],
				center : [ "25%" ],
				data : data.bm
			}, {
				type : 'pie',
				innerSize : '80%',
				size : '75%',
				name : name.pe,
				colors : [ '#EA6987', '#D3D6D9' ],
				center : [ "25%" ],
				data : data.pe
			}, {
				type : 'pie',
				innerSize : '80%',
				name : name.fund,
				colors : [ '#32D3F7', '#D3D6D9' ],
				center : [ "75%" ],
				data : data.fund
			} ]
		})
	}
	//提取
	function getSelectIpn(op) {
		var str = "<select class='form-control tableHeaderSelect'>";
		$.each(op, function(i, n) {
			str += "<option value='" + i + "'>" + n + "</option>";
		});
		return str += "</select>";
	}














	function initAction() {
		var iSpeed = 0;
		var left = 0;
		function move(obj, iTarget) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				iSpeed += (iTarget - obj.offsetLeft) / 5;
				iSpeed *= 0.7;
				left += iSpeed;

				if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
					clearInterval(obj.timer);

					obj.style.left = iTarget + 'px';
				//alert('关了');
				} else {
					obj.style.left = left + 'px';
				}
			}, 30);
		}
		var historyUl = document.getElementById('incomeUl');
		var historyLi = historyUl.getElementsByTagName('li');
		var historyBg = historyLi[historyLi.length - 1];
		var Distance = historyUl.children[0].offsetLeft;
		var current = 0;
		for (var i = 0; i < historyLi.length - 1; i++) {
			historyLi[i].onmouseover = function() {
				startMove1(historyBg, this.offsetLeft);
			};
			historyLi[i].onmouseout = function() {
				startMove1(historyBg, Distance);
			};
			historyLi[i].onclick = function() {
				Distance = this.offsetLeft;
			};
		}


	}

	/**
	 * 加载净值图表数据
	 */
	function loadNavChart() {
		params = $.extend({}, {
			'fund_id' : $('#fundId').val(),
			'user_id' : useUserId,
			'freq' : $('#freqInput').val()
		}, {
			'date_start' : dateStart1
		}, {
			'date_end' : dateEnd1
		});
		$.ajax({
			url : apiPath + "/api/v2/portfolio/indicators/nav/", //return_max_retracement
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {	
				/*console.log(resp)*/
				var a = $('#fundId').val();
				dateStart2 = util.minYears(resp.interval[a].max,1);
				dateEnd2 = resp.interval[a].max;				
				$('#yield_date_start').val(dateStart1 == null ? resp.interval[a].min : dateStart1);
				$('#yield_date_end').val(dateEnd1 == null ? resp.interval[a].max : dateEnd1);
				$('#yield_date_start').datetimepicker('setStartDate', resp.interval[a].min);
				$('#yield_date_end').datetimepicker('setEndDate', resp.interval[a].max);
				/*var temp=(dateStart2.replace(/-/g,"")-1+2).toString();
				var temp2=resp.dates.indexOf(temp);
				resp.dates=resp.dates.slice(temp2);
				console.log(resp,temp,temp2)*/
				initNavChart(resp);
				initNavTable($('#nav-main-grid'),resp);
			},
			error : function(resp) {
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r);
			}
		});
	}
	/*
	 * hcharts 净值图 
	 */
	function initNavChart(datas) {
		var jsonData = {
			'data' : datas['data_interpolate'],
			'dates' : datas['dates']
		}; //
		var nameDict = {
			'0' : $("#fund").text(),
			'nav' : '单位净值',
			'added_nav' : '累计净值',
			'swanav' : '复权累计净值',
			'return_nav' : $("#fund_name").text(),
			'return_hs300' : '沪深300',
			'return_sse50' : '上证50',
			'return_csi500' : '中证500',
			'return_cbi' : '中债指数',
			'return_nfi' : '南华商品指数',
			'return_fi13' : '组合投资策略指数',
			'return_fi12' : '多策略指数',
			'return_fi11' : '相对价值策略指数',
			'return_fi10' : '事件驱动策略指数',
			'return_fi09' : '宏观策略指数',
			'return_fi08' : '管理期货策略指数',
			'return_fi07' : '债券基金指数',
			'return_fi06' : '市场中性策略指数',
			'return_fi05' : '股票多空策略指数',
			'return_fi04' : '股票多头策略指数',
			'return_fi03' : '私募FOF指数',
			'return_fi02' : '阳光私募指数',
			'return_fi01' : '私募全市场指数',
		}

		var valid_index = 0;
		for (; valid_index < jsonData['data'][0]['data'].length; valid_index++) {
			if (jsonData['data'][0]['data'][valid_index] != '-') {
				break;
			}
		}

		jsonData['dates'] = jsonData['dates'].slice(valid_index);

		series = [];
		for (var i = 0; i < jsonData['data'].length; i++) {
			var serie = jsonData['data'][i];
			if (!serie['name'].match('return')) {
				continue;
			}


			if (serie['name'] == 'return_nav') {
				datas = [];
				for (var j = valid_index; j < serie['data'].length; ++j) {
					var data = {
						y : serie['data'][j],
						nav : jsonData['data'][0]['data'][j],
						added_nav : jsonData['data'][1]['data'][j],
						swanav : jsonData['data'][2]['data'][j]
					};
					datas.push(data);
				}
				serie['data'] = datas;
			} else {
				var index_datas;
				var index_name = serie['name'].slice(7);
				for (var z = 0; z < jsonData['data'].length; z++) {
					if (jsonData['data'][z]['name'] == index_name) {
						index_datas = jsonData['data'][z]['data'];
						break;
					}
				}

				datas = [];
				for (var j = valid_index; j < serie['data'].length; ++j) {
					var data = {
						y : serie['data'][j],
						index_value : index_datas[j],
					};
					datas.push(data);
				}
				serie['data'] = datas;

				if (index_name != 'hs300') {
					serie['visible'] = false;
				}
			}
			serie['name'] = serie['name'].toLowerCase();
			serie['name'] = nameDict[serie['name']];
			serie['turboThreshold'] = 0;
			series.push(serie);
		}

		var chart = new Highcharts.Chart('netCharts', {
			chart : {
				type : 'spline', //areaspline
				zoomType : 'x',
				panning : true,
				panKey : 'shift'
			},
			colors : [ '#f8354f', '#1f8aee', '#2FB9A1', '#7bbdf5', '#E4C11B', '#622A80', '#FFA1CC', '#349CB8' ],
			"title" : {
				"text" : ''
			},
			xAxis : {
				tickInterval : parseInt(jsonData['dates'].length / 20),
				categories : jsonData['dates'],
				labels : {
					step : 1,
					rotation : -45,
				}
			},
			yAxis : {
				labels : {
					formatter : function() {
						return this.value * 100 + '%';
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				gridLineWidth : 1,
				title : {
					text : ' '
				},
				labels : {
					formatter : function() {
						return this.value * 100 + '%';
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					},
					enabled : true //轴可见
				}
			},
			tooltip : {
				shared : true,
				formatter : function() {
					var points = this.points;
					var pointsLength = points.length;
					var y_value_kwh = '';
					for (var i = 0; i < points.length; i++) {
						if (i == 0) {
							y_value_kwh += '日期: ' + points[i].point.category + '<br>单位净值: ' + util.fmtFixed(points[i].point.nav, 4) + '<b><br>  累计净值: ' + util.fmtFixed(points[i].point.added_nav, 4) +
								'<b><br>复权累计净值: ' + util.fmtFixed(points[i].point.swanav, 4) + '<b><br>累计收益率: ' + Highcharts.numberFormat((points[i].point.y * 100), 2, '.') + '%';
						} else {
							y_value_kwh += '<b><br>' + points[i].series.name + '累计收益率: ' +
								util.fmtRatio(points[i].point.y) + ' (' + points[i].point.index_value.toFixed(2) + ')';
						}
					}
					return y_value_kwh;
				},
			},
			legend : {
				layout : 'horizontal',
				align : 'center',
				verticalAlign : 'bottom',
				y : -20,
				floating : false,
				backgroundColor : '#FFFFFF'
			},
			credits : {
				enabled : false
			},
			plotOptions : {
				series : {
					marker : {
						radius : 1, //曲线点半径，默认是4
					}
				}
			},
			series : series,
		//		    exporting: {
		//	            url: hchartsExportServerUrl
		//	        }
		});
	}

	/*
	 * hcharts 净值表格
	 */
	function initNavTable(dom,resp) {
		var jsonData = {
			'data' : resp['data'],
			'dates' : resp['dates_reverse']
		};
		var datas = [];
		for (var i = 0; i < jsonData['dates'].length; ++i) {
			var each_data = {
				'static_date' : jsonData['dates'][i]
			};
			for (var ix = 0; ix < jsonData['data'].length; ++ix) {
				if (jsonData['data'][ix].name == 'nav') {
					each_data['nav'] = jsonData['data'][ix].data[i];
				} else if (jsonData['data'][ix].name == 'added_nav') {
					each_data['added_nav'] = jsonData['data'][ix].data[i];
				} else if (jsonData['data'][ix].name == 'swanav') {
					each_data['swanav'] = jsonData['data'][ix].data[i];
				} else if (jsonData['data'][ix].name == "return_nav") {
					each_data["return_nav"] = jsonData['data'][ix].data[i];
				} else if (jsonData['data'][ix].name == "source") {
					each_data["source"] = jsonData['data'][ix].data[i];
				}
			}
			datas.push(each_data);
		}

		dom.bootstrapTable({
			showExport : true,
			exportDataType : "all", //basic', 'all', 'selected'.
			sidePagination : 'client',
			exportTypes : [ 'csv', 'excel' ], //支持导出类型: 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'.
			cache : false,
			data : datas,
			pagination : true,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 50, 100 ],
			search : false,
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			undefinedText : '--',
			columns : [
				{
					field : 'static_date',
					title : '净值日期',
					sortable : true,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
					}
				},
				{
					field : 'nav',
					title : '单位净值',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'added_nav',
					title : '累计净值',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'swanav',
					title : '复权累计净值',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				//{field:'return_nav',title:'累计收益率',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
				{
					field : 'source',
					title : '数据来源',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle'
				},
			],
		});
		$('#nav-main-grid').bootstrapTable('load', datas);
	}














	//输出区域
	exports.init = _init;
});