/**
 * 投顾-业绩指标.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	var util = require('util');
	require('bootstrap_table_zh');
	// require("highcharts")
   require("highstock")
	// require("highcharts_zh_CN");
	// require("highchartmap");
	// 变量区域
	var riskSlc1 = "return_a";
	var riskSlc2 = "stdev_a";
	var dateSlc = "total"
	var select1 = "return";
	var select2 = "stdev_a";
	var org_id = $('#orgId').val();
	// 初始化区域
	function _init(){
	    initConfig();
        initEvent();	
        revenueRisktbl();
        operationalCapacity();
        revenueRiskchart();
        superPower(select1,1);
        superPower(select2,2);
        researchCapacity();
    }
	
	//初始化配置
	function initConfig(){
        $("[data-toggle='popover']").popover();
	}
	
	//初始化事件
	function initEvent(){
		$('#riskSlc1').on("change",function(){
			riskSlc1 = $("#riskSlc1 option:selected").attr("id");
			revenueRiskchart();
		});
		$('#riskSlc2').on("change",function(){
			riskSlc2 = $("#riskSlc2 option:selected").attr("id");
			revenueRiskchart();
		});
		$('#profitabilitySlc').on('change',function(){
			select1 = $("#profitabilitySlc option:selected").data("id");
			superPower(select1,1);
            //指标说明
            var title=$("#profitabilitySlc option:selected").text();
            var value=select1;
            $("#incomeScharts .pop").html(title+' <img src="'+ctxResources+'/images/info_b.png" class="infoImg" style="width: 16px;height:16px;">');
            $("#incomeScharts .pop").attr("data-content",util.explain(value))

        });
		$('#windcontrolSlc').on('change',function(){
			select2 = $("#windcontrolSlc option:selected").data("id");
			superPower(select2,2);
            //指标说明
            var title=$("#windcontrolSlc option:selected").text();
            var value=select2;
            $("#incomeScharts2 .pop").html(title+' <img src="'+ctxResources+'/images/info_b.png" class="infoImg" style="width: 16px;height:16px;">');
            $("#incomeScharts2 .pop").attr("data-content",util.explain(value))
		})
		$('#dateSlc').on('change',function(){
			dateSlc = $("#dateSlc option:selected").attr("data-id");
			revenueRiskchart();
			revenueRisktbl();
		})
	}
	//收益风险比表
	function revenueRisktbl(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
				"freq_length":dateSlc,
		}
		$.ajax({
			url:apiPath+'/api/v1/org/funds/static/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					initTab1($("#revenueRisktbl"),resp.fund_static);
					$("#revenueRisktbl").bootstrapTable('load',resp.fund_static);
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}
	//收益风险比图
	function revenueRiskchart(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
				"indicators":{'v':riskSlc1,'h':riskSlc2},
				"freq_length":dateSlc
		}
		$.ajax({
			url:apiPath+'/api/v1/org/income_risk_ratio/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					if(resp.fund_static.length>0){
						initScatterchart2($("#revenueRiskcharts"),resp);
					}else{
						$("#revenueRiskcharts").html("产品信息披露不足，无法显示！")
					}
					
				}
			},
			error:function(resp){
				var r = eval('(' + resp.responseJSON + ')');
				layer.msg(r.error_log);
			}
		})
	}
	//运营能力
	function operationalCapacity(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
		}
		$.ajax({
			url:apiPath+'/api/v1/org/routine/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					$('#yearsYield').text(util.betgAgainst(resp.org_routine.year_return,"percent",4));
					$("#establishedYears").text(util.betgAgainst(resp.org_routine.years,"number",1));
					$("#registeredCapital").text(util.betgAgainst(resp.org_routine.reg_capital));
					$("#Qualifications").text(util.betgAgainst(resp.org_routine.is_qualified));
					$("#numberOfstrategy").text(util.betgAgainst(resp.org_routine.strategy_num));
					$("#numberOfreleases").text(util.betgAgainst(resp.org_routine.fund_per_year,"number","1"));
					$("#EstablishedYield").text(util.betgAgainst(resp.org_routine.total_return,"percent",4));
					$("#assetRange").text(util.betgAgainst(resp.org_routine.asset_scale_range));
					$("#capitalRatio").text(util.betgAgainst(resp.org_routine.real_capital_proportion));
					$("#isVIP").text(util.betgAgainst(resp.org_routine.is_member));
					//$("#numberOfrecords").text(resp.org_routine.reg_num);//备案基金数量
					$("#numberOfemployees").text(util.betgAgainst(resp.org_routine.employeescale));
					$("#consultantsRange").text(util.betgAgainst(resp.org_routine.am_scale_range_consultant));
				}else{
					$('#yearsYield').text("--");
					$("#establishedYears").text("--");
					$("#registeredCapital").text("--");
					$("#Qualifications").text("--");
					$("#numberOfstrategy").text("--");
					$("#numberOfreleases").text("--");
					$("#EstablishedYield").text("--");
					$("#assetRange").text("--");
					$("#capitalRatio").text("--");
					$("#isVIP").text("--");
					$("#numberOfemployees").text("--");
					$("#consultantsRange").text("--");
				}
			},
			error:function(resp){
				layer.msg(resp.error_log);
			}
		})
	}
	//盈利能力  风控能力
	function superPower(value,type){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
				"indicator":value,
		}
		$.ajax({
			url:apiPath+'/api/v1/org/indicators/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
					if(type==2){
                        $('#risk_static_date').text("（  统计日期："+resp.static_date+" )");
						initTab2($('#windcontrolTbl'),resp.indicator);
						$('#windcontrolTbl').bootstrapTable('load',resp.indicator);
						initchart($('#windcontrolCharts'),resp.graphic,{
							chart_type:'column',
							reservations:"percent",
							legend:{
								enabled:true,
							},
						});
					}else{
                        $('#return_static_date').text("（  统计日期："+resp.static_date+" )");
						initTab2($('#profitabilityTbl'),resp.indicator);
						initchart($('#profitabilityChart'),resp.graphic,{
							chart_type:'column',
							reservations:"percent",
							legend:{
								enabled:true,
							},
						});
						$('#profitabilityTbl').bootstrapTable('load',resp.indicator);
					}
				}else{
					$('#profitabilityTbl').html("产品信息披露不足，无法显示！");
					$('#profitabilityChart').html("产品信息披露不足，无法显示！");
					$('#windcontrolTbl').html("产品信息披露不足，无法显示！");
					$('#windcontrolCharts').html("产品信息披露不足，无法显示！");
				}
			},
			error:function(resp){
				layer.msg(resp.error_log);
			}
		})
	}
	//投研能力表
	function researchCapacity(){
		var params = {
				"user_id":useUserId,
				"org_id":org_id,
		}
		$.ajax({
			url:apiPath+'/api/v1/org/research/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.succeed){
                    $('#investment_static_date').text("（  统计日期："+resp.static_date+" )");
					initTab3($("#investmentTbl"),resp.indicator);
					initchart($('#investmentCharts'),resp.graphic,{
						chart_type:'column',
						reservations:"percent",
						legend:{
							enabled:true,
						},
					});
				}else{
					$("#investmentTbl").html("产品信息披露不足，无法显示！");
					$('#investmentCharts').html("产品信息披露不足，无法显示！");
				}
			},
			error:function(resp){
				layer.msg(resp.error_log);
			}
		})
	}
	//初始化表格1
	function initTab1(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
			pagination:true,
    		pageNumber:1,
    		pageSize:10,
    		pageList:[10,20,50],search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
			columns:[
					{field:'fund_name',title:resp.columns.fund_name,width:300,sortable:false,align: 'left',valign: 'middle',formatter:function(val,row){
						return "<a class='jumpLabel' data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/ProductPerspective/detail/" + row.row_name +"' >"+ val +"</a>"
					}},
					{field:'fund_type',title:resp.columns.fund_type,width:200,sortable:false,align: 'center',valign: 'middle',},
					{field:'foundation_date',title:resp.columns.foundation_date,width:200,sortable:false,align: 'center',valign: 'middle',},
					{field:'fund_status',title:resp.columns.fund_status,width:200,sortable:false,align: 'center',valign: 'middle',},
					{field:'statistic_date',title:resp.columns.statistic_date,width:200,sortable:false,align: 'center',valign: 'middle',},
					{field:'return_a',title:resp.columns.return_a,width:200,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'max_retracement',title:resp.columns.max_retracement,width:200,sortable:true,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
		    ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.SecondLevel
		});
	}
	//初始化表格2
	function initTab2(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
			pagination:false,
			search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
			columns:[
					{field:'row_name',title:resp.columns.row_name,sortable:false,align: 'left',valign: 'middle'},
					{field:org_id,title:resp.columns[org_id],sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'FI01',title:resp.columns.FI01,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'HS300',title:resp.columns.HS300,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
		    ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.SecondLevel
		});
	}
	//初始化表格3
	function initTab3(dom,resp){
		dom.bootstrapTable({
			striped:true,sidePagination:'client',cache:false,
		    data: resp.data,
			pagination:false,
			search:false,undefinedText:'--',
    		singleSelect:false,striped:true,clickToSelect:true,
			columns:[
					{field:'row_name',title:resp.columns.row_name,sortable:false,align: 'left',valign: 'middle'},
					{field:'s_time',title:resp.columns.s_time,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'s_security',title:resp.columns.s_security,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'persistence',title:resp.columns.persistence,sortable:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
					{field:'odds',title:resp.columns.odds,odds:false,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
		    ],
		    onClickRow:resp.onClickRow,
		    onPostBody:resp.SecondLevel
		});
	}

	//初始化散点
	function initScatterchart(dom,resp){
		dom.highcharts({
		        chart: {
		            type: 'scatter',
		            zoomType: 'xy'
		        },
		        colors:['#f8354f','#FFA1CC','#7bbdf5' ,'#1f8aee','#2FB9A1','#FAE091','#FEABA4','#9C27B0','#EF6C00','#90A4AE'],
		        title: {
		            text: ' '
		        },
		        subtitle: {
		            text: ' '
		        },
		        xAxis: {
		            title: {
		                enabled: true,
		                text: ' '
		            },
		            startOnTick: true,
		            endOnTick: true,
		            showLastLabel: true,
		            labels: {
		                formatter: function () {
		                    return util.fmtRatio(this.value);
		                },
		                enabled: true //轴可见
		            }
		        },
		        yAxis: {
		            title: {
		                text: ' '
		            },
		            labels: {
		                formatter: function () {
		                    return util.fmtRatio(this.value);
		                },
		                enabled: true //轴可见
		            }
		        },
		        credits: {
		            enabled: false	//不显示highcharts链接
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            floating: false,
		            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		        },
		        plotOptions: {
		            scatter: {
		                marker: {
		                    radius: 5,
		                    states: {
		                        hover: {
		                            enabled: true,
		                            lineColor: 'rgb(100,100,100)'
		                        }
		                    }
		                },
		                states: {
		                    hover: {
		                        marker: {
		                            enabled: false
		                        }
		                    }
		                },
		                tooltip: {
		                    headerFormat: '<b>{series.name}</b><br>',
		                    pointFormatter:function(){
		                    return this.n+"<br>日期:"+this.d+"<br>"+resp.columns.x+":"+util.fmtRatio(this.x)+"<br>"+resp.columns.y+":"+util.fmtRatio(this.y)
		                    }
		                    //pointFormat: '{point.n}<br>日期: {point.d}<br>'+resp.columns.x+': {point.x}<br>'+resp.columns.y+': {point.y}'
		                }
		            }
		        },
		        series:resp.fund_static
		});
	}
    //初始化散点 highstock
    function initScatterchart2(dom,resp){
        dom.highcharts({
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            colors:['#f8354f','#FFA1CC','#7bbdf5' ,'#1f8aee','#2FB9A1','#FAE091','#FEABA4','#9C27B0','#EF6C00','#90A4AE'],
            title: {
                text: ' '
            },
            subtitle: {
                text: ' '
            },
            rangeSelector : {
                enabled : false
            },
            scrollbar : {
                enabled : true
            },

            xAxis: {
                title: {
                    enabled: true,
                    text: ' '
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true,
                labels: {
                    formatter: function () {
                        return util.fmtRatio(this.value);
                    },
                    enabled: true //轴可见
                }
            },
            yAxis: {
                title: {
                    text: ' '
                },
                labels: {
                    formatter: function () {
                        return util.fmtRatio(this.value);
                    },
                    enabled: true //轴可见
                }
            },
            credits: {
                enabled: false	//不显示highcharts链接
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                floating: false,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormatter:function(){
                            return this.n+"<br>日期:"+this.d+"<br>"+resp.columns.x+":"+util.fmtRatio(this.x)+"<br>"+resp.columns.y+":"+util.fmtRatio(this.y)
                        }
                        //pointFormat: '{point.n}<br>日期: {point.d}<br>'+resp.columns.x+': {point.x}<br>'+resp.columns.y+': {point.y}'
                    }
                }
            },
            series:resp.fund_static
        });
    }
	   
	//输出区域
	exports.init = _init;
});