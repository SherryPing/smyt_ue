/**
 * 行业数据.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('bootstrap_table_zh');
	require('chosen');
	require('header');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('move');
	require("highcharts_zh_CN");
	require("chartCollection");
	require("highchartmap");
	var $ = require('jquery');
	var util = require('util');
	var selectState = false;
	var Yield_startDate = null;
	var Yield_endDate = null;
	var ccfreq = "y1"
	var cc_startdate1 = null;
	var cc_enddate1 = null;
	var RelatedPe_index = "FI01";
	var indexId = [ "FI01", "FI03" ];
	var Benchmark = [ "hs300" ];
	var Correlationbenchmark = [ "hs300", "csi500", "sse50", "cbi", "nfi" ];
	var highcharts = require('highcharts');
	var markeYear = null;
	var marketLabels = "num_org";
	var heatmapdata = null;
	var prcYear = null
	var strategy = null;
	var sharpMonth = null;
	// 初始化区域
	$(function() {
		init();
	});

	function init() {
		initConfig();
		initAction();

	}
	function initConfig() {
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
		//全市场标签选择。
		var assetUl = document.getElementById('assetUl');
		var assetLi = assetUl.getElementsByTagName('li');
		var assetyBg = assetLi[assetLi.length - 1];
		var current = assetLi[0].offsetLeft; // 用于存放点击时候的 offsetLeft
		for (var i = 0; i < assetLi.length; i++) {
			assetLi[i].onmouseover = function() {
				target = this.offsetLeft; // 把左侧的位置给target
				move(assetyBg,target)
			}
			assetLi[i].onmouseout = function() {
				target = current; // 鼠标离开，target是刚才我们点击的位置
				move(assetyBg,target);
			}
			assetLi[i].onclick = function() {
				current = this.offsetLeft; //点击的时候把当前位置存贮一下
			}
		}
		//月份选择
		$('.dateInp').datetimepicker({
			language : "zh-CN",
			format : "yyyy-mm",
			autoclose : true,
			todayBtn : true,
			startView : "year",
			minView : "year",
			maxView : "decade"
		});
		$("#assetUl li").on('click', function() {
			var index = $(this).index();
			switch (index) {
			case 0:
				marketLabels = "num_org";
				allmarkyear();
				allmarkmonth();
				$('#title1').text("历年私募基金管理人数量");
				$('#title2').text("年私募基金管理人数量");
				break;
			case 1:
				marketLabels = "num_fund";
				allmarkyear();
				allmarkmonth();
				$('#title1').text("历年私募基金产品数量");
				$('#title2').text("年私募基金产品数量");
				break;
			case 2:
				marketLabels = "paid_scale";
				allmarkyear();
				allmarkmonth();
				$('#title1').text("历年私募基金管理规模");
				$('#title2').text("年私募基金管理规模");
				break;
			}
		});
		//日期选择
		$('.form_date').datetimepicker({
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
		//表格进行条件筛选
		$('#maindetermineBtn').click(function() {
			Benchmark = [];
			indexId = [];
			for (var i = 0; i < $("#industrymainTbl tr:first-child .checkboxBtn").length; i++) {
				var activBtn = $("#industrymainTbl tr:first-child .checkboxBtn");
				if ($(activBtn[i]).hasClass("checkboxActive")) {
					Benchmark.push($(activBtn[i]).attr("id"));
				}
			}
			for (var i = 0; i < $("#industrymainTbl tr:eq(1) .checkboxBtn").length; i++) {
				var activBtn = $("#industrymainTbl tr:eq(1) .checkboxBtn");
				if ($(activBtn[i]).hasClass("checkboxActive")) {
					indexId.push($(activBtn[i]).attr("id"));
				}
			}
			CumulativeofReturn();
		});
		$('.checkboxBtn').click(function() {
			$(this).parents('tr').find('.openEnded').removeClass('endActiv');
			$(this).toggleClass('checkboxActive');
		});
		$('#mainemptyBtn').click(function() {
			for (var i = 0; i < $("#industrymainTbl .checkboxBtn").length; i++) {
				var btn = $("#industrymainTbl .checkboxBtn");
				$(btn[i]).removeClass("checkboxActive");
			}
		});
		$("#labUl li").click(function() {
			var tab = $('.industryDatatab');
			var div = $('.industryDatadiv');
			for (var i = 0; i < tab.length; i++) {
				$(tab[i]).removeClass('Active');
				$(div[i]).fadeOut(50);
			}
			$(this).addClass('Active');
			$(div[$(this).index()]).fadeIn(500);
		});
		$('.Yield_date1').on('change', function() {
			if ($(this).attr('name') == 'date_start') {
				Yield_startDate = returndate($(this).val());
				console.log(Yield_startDate)
				$('.Yield_date1:even').val($(this).val());
				$('.Yield_date1:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				Yield_endDate = returndate($(this).val());
				$('.Yield_date1:odd').val($(this).val());
				$('.Yield_date1:even').datetimepicker('setEndDate', $(this).val());
			}
			CumulativeofReturn();
		});
		//指数相关性，表格，频率选择
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
			correlationttbl();
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
			correlationttbl();
		});
		$('#select1').on('change', function() {
			selectState = true
			markeYear = $(this).val();
			$('#years').text($(this).val());
			allmarkmonth();
		})
		$('#select3').on('change', function() {
			selectState = true
			prcYear = $(this).val();
			allmarkProduct2();
		})
		$('#select4').on('change', function() {
			selectState = true
			strategy = $(this).val();
			allmarkProduct3();
		})
		$('#select5').on('change', function() {
			selectState = true
			sharpMonth = $(this).val();
			allmarkProduct4();
		});
		//策略指数
		$('#attentionIndex').on('change', function() {
			RelatedPe_index = $('#attentionIndex option:selected').attr('id');
			var btn = $("#heatMapdiv button[name='benchmark']");
			for (var i = 0; i < btn.length; i++) {
				if ($(btn[i]).attr('data-id') == RelatedPe_index) {
					$(btn[i]).removeClass("checkboxActive");
					removeByValue(Correlationbenchmark, RelatedPe_index);
				}
			}
			correlationchart();
			correlationttbl();
		});
		$("#heatMapdiv button[name='benchmark']").on('click', function() {
			Correlationbenchmark = [];
			var btn = $("#heatMapdiv button[name='benchmark']");
			var count = 0;
			for (var i = 0; i < btn.length; i++) {
				if ($(btn[i]).hasClass('checkboxActive')) {
					Correlationbenchmark.push($(btn[i]).attr("data-id"));
					count += 1;
				}
			}
			if ($(this).attr("data-id") == $('#attentionIndex option:selected').attr('id')) {
				layer.msg("您已在关注指数上选中该指数了。");
				$(this).removeClass("checkboxActive");
			} else if (count < 1) {
				layer.msg('指标至少选1个');
				$(this).addClass("checkboxActive");
			} else if (count > 6) {
				layer.msg('指标最多只能选择6个');
				$(this).removeClass("checkboxActive");
			} else {
				correlationchart();
				correlationttbl();
			}
		});
	}
	function initAction() {
		CumulativeofReturn();
		allmarkyear();
		allmarkmonth();
		correlationchart();
		correlationttbl();
		allmarkProduct1();
		allmarkProduct2();
		allmarkProduct3();
		allmarkProduct4();
	}
	function initperson() {
	}
	function initallmark() {
	}
	function CumulativeofReturn() {
		var params = {
			"index_id" : indexId,
			benchmark : Benchmark,
			date_range : {
				min : Yield_startDate,
				max : Yield_endDate,
			},
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/pe_index/return_series/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#yieldChart'), resp.graphic, {
						'reservations' : 'percent',
						'color' : [ "#0066FF", "#FF9900", "#CC3300", "#FFCC33", "#9900CC", "#996666" ],
						'chart_type' : 'line',
						'radius' : 2,
						legend : {
							enabled : true,
							layout : "horizontal",
							align : "center",
							"verticalAlign" : "bottom"
						}
					});
					var allData = Benchmark.concat(indexId);
					var columns = [ {
						field : 'row_name',
						title : resp.table.columns.row_name,
						sortable : false,
						align : 'center',
						valign : 'middle'
					} ]
					for (var i = 0; i < allData.length; i++) {
						columns.push({
							field : allData[i],
							title : resp.table.columns[allData[i]],
							sortable : false,
							align : 'center',
							valign : 'middle',
							formatter : function(val) {
								return util.fmtRatio(val)
							}
						});
					}
					initVarietytbl($('#yieldTbl'), {
						data : resp.table.data,
						columns : columns
					});
					$('#yieldTbl').bootstrapTable("refreshOptions", {
						data : resp.table.data,
						columns : columns
					});
					$('.Yield_date1:even').val(resp.date_range.min.substr(0, 7));
					$('.Yield_date1:odd').val(resp.date_range.max.substr(0, 7));
					Yield_startDate = resp.date_range.min;
					Yield_endDate = resp.date_range.max;
					$('.Yield_date1:even').datetimepicker('setStartDate', resp.interval.min);
					$('.Yield_date1:even').datetimepicker('setEndDate', resp.interval.max);
					$('.Yield_date1:odd').datetimepicker('setStartDate', resp.interval.min);
					$('.Yield_date1:odd').datetimepicker('setEndDate', resp.interval.max);
				}
			}
		})
	}
	function correlationchart() {
		var params = {
			index_id : RelatedPe_index,
			benchmark : Correlationbenchmark,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/pe_index/dynamic_coefficient/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					heatmap(resp);
				}
			}
		})
	}
	function correlationttbl() {
		var params = {
			index_id : RelatedPe_index,
			benchmark : Correlationbenchmark,
			freq : ccfreq,
			date_range : {
				"min" : cc_startdate1,
				"max" : cc_enddate1
			},
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/pe_index/correlation_coefficient/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					// relatedtbl(resp.corr_data);
					$('#Frequency .form_date:even').val(resp.date_range.min);
					$('#Frequency .form_date:odd').val(resp.date_range.max);
					$('#Frequency .form_date').datetimepicker('setStartDate', resp.interval.min).datetimepicker('setEndDate', resp.interval.max);
                    //热力图
                    var series=[];
                    for(var i =0;i<resp.corr_data.series.length;i++) {
                        var dataLabels ;
                        for(var j =0;j<resp.corr_data.series[i].data.length;j++){
                            var dataTemp=[];
                            var temp={};
                            temp.x=i;
                            temp.y=j;
                            if(resp.corr_data.series[i].data[j]=="-"){
                                resp.corr_data.series[i].data[j]=0;
                            }
                            if(i==j){
                                resp.corr_data.series[i].data[j]=1;
                            }
                            temp.value=util.fmtFixed(resp.corr_data.series[i].data[j],2);
                            dataTemp.push(temp);
                            var name=resp.corr_data.categories[i]+"与"+resp.corr_data.categories[j]+"相关性系数：";
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
                    var categories=resp.corr_data.categories;

                    initHeatMap($('#correlationTbldiv'),{categories:categories,series:series});
				}
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
	function allmarkyear() {
		var params = {
			specify : marketLabels,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/pe_index/market_info/yearly/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#allmarkYear'), resp.year_info, {
						'reservations' : 'fixed2',
						'chart_type' : 'column',
						legend : {
							enabled : true
						}
					});
				}
			}
		})
	}
	function allmarkmonth() {
		var params = {
			specify : marketLabels,
			year : markeYear,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/pe_index/market_info/monthly/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#allmarkMonth'), resp.month_info, {
						'reservations' : 'fixed2',
						'chart_type' : 'column',
						legend : {
							enabled : true
						}
					});
					if (selectState == false) {
						var options = "";
						for (var i = 0; i < resp.years.length; i++) {
							options += "<option>" + resp.years[i] + "</option>"
						}
						$('#select1').html(options);
					}
				}
			}
		})
	}

	function allmarkProduct1() {
		$.ajax({
			url : apiPath + '/api/v1/pe_index/market_return/yearly/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify({
				'user_id' : useUserId
			}),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#allmarkProduct1'), resp.marke_year_return, {
						'reservations' : 'percent',
						'chart_type' : 'column',
						legend : {}
					});
				}
			}
		})
	}
	function allmarkProduct2() {
		var params = {
			year : prcYear,
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/pe_index/market_return/monthly/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#allmarkProduct2'), resp.market_month_return, {
						'reservations' : 'percent',
						'chart_type' : 'column',
						legend : {}
					});
					if (selectState == false) {
						var options = "";
						for (var i = 0; i < resp.years.length; i++) {
							options += "<option>" + resp.years[i] + "</option>"
						}
						$('#select3').html(options);
					}
				}
			}
		})
	}
	function allmarkProduct3() {
		var params = {
			month : strategy,
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/pe_index/pe_return/monthly/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#allmarkProduct3'), resp.market_month_return, {
						'reservations' : 'percent',
						'chart_type' : 'column',
						legend : {}
					});
					if (selectState == false) {
						var options = "";
						for (var i = 0; i < resp.months.length; i++) {
							options += "<option>" + resp.months[i] + "</option>"
						}
						$('#select4').html(options);
					}
				}
			}
		})
	}
	function allmarkProduct4() {
		var params = {
			month : sharpMonth,
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/pe_index/pe_sharp/monthly/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#allmarkProduct4'), resp.market_month_return, {
						'reservations' : 'fixed2',
						'chart_type' : 'column',
						legend : {}
					});
					if (selectState == false) {
						var options = "";
						for (var i = 0; i < resp.months.length; i++) {
							options += "<option>" + resp.months[i] + "</option>"
						}
						$('#select5').html(options);
					}
				}
			}
		})
	}
	//热力图
	function heatmap(resp) {
		var xcategories = resp.coeff_data.categories;
		var ycategories = [];
		for (var i = 0; i < resp.coeff_data.series.length; i++) {
			ycategories.push(resp.coeff_data.series[i].name);
		}
		var data = [];
		for (var i = 0; i < resp.coeff_data.series.length; i++) {
			for (var j = 0; j < resp.coeff_data.series[i].data.length; j++) {
				data.push([ j, i, util.fmtFixed(parseFloat(resp.coeff_data.series[i].data[j]), 2) * 1 ]);
			}
		}

		$('#correlationchart').highcharts({
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
				title : null,
				labels : {
					style : {
						color : '#676a6c', //颜色
						fontSize : '13px' //字体
					}
				}
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
					return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br><b>' +$('#attentionIndex  option:selected').val()+"与"+
		                this.series.yAxis.categories[this.point.y] + '的相关性系数为：</b><br><b>' + this.point.value + '</b>';
		            
				}
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
            exporting : {
                enabled : false //不显示highcharts链接
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
	//相关系数表格
	function relatedtbl(resp) {
		$('#titleDiv2').html("");
		$('#left_titlediv2').html("");
		$('#correlationTbl').html("");
		var data = smalldotChart(resp);
		$('#left_titlediv2').html(data.left_title);
		$('#correlationTblhead').html(data.title);
		$('#correlationTblbody').html(data.tbl);
		$('[data-toggle="tooltip"]').tooltip();
	}

	//初始化表格
	function initVarietytbl(dom, resp) {
		dom.bootstrapTable({
			striped : true,
			sidePagination : 'client',
			cache : false,
			data : resp.data,
			pagination : true,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30 ],
			search : false,
			undefinedText : '--',
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			columns : resp.columns
		});
	}
	function returndate(date) {
		if (date == "")
			return "";
		var months = date.substr(5, 2);
		if (months == "02") {
			if (date.substr(0, 4) % 4 == 0)
				return date + "-29";
			return date + "-28";
		} else if (months == "04" || months == "06" || months == "09" || months == "11") {
			return date + "-30";
		} else {
			return date + "-31";
		}
	}
	function removeByValue(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				arr.splice(i, 1);
				break;
			}
		}
	}
});