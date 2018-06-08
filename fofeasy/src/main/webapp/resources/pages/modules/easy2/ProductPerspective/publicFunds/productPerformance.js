/*
 * 
 * 业绩指标JS
 * */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	var highcharts =require("highstock");
	var util = require('util');
	require('bootstrap_table_zh');
	require('chosen');
	require('colResizable');
	require('header');
	require('btdata_zh'); 
	require('move');

	// 变量区域
	var isFirst;
	var benchmarkCombo;
	var dateStart1 = null;
	var dateEnd1 = null;
	var dateStart = null;
	var dateEnd = null;
	var default_range="y1";//累计收益率频率
	var conditionDatas;
	var stockIndustryData;
	var time=1;//风险调整下拉框
	var fundId;
	var freq;
	var hb=false;
	var income_indicator="return";
	var hb_indicator=null;
	var coin_mian_url="/base/fund/total_return_v2/";//累计收益率接口，分货币型
    // var fund_name=sessionStorage.getItem("fund_name");
    var fund_name;
    var indicators = {"VaR":"VaR","stdev_a":"年化波动率","max_drawdown":"最大回撤","hs300":"沪深300","nfi":"南华商品指数","sse50":"上证50","FI01":"私募全市场指数","cbi":"中债指数","csi500":"中证500"};
    var indicators2 = {"odds":"胜率","sharpe_a":"年化夏普比率","calmar_a":"年化卡玛比率","sor_a":"年化索提诺比率","info_a":"年化信息比率","jensen_a":"年化詹森指数","tr_a":"年化特雷诺比率","ERVaR":"风险价值调整比"}
    var info_w=' <img src="'+ctxResources+'/images/info_w.png" class="infoImg" style="width: 16px;height:16px;">';
    var info_b=' <img src="'+ctxResources+'/images/info_b.png" class="infoImg" style="width: 16px;height:16px;">';

    // 初始化区域
	function _init() {
		initConfig();
	}
	function initConfig() {
        $("[data-toggle='popover']").popover();
        isFirst = true;
        fundId = $("#fundId").val();
        freq = $(".frequencyLdiv .frequencyActive").data('freq');
        //货币型
        if($("#menuImg3").css("display")=="none"){
            hb=true;
            $("#no_coin").css("display","none");
            $(".charHeadpil").css("display","none");
            $("#main_title").css("display","none");
            $("#coin_title").css("display","block");
            hb_indicator="return_10k";
            coin_mian_url="/base/fund/coin_return/";
            loadNavChart();
            initAction2();
        }else{
            loadNavChart();
            initAction();
            similarRankings();
            incomeIndicators();
            riskIndicators();
            dynamicRetreat();
            riskAdjustment();
            relativeIndex();
		}
		initEvent();

	}

	//初始化事件
	function initEvent() {
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
			} else {
				dateEnd1 = $(this).val();
			}
            default_range=null;
			loadNavChart();
		});
		//累计收益率近一年
		$('#lastYear').click(function() {
			dateStart1 = null;
			dateEnd1 = null;
			loadNavChart()
		})
		//动态回撤近一年
		$('#lastYear1').click(function() {
			dateStart = null;
			dateEnd = null;
			dynamicRetreat()
		})
		//动态回撤日期选择
		$('#Retreat_date_end,#Retreat_date_start').on('change', function() {
			if ($(this).attr('name') == 'date_start') {
				dateStart = $(this).val();
			} else {
				dateEnd = $(this).val();
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
			income_indicator = $(this).data('indicator');
			incomeIndicators();
		})
        //货币
        $('#incomeUl2 li').on('click', function() {
            hb_indicator = $(this).data('indicator');
            loadNavChart()
        })
		$(".headerSright select").on('change', function() {
			switch ($(".headerSright select").index($(this))) {
			case 0:
				similarRankings();
				break;
			case 1:
				incomeIndicators();
				break;
			case 2:
				riskIndicators();
				break;
			case 3:
				riskAdjustment();
                //指标说明
                var title=$("#riskAdjustmentSLT option:selected").text();
                var value=$("#riskAdjustmentSLT option:selected").val();
                $("#incomeScharts .pop").html(title+' <img src="'+ctxResources+'/images/info_b.png" class="infoImg" style="width: 16px;height:16px;">');
                $("#incomeScharts .pop").attr("data-content",util.explain(value))
				break;
			case 4:
				relativeIndex();
				break;
			default:
				break;
			}
		});

		$('#showAll').click(function() {
            showAll()
		});
        $('#showAll1').click(function() {
            showAll1();
        });

	}
    function showAll(){
        params = $.extend({}, {
            'default_range':"total",
            'fund_id' : $('#fundId').val(),
            'user_id' : useUserId,
			'indicator':hb_indicator
        });
        $.ajax({
            url:apiPath2 + coin_mian_url,
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.success) {
                    $('#yield_date_start').val(dateStart1 == null ? resp.records.start_end.start_date : dateStart1);
                    $('#yield_date_end').val(dateEnd1 == null ? resp.records.start_end.end_date : dateEnd1);
                    $('#yield_date_start').datetimepicker('setStartDate', resp.records.start_end.start_date);
                    $('#yield_date_start').datetimepicker('setEndDate',  resp.records.start_end.end_date);
                    $('#yield_date_end').datetimepicker('setStartDate',  resp.records.start_end.start_date);
                    $('#yield_date_end').datetimepicker('setEndDate',  resp.records.start_end.end_date);
                    initNavChart(resp);
                    var datas=[];
                    if (hb_indicator) {
                        for (var i = 0; i < resp.records.date_range.length; i++) {
                            datas.unshift({
                                static_date: resp.records.date_range[i],
                                return_10k: resp.records.return_10k[i],
                                d7_return_a: resp.records.d7_return_a[i]
                            });
                        }
                        initNavTable2($('#nav-main-grid'), datas);
                        $('#nav-main-grid').bootstrapTable('load', datas);
                        chart1.hideLoading();
                    } else {
                        for (var i = 0; i < resp.records.fund_date_range.length; i++) {
                            datas.unshift({
                                static_date: resp.records.fund_date_range[i],
                                nav: resp.records.nav[i],
                                added_nav: resp.records.added_nav[i],
                                swanav: resp.records.swanav[i]
                            });
                        }
                        initNavTable($('#nav-main-grid'), datas);
                        $('#nav-main-grid').bootstrapTable('load', datas);
                        chart1.hideLoading();
                    }
                }else{
					$("#netCharts").html("<p class='tip' style='position:relative;top: 50%;text-align: center;'>暂无数据</p>")
                }
            },
            error : function(resp) {
                var r = eval('(' + resp.responseJSON + ')');
                // layer.msg(r);
            }

        });
    }
    function showAll1(){
        params = $.extend({}, {
            'default_range' : 'total',
            'start_date' : null,
            'end_date' : null,
            'fund_id' : $('#fundId').val(),
            'user_id' : useUserId,
        });

        $.ajax({
            url : apiPath2 + '/base/fund/dynamic_retracement',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.error_log != undefined) {
                    $("#riskBcharts").html("<p class='tip' style='position:relative;top: 50%;text-align: center;'>暂无数据</p>")
                } else {
                    var data = [];
                    $.each(resp.records.dates, function(i, n) {
                        data.push([ new Date(n).getTime(), util.fmtFixed(resp.records.data_list[i], 4) * 1 ]);
                    })
                    $('#Retreat_date_start').val(resp.records.data_end.start);
                    $('#Retreat_date_end').val(resp.records.data_end.end);
                    $('#Retreat_date_start').datetimepicker('setStartDate', resp.records.data_end.start);
                    $('#Retreat_date_start').datetimepicker('setEndDate', resp.records.data_end.end);
                    $('#Retreat_date_end').datetimepicker('setStartDate', resp.records.data_end.start);
                    $('#Retreat_date_end').datetimepicker('setEndDate', resp.records.data_end.end);

                    initArea($('#riskBcharts'), {'series' : [{data:data,name:fund_name}]}, {
                        'color':['#7cb5ec'],
                        'zoomType':'x',
                        'reservations' : 'percent2',
                        'chart_type' : 'area',
                        'x_tickmarkPlacement':'on',
                        'xType':'datetime',
                        'lineWidth':2,
                        legend : {},

                    });
                }
            },
            error : function(resp) {
                var r = eval('(' + resp.responseJSON + ')');
                // layer.msg(r);
            }
        });
	}

	//同类排名
	function similarRankings() {
		//默认今年以来
		var freq_length = $("#similarRankingsSLT").val() == undefined ? 'year' : $("#similarRankingsSLT").val();
		var params = {
			'fund_id' : fundId,
            "default_range":freq_length,
            // 'fund_id' : "000001",
			'user_id' : useUserId
		};
		$.ajax({
            url:apiPath2+"/base/fund/mutual_ranking/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
                if (resp.success) {
                //     $("#similarRankingsGrid").html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")
                //     $("#similarRankingsTab").parent().html("<p class='tip' style='position:relative;top: 140px;text-align: center;'>暂无数据</p>")
                // } else {
					$('#rank_date').text("（  统计日期："+resp.records.sdate+" )");
					var dom = $('#similarRankingsTab');
				// 	//下拉框
					var s = resp.records.date_range;
					//排序
					var str = "<option value='year'>" + s.year + "</option>" +
						"<option value='m3'>" + s.m3 + "</option>" +
						"<option value='m6'>" + s.m6 + "</option>" +
						"<option value='y1'>" + s.y1 + "</option>";
				// 	/*$.each(resp.rank_percentage.freq_length_dict,function(i,n){
				// 		str+="<option value='"+i+"'>"+n+"</option>";
				// 	});*/
					$('#similarRankingsSLT').html(str);
					//图
					// var ts=resp.records.data_per;
					var gs_data=[{name:"本基金",data:resp.records.graph_data.data}];
					var gs_categories=resp.records.graph_data.columns;
					initchart($('#similarRankingsGrid'), {'series':gs_data,'categories':gs_categories}, {
						'reservations' : 'percent',
						'chart_type' : 'column',
						'max' : '1',
						legend : {
							enabled : true
						}
					})
					// $("#similarRankingsTab thead th[data-field='return_a']").find(".th-inner").html("")
					var ts = resp.records; //表数据
					$.each(ts.data_per, function(i, n) {
						ts.data_per[i]['return_a'] = util.fmtRatio(n['return_a']);
						ts.data_per[i]['return'] = util.fmtRatio(n['return']);
						ts.data_per[i]['sharpe_a'] = util.fmtFixed(n['sharpe_a'], 4);
						ts.data_per[i]['max_retracement'] = util.fmtRatio(n['max_retracement'],2);
						ts.data_per[i]['return_a_rank'] = ts.data_num[i]['return_a'];
						ts.data_per[i]['return_rank'] = ts.data_num[i]['return'];
						ts.data_per[i]['sharpe_a_rank'] = ts.data_num[i]['sharpe_a'];
						ts.data_per[i]['max_retracement_rank'] = ts.data_num[i]['max_drawdown'];
					})
					var onPostBody = function(row, element, field) {
						$("[data-toggle='popover']").popover();
						var sharpe_a= $('#similarRankingsTab thead th[data-field="sharpe_a"]').find("div.th-inner");
                        sharpe_a=util.table_info(sharpe_a,"sharpe_a");
                        sharpe_a.html("年化夏普比 "+info_w);
						var max_drawdown= $('#similarRankingsTab thead th[data-field="max_drawdown"]').find("div.th-inner");
                        max_drawdown=util.table_info(max_drawdown,"max_retracement")
                        max_drawdown.html("最大回撤 "+info_w)
					}
					initTable(dom, {
						'data' : ts.data_per,
						'columns' : ts.head,
						'onPostBody':onPostBody
					});
					dom.bootstrapTable('load', {
						'data' : ts.data_per,
						'columns' : ts.head,
                        'onPostBody':onPostBody
					});

					$("#similarRankingsSLT").val(freq_length);
				}
			}
		})
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
			'indicator' : income_indicator,
			'default_range' : freq_length,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath2 + '/base/fund/return_indicator/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.error_log != undefined) {
                    $("#incomeCycleRatio").html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")
                    $("#incomeIndicatorsTab").parent().html("<p class='tip' style='position:relative;top: 140px;text-align: center;'>暂无数据</p>")
                    $("#incomeBcharts").html("<p class='tip' style='position:relative;top: 42%;text-align: center;'>暂无数据</p>")
                } else {
                    $('#income_date').text("（  统计日期："+resp.records.sdate+" )");
					//下拉框
					var s = resp.records.date_range;
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
					var ts=resp.records.table_data;
                    var gs_data=[];
                    var gs_categories=[];
                    for(j in ts.columns){
                        var seri={};
                        var tempArr=[];
                        for( var i = 0;i<ts.data.length;i++){
                            if(j=="row_name"){
                                gs_categories.push(ts.data[i][j])
                            }else if(j=="fund"||j=="index"){
                                seri.name=ts.columns[j];
                                tempArr.push(ts.data[i][j])
                            }
                        }
                        if(tempArr.length>0){
                            seri.data=tempArr;
                            gs_data.push(seri)
                        }
                    }
                    // var gs = resp.risk_adjust_indicators.graphic_data; //图数据
					initchart($('#incomeBcharts'),{'series':gs_data,'categories':gs_categories},  {
						'reservations' : 'percent',
						'chart_type' : 'column',
						legend : {
							enabled : true
						}
					});
					//表
					var onPostBody = function(row, element, field) {
						dom.find('th:eq(2)').html(getSelectIpn(resp.records.benchmark));
						dom.find('select').on('change', function() {
							incomeIndicators();
						})
					}
					var ts = resp.records.table_data; //表数据
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
					var p = resp.records.return_n_p;
					var p_columns={};
                    p_columns.fund=resp.records.table_data.columns.fund;
                    p_columns.index=resp.records.table_data.columns.index;
					var p_data={};
					var p_fund=[];
                    var p_index=[];
                    p_fund.push(["正收益期数",p.fund.p])
                    p_fund.push(["非正收益期数",p.fund.n])
                    p_index.push(["正收益期数",p.index.p])
                    p_index.push(["非正收益期数",p.index.n])
                    p_data.fund=p_fund;
                    p_data.index=p_index;


					//图例
					$('#return_bm_div').text(p_columns.index).attr('title', p_data.index);
					$('#return_fund_div').text(p_columns.fund).attr('title', p_data.fund);

					initIncomeGrid($('#incomeCycleRatio'), {
						'columns':p_columns,
						'data':p_data
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
            "default_range":freq_length,
            'date_start' : null,
            'date_end' : null,
			'user_id' : useUserId
		};
		$.ajax({
            url:apiPath2 + "/base/fund/risk_indicator/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.msg) {
                    $("#riskScharts").html("<div class='tip' style='position:relative;top: 45%;text-align: center;'>"+resp.msg+"</div>")
				} else {
					//下拉框
                    $('#risk_date').text("（  统计日期："+resp.records.sdate+" )");
					var s = resp.records.freq_length_dict[0];
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
                        $("[data-toggle='popover']").popover();
						dom.find('th:eq(2)').html(getSelectIpn(resp.records.benchmark_dict));
						dom.find('select').on('change', function() {
							riskIndicators();
						})
					}
                    // var table_column={row_name:"风险指标",fund:resp.records.index[0]}
					// for(var i = 0; i < resp.records.index.length; i++){
                    // var table_column={row_name:"风险指标",fund:resp.records.data.index[0],index:resp.records.data.index[1]}
					// // }
					// var table_data=[];
					// for(var i=0;i<resp.records.data.columns.length; i++){
                     //    resp.records.data.columns[i]=indicators[resp.records.data.columns[i]];
                     //    table_data.push({row_name:resp.records.data.columns[i],fund:resp.records.data.data[0][i],index:resp.records.data.data[1][i]})
					// }
                    var ts = resp.records.table_date; //表数据
					initTable1(dom, {
						'data' : ts.data,
						'columns' : ts.head,
						'onPostBody' : onPostBody
					});
					dom.bootstrapTable('load', {
						'data' : ts.data,
						'columns' : ts.head,
						'onPostBody' : onPostBody
					});
					//图
                    var ts=resp.records.table_date;
                    var gs_data=[];
                    var gs_categories=[];
                    for(j in ts.head){
                        var seri={};
                        var tempArr=[];
                        for( var i = 0;i<ts.data.length;i++){
                            if(j=="row_name"){
                                gs_categories.push(ts.data[i][j])
                            }else if(j=="fund"||j=="index"){
                                seri.name=ts.head[j];
                                tempArr.push(ts.data[i][j])
                            }
                        }
                        if(tempArr.length>0){
                            seri.data=tempArr;
                            gs_data.push(seri)
                        }
                    }

                    // var series = [];
                    // var categories = [];
                    // for (var i = 0; i < resp.records.data.columns.length; i++) {//categories生成
                    //     categories.push(resp.records.data.columns[i])
                    // }
                    // for(var i = 0; i < resp.records.data.data.length; i++){//series生成
                    //     var data = resp.records.data.data[i];
                    //     var name = resp.records.data.index[i];
                    //     series.push({data: data, name: name})
                    // }
					initchart($('#riskScharts'), {'series':gs_data,'categories':gs_categories}, {
						'reservations' : 'percent',
						'chart_type' : 'column',
						legend : {
							enabled : true
						}
					})
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
			'start_date' : dateStart,
			'end_date' : dateEnd,
			'user_id' : useUserId,
			'default_range' : 'y1',
		};
		$.ajax({
            url : apiPath2 + '/base/fund/dynamic_retracement',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.error_log != undefined) {
					showAll1();
				} else {
					var data = [];
					$.each(resp.records.dates, function(i, n) {
						data.push([ new Date(n).getTime(), util.fmtFixed(resp.records.data_list[i], 4) * 1 ]);
					})
					// resp.retracement_
					// data.data_list[0].data = data;
                    fund_name=resp.records.fund_name;
					initArea($('#riskBcharts'), {'series' : [{data:data,name:fund_name}]}, {
						'color':['#7cb5ec'],
						'zoomType':'x',
						'reservations' : 'percent2',
						'chart_type' : 'area',
						'x_tickmarkPlacement':'on',
						'lineWidth':2,
						'xType':'datetime',
                        // 'rotation':-45,
						legend : {},						
					});
					$('#Retreat_date_start').val(dateStart == null ? resp.records.data_end.start : dateStart);
					$('#Retreat_date_end').val(dateEnd == null ? resp.records.data_end.end : dateEnd);
					$('#Retreat_date_start').datetimepicker('setStartDate', resp.records.data_end.start);
					$('#Retreat_date_end').datetimepicker('setEndDate', resp.records.data_end.end);
				}
			}
		})
	}

	//风险调整收益指标
	function riskAdjustment() {
		var dom = $('#riskAdjustmentTab');
		var benchmark = dom.find('select').val() == undefined ? 'hs300' : dom.find('select').val();
		var risk_indicator = $("#riskAdjustmentSLT").val() == undefined ? 'sharp_a' : $('#riskAdjustmentSLT').val()
		var params = {
			'fund_id' : fundId,
			'benchmark' : benchmark,
			'indicator' : risk_indicator,
			'user_id' : useUserId
		};
		$.ajax({
            url:apiPath2+'/base/fund/risk_adjustment/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.success) {
                    $('#riskAdjust_date').text("（  统计日期："+resp.records.sdate+" )");
					//下拉框
					var str = "";
					$.each(resp.records.indicator_dict, function (i, n) {
						str += "<option value='" + i + "'>" + n + "</option>";
					});
					$('#riskAdjustmentSLT').html(str);
                    //表
                    var onPostBody = function(row, element, field) {
                        dom.find('th:eq(2)').html(getSelectIpn(resp.records.benchmark_dict));
                        dom.find('select').on('change', function() {
                            riskAdjustment();
                        })
                    }
                    var ts = resp.records.table_data; //表数据
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
                    // //图
                    var gs_data=[];
                    var gs_categories=[];
                    for(j in ts.columns){
                        var seri={};
                        var tempArr=[];
                        for( var i = 0;i<ts.data.length;i++){
                            if(j=="row_name"){
                                gs_categories.push(ts.data[i][j])
                            }else if(j=="fund"||j=="index"){
                                seri.name=ts.columns[j];
                                tempArr.push(ts.data[i][j])
                            }
                        }
                        if(tempArr.length>0){
                            seri.data=tempArr;
                            gs_data.push(seri)
                        }
                    }
                    // var gs = resp.risk_adjust_indicators.graphic_data; //图数据
                    initchart($('#riskAdjustmentGrid'), {'series':gs_data,'categories':gs_categories}, {
                        'reservations' : 'fixed4',
                        'chart_type' : 'column',
                        legend : {
                            enabled : true
                        }
                    })
                    dom.find('select').val(benchmark);
                    $(".headerSright select:eq(3)").val(risk_indicator);
                } else {
                    $("#riskAdjustmentGrid").html("<p class='tip' style='position:relative;top: 140px;text-align: center;'>暂无数据</p>")
                    $("#riskAdjustmentTab").parent().html("<p class='tip' style='position:relative;top: 36%;text-align: center;'>暂无数据</p>")
                }
			}
		})
	}

	//相对指标
	function relativeIndex() {
		var bmk = $('#relativeIndexGrid').parent().find('select').val();
		var params = {
			'fund_id' : fundId,
			'benchmark' : bmk == undefined ? 'hs300' : bmk,
			'user_id' : useUserId
		};
		$.ajax({
            url:apiPath2+'/base/fund/relative/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (!resp.success) {
                    $("#relativeIndexTab").html("<p class='tip' style='position:relative;top: 140px;text-align: center;'>暂无数据</p>")
                    $("#relativeIndexGrid").html("<p class='tip' style='position:relative;top: 36%;text-align: center;'>暂无数据</p>")
				} else {
                    $('#relative_date').text("（  统计日期："+resp.records.sdate+" )");
                    var dom = $('#relativeIndexTab');
                    var ts = resp.records.table_data; //表数据
                    ts.table_head.row_name="统计区间";
                    //图
                    var gs_data=[];
                    var gs_categories=[];
                    for(j in ts.table_head){
                        var seri={};
                        var tempArr=[];
                        for( var i = 0;i<ts.data.length;i++){
                            if(j=="row_name"){
                                gs_categories.push(ts.data[i][j])
                            }else{
                                seri.name=ts.table_head[j];
                                tempArr.push(ts.data[i][j])
                            }
                        }
                        if(tempArr.length>0){
                            seri.data=tempArr;
                            gs_data.push(seri)
                        }
                    }

                    // var gs = resp.relative_indicators.graphic_data; //图数据
                    $.each(gs_data, function(i, n) {
                        if (n.name != '胜率') {
                            gs_data[i].visible = false;
                            //gs.series[i].yAxis = 1;
                        }
                    })
                    initchart($('#relativeIndexGrid'), {'series':gs_data,'categories':gs_categories}, {
                        'reservations' : 'fixed4',
                        'chart_type' : 'column',
                        legend : {
                            enabled : true
                        }
                    });
					//表

                    var onPostBody = function(row, element, field) {
                        $("[data-toggle='popover']").popover();
                        var odds= $('#relativeIndexTab thead th[data-field="odds"]').find("div.th-inner");
                        odds=util.table_info(odds,"odds");
                        odds.html("胜率 "+info_w);
                        var corr= $('#relativeIndexTab thead th[data-field="corr"]').find("div.th-inner");
                        corr=util.table_info(corr,"corr");
                        corr.html("相关系数 "+info_w);
                        var info_a= $('#relativeIndexTab thead th[data-field="info_a"]').find("div.th-inner");
                        info_a=util.table_info(info_a,"info_a");
                        info_a.html("年化信息比 "+info_w);
                        var jensen_a= $('#relativeIndexTab thead th[data-field="jensen_a"]').find("div.th-inner");
                        jensen_a=util.table_info(jensen_a,"jensen_a")
                        jensen_a.html("年化詹森指数 "+info_w)
                        var tr_a= $('#relativeIndexTab thead th[data-field="tr_a"]').find("div.th-inner");
                        tr_a=util.table_info(tr_a,"tr_a")
                        tr_a.html("年化特雷诺比率 "+info_w)
                    }
					initTable2(dom, {
						'data' : ts.data,
						'columns' : ts.table_head,
                        'onPostBody':onPostBody
					});
					dom.bootstrapTable('load', {
						'data' : ts.data,
						'columns' : ts.table_head,
                        'onPostBody':onPostBody
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
					field : 'sharpe_a',
					title : resp.columns.sharp_a,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return val + "<br>（" + row.sharpe_a_rank + "）"
					}
				},
				{
					field : 'max_drawdown',
					title : resp.columns.max_retracement,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return util.fmtRatio(val,2) + "<br>（" + row.max_retracement_rank + "）"
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
					field : 'index',
					title : resp.columns.index,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				// {
				// 	field : 'pe',
				// 	title : resp.columns.pe,
				// 	sortable : false,
				// 	align : 'center',
				// 	valign : 'middle',
				// 	formatter : function(val) {
				// 		return util.fmtRatio(val);
				// 	}
				// }
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
                    valign : 'middle',
					formatter : function(val) {
						if(util.explain(val)){
							return '<span data-toggle="popover" data-trigger="hover"  data-content="'+util.explain(val)+'">'+val+info_b+'</span>';
						}else{
							return val
						}
					}
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
					field : 'corr',
					title : resp.columns.corr,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4)
					}
				},
				{
					field : 'info_a',
					title : resp.columns.info_a,
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
					field : 'index',
					title : resp.columns.index,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.onPostBody
		});
	}
	
	//收益指标定制饼图
	function initIncomeGrid(dom, resp) {
		var name = resp.columns;
		var data = resp.data;
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
            exporting : {
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
				name : name.index,
				colors : [ '#44ACC3', '#D3D6D9' ],
				center : [ "25%" ],
				data : data.index
			}, {
				type : 'pie',
				innerSize : '80%',
				name : name.fund,
				colors : [ '#FF82A0', '#D3D6D9' ],
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

	/**
	 * 加载净值图表数据
	 */
	function loadNavChart() {
		params = $.extend({}, {
			'fund_id' : $('#fundId').val(),
			'user_id' : useUserId
		},
			{
				'start_date' : dateStart1
			},
			{
				'end_date' : dateEnd1
			},
			{
				'default_range' : default_range
			},
            {
                'indicator':hb_indicator
            });

		var chart1 = new Highcharts.Chart('netCharts', {
			"title" : {
				"text" : ''
			},
			credits : {
				enabled : false
			},
		});
		chart1.showLoading("数据加载中...");

		$.ajax({
            url:apiPath2 + coin_mian_url,
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if(resp.success){
                    $('#yield_date_start').val(dateStart1 == null ? resp.records.start_end.start_date : dateStart1);
                    $('#yield_date_end').val(dateEnd1 == null ? resp.records.start_end.end_date : dateEnd1);
                    $('#yield_date_start').datetimepicker('setStartDate', resp.records.start_end.start_date);
                    $('#yield_date_start').datetimepicker('setEndDate', resp.records.start_end.end_date);
                    $('#yield_date_end').datetimepicker('setStartDate', resp.records.start_end.start_date);
                    $('#yield_date_end').datetimepicker('setEndDate', resp.records.start_end.end_date);
                    fund_name=resp.records.fund_name;
                    initNavChart(resp);
                    var datas = [];
                    if (hb_indicator) {
                        for (var i = 0; i < resp.records.statistic_date.length; i++) {
                            datas.unshift({
                                static_date: resp.records.date_range[i],
                                return_10k: resp.records.return_10k[i],
                                d7_return_a: resp.records.d7_return_a[i]
                            });
                        }
                        initNavTable2($('#nav-main-grid'), datas);
                        $('#nav-main-grid').bootstrapTable('load', datas);
                    } else {
                        for (var i = 0; i < resp.records.statistic_date.length; i++) {
                            datas.unshift({
                                static_date: resp.records.statistic_date[i],
                                nav: resp.records.nav[i],
                                added_nav: resp.records.added_nav[i],
                                swanav: resp.records.swanav[i]
                            });
                        }
                        initNavTable($('#nav-main-grid'), datas);
                        $('#nav-main-grid').bootstrapTable('load', datas);
                        chart1.hideLoading();
                    }
                }else{
                    if (hb_indicator) {
                        $("#netCharts").html("<p class='tip' style='position:relative;top: 50%;text-align: center;'>暂无数据</p>")
                    }else{
                        showAll();
					}
				}
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

		if(hb_indicator=="return_10k"){
            var series = [{name:fund_name,data:[]}];
            for(var i = 0;i<datas.records.return_10k.length;i++){
                series[0].data.push({
                    y:datas.records.return_10k[i]
                })
            }
		}else if(hb_indicator=="d7_return_a"){
            var series = [{name:fund_name,data:[]}];
            for(var i = 0;i<datas.records.d7_return_a.length;i++){
                series[0].data.push({
                    y:datas.records.d7_return_a[i]
                })
            }
        }else{
            var series = [
            	{name:fund_name,data:[]},{name:"沪深300",data:datas.records.hs300},
				{name:"上证50",data:datas.records.sse50,visible:false},
                {name:"中证500",data:datas.records.csi500,visible:false},
                {name:"中债指数",data:datas.records.cbi,visible:false},
                {name:"南华商品指数",data:datas.records.nfi,visible:false},
            ];
            for(var i = 0;i<datas.records.added_nav.length;i++){
                series[0].data.push({
                    y:datas.records.return_rate[i],
                    nav:datas.records.nav_rate[i],
                    added_nav:datas.records.added_nav_rate[i],
                    swanav:datas.records.swanav[i]
                })
            }
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
				// tickInterval : 10,
                tickmarkPlacement:"on",
				categories : datas.records.statistic_date,
				// labels : {
				// 	step : 100,
				// 	rotation : -45,
				// }
			},
			yAxis : {
				labels : {
					formatter : function() {
                        if(hb_indicator=="return_10k"){
                            return util.fmtFixed(this.value,4);
						}else{
                            return util.fmtRatio(this.value,2);
						}
					},
				},
				gridLineWidth : 1,
				title : {
					text : ' '
				}
			},
			tooltip : {
				shared : true,
				formatter : function() {
					var points = this.points;
					var pointsLength = points.length;
					var y_value_kwh = '';
					var point_name="累计收益率: ";
					for (var i = 0; i < points.length; i++) {
						if(hb_indicator=="return_10k"){ //万份收益
                            point_name="万份收益: ";
                            if(i==0){
                                y_value_kwh +=  '日期: ' + points[i].point.category +'<br>' + points[i].series.name + point_name +
                                    util.fmtFixed(points[i].point.y,4) ;
                            }else{
                                y_value_kwh += '<br>' + points[i].series.name + point_name +
                                    util.fmtFixed(points[i].point.y,4) ;
                            }
						} else if(hb_indicator=="d7_return_a"){ //7日年化
                            point_name="7日年化: ";
                            if(i==0){
                                y_value_kwh +=  '日期: ' + points[i].point.category +'<br>' + points[i].series.name + point_name +
                                    util.fmtRatio(points[i].point.y) ;
                            }else{
                                y_value_kwh += '<br>' + points[i].series.name + point_name +
                                    util.fmtRatio(points[i].point.y) ;
                            }
                        } else{ //累计收益
                            point_name="累计收益率: ";
                        	if (i == 0) {
                                y_value_kwh += '日期: ' + points[i].point.category + '<br>单位净值: ' + util.fmtFixed(points[i].point.nav, 4) + '<b><br>  累计净值: ' + util.fmtFixed(points[i].point.added_nav, 4) +
                                    '<b><br>复权累计净值: ' + util.fmtFixed(points[i].point.swanav, 4) + '<b><br>累计收益率: ' + Highcharts.numberFormat((points[i].point.y * 100), 2, '.') + '%';
                            } else {
                                if(i==0){
                                    y_value_kwh +=  '日期: ' + points[i].point.category +'<br>' + points[i].series.name + point_name +
                                        util.fmtRatio(points[i].point.y) ;
                                }else{
                                    y_value_kwh += '<br>' + points[i].series.name + point_name +
                                        util.fmtRatio(points[i].point.y) ;
                                }
                            }
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
					},
                    turboThreshold:10000
				}
			},
			series : series,
			exporting: {
                enabled : false
			}
		});

	}

	/*
	 * hcharts 净值表格
	 */
	function initNavTable(dom, datas) {
		dom.bootstrapTable({
			// showExport : true,
			// exportDataType : "all", //basic', 'all', 'selected'.
			sidePagination : 'client',
			// exportTypes : [ 'csv', 'excel' ], //支持导出类型: 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'.
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

			],
		});
	}
    function initNavTable2(dom, datas) {
        dom.bootstrapTable({
            // showExport : true,
            // exportDataType : "all", //basic', 'all', 'selected'.
            sidePagination : 'client',
            // exportTypes : [ 'csv', 'excel' ], //支持导出类型: 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf'.
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
                },
                {
                    field : 'return_10k',
                    title : '万份收益',
                    sortable : false,
                    width : 100,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtFixed(val, 4);
                    }
                },
                {
                    field : 'd7_return_a',
                    title : '7日年化',
                    sortable : false,
                    width : 100,
                    align : 'center',
                    valign : 'middle',
                    formatter : function(val) {
                        return util.fmtRatio(val, 2);
                    }
                }
                //{field:'return_nav',title:'累计收益率',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},

            ],
        });
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
				move(historyBg, this.offsetLeft);
			};
			historyLi[i].onmouseout = function() {
				move(historyBg, Distance);
			};
			historyLi[i].onclick = function() {
				Distance = this.offsetLeft;
			};
		}
	}
    function initAction2() {
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
        var historyUl = document.getElementById('incomeUl2');
        var historyLi = historyUl.getElementsByTagName('li');
        var historyBg = historyLi[historyLi.length - 1];
        var Distance = historyUl.children[0].offsetLeft;
        var current = 0;
        for (var i = 0; i < historyLi.length - 1; i++) {
            historyLi[i].onmouseover = function() {
                move(historyBg, this.offsetLeft);
            };
            historyLi[i].onmouseout = function() {
                move(historyBg, Distance);
            };
            historyLi[i].onclick = function() {
                Distance = this.offsetLeft;
            };
        }
    }

	//输出区域
	exports.init = _init;
});