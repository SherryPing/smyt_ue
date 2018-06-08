/**
 * 情景分析.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	require('heatmap');
	var $ = require('jquery');
	var highcharts = require('highstock');
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
	var strategy;
	var count = 0;
	var conditionDatas;
	var stockIndustryData;


	function _init() {
		initConfig();
	}
	function initConfig() {
        $('.menuDiv').click(function(){
            $('#first_menu').toggle();
        });
        $('#first_menu').on('click','.strategy',function(){
            var content = $(this).data("name");
            $('#showName').text(content);
            strategy = $(this).data("id");
            $("#first_menu").css('display','none');
            initSceneEvents(strategy);
            return false
        });
		initSceneEvents(null);
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
	function initSceneEvents(strategy) {
        var params = {
            'fund_id' : $('#fundId').val(),
            'user_id' : useUserId
        };
        if(strategy!==null){
            $.extend(params,{"event_id":strategy.toString()})
        }
		$.ajax({
			url : apiPath + "/api/v1/mutual/scene_analysis/stress_testing/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
					//console.log(resp);
					if (resp.succeed == false) {
                        $('#event-main-table input').val("--");
                        $('#tblDate').text("--");
                        $('#earningStatistic1').html("<div style='text-align: center;margin-top: 80px;'>暂无数据</div>");
					}else{
                        // if(count==0){
                        //     var menu = "";
                        //     $('#showName').text(resp.graphic_data.categories[0]);
                        //     for(var i = 0;i<resp.all_events.length;i++){
                        //         menu+="<li class='strategy1'><a>"+resp.all_events[i].market+"</a><ul class='head_twoMenu'>";
                        //         for(var k = 0;k<resp.all_events[i].events.length;k++){
                        //             menu+="<li class='strategy number1' data-name='"+resp.all_events[i].events[k].name+"' data-id='"+resp.all_events[i].events[k].event_id+"'>"+resp.all_events[i].events[k].name+"("+resp.all_events[i].events[k].date_start+"至"+resp.all_events[i].events[k].date_end+")</li>"
                        //         }
                        //         menu+="</ul></li>"
                        //     }
                        //     $('#first_menu').html(menu);
                        // }
                        var tbldata = resp.table_data.data[0]
                        for(i in tbldata){
                            if(i=="interval"){
                                $('#tblDate').html(tbldata[i].date_start+"<span class='margin10'>~</span>"+tbldata[i].date_end)
                            }else if(i=="row_name"){
                                testTbl[i].value=tbldata[i];
                            }else{
                                testTbl[i].value=util.fmtRatio(tbldata[i]);
                            }
                        }
					initchart($('#earningStatistic1'), resp.graphic_data, {
						'reservations' : 'percent',
						'chart_type' : 'column',
						legend : {enabled:true}
					});
						count++
				}
			},
			error : function(resp) {
                $('#event-main-table input').val("--");
                $('#tblDate').text("--");
                $('#earningStatistic1').html("<div style='text-align: center;margin-top: 80px;'>暂无数据</div>");
            }
		});
	}

	/*
	 * 市道分析
	 */
	function initMarketAnalysis() {
		params = $.extend({}, {
			'fund_id' : $('#fundId').val(),
			'date_start' : dateStart,
			'date_end' : dateEnd,
			'user_id' : useUserId
		});
		$.ajax({
			url : apiPath + "/api/v1/mutual/scene_analysis/market_analysis/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $('#market-main-table');
				if (resp.succeed == false) {
                    $("#earningStatistic2").html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")
                    $("#market-main-table").css("height","100px");
                    $("#market-main-table").css("line-height","100px");
                    $("#market-main-table").text("暂无数据");
				} else {
					for(var i=0;i<resp.count_result.data.length;i++){
						for(j in resp.count_result.data[i]){
							if(j!="row_name"){
								resp.table_data.data[i][j] = util.fmtRatio(resp.table_data.data[i][j])+"<span class='left5' style='color:#989696'>("+resp.count_result.data[i][j]+"天)</span>";
							}
						}
					}
					initMarketTable(resp.table_data.data);
					initchart($('#earningStatistic2'), resp.graphic_data, {
						'reservations' : 'percent',
						'chart_type' : 'column',
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
				},
				{
					field : '2_3',
					title : '2%至3%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
				},
				{
					field : '1_2',
					title : '1%至2%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
				},
				{
					field : '0_1',
					title : '0%至1%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
				},
				{
					field : '-1_0',
					title : '-1%至0%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
				},
				{
					field : '-2_-1',
					title : '-2%至-1%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
				},
				{
					field : '-3_-2',
					title : '-3%至-2%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
				},
				{
					field : '-3',
					title : '小于-3%',
					sortable : false,
					width : 100,
					align : 'center',
					valign : 'middle',
				},

			],
		});
	}
	//输出区域
	exports.init = _init;
});