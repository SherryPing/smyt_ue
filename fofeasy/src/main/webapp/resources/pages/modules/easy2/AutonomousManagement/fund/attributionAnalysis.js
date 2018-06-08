/**
 * 自主管理归因分析.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	require('move');
	var $ = require('jquery');
	var util = require('util');
	require('bootstrap_datetimepicker');
	// require("highcharts_zh_CN");
	require('bootstrap_table_zh');
	require('slider');
	require('xlsx');
	// 变量区域
	var wb; //读取完成的数据
	var rABS = false; //是否将文件读取为二进制字符串
	var excelData = {};
	var excel_range = {};
	var tableloadState = false;
	var fundId;
	//用户筛选变量
	var attributionMode; //归因方式  single：单期       multi：多期
	var assetBMK; //账户基准
	var stockBMK; //股票基准
	var benchmark = {
		'hs300' : '沪深300',
		'csi500' : '中证500',
		'cbi' : '中债指数',
		'sse50' : '上证50',
		'nfi' : '南华商品指数'
	}
	var dateStart; //统计范围开始  格式：yyMMdd
	var dateEnd; //统计范围结束
	var statisticFrequency; //统计频率  日：d     周：w      月：m     季：q
	var assetGrid;

	var aPeriod_num = 1;
	var sPeriod_num = 1;
	var stockIndustry = null;
	// 初始化区域
	function _init() {
		initAction();
		initTabs();
		initConfig();
		selCustomdatums();
		initAccount();
	}

	//初始参数
	function initConfig() {
		fundId = $('#fundId').val();
		attributionMode = $("[name='assetAttributionmode']:checked").val();
		dateStart = null //util.fmtYyyMd($('.cdata:even:eq(0)').val());
		dateEnd = null //util.fmtYyyMd($('.cdata:odd:eq(0)').val());
		assetBMK = $('[name = "atBenchmarkRdo"]:checked').val(); //'2E059429F2F67CD6338CED758C3233DB';//
		statisticFrequency = $("[name='statisticFrequency']:checked").val();


	}
	//初始化
	function initTabs() {
		$('#turnoverRate .transferHead button').click(function() {
			var statu = $(this).hasClass('dataslcActive');
			var button = $('#turnoverRate .transferHead button');
			if (statu == 1) {
				$(this).removeClass('dataslcActive')
			} else {
				for (var i = 0; i < button.length; i++) {
					$(button[i]).removeClass('dataslcActive');
				}
				$(this).addClass('dataslcActive');
			}
		});
		$('#assetUl li').on('click', function() {
			var Div = $('.assetAllocationDiv');
			for (var i = 0; i < Div.length; i++) {
				$(Div[i]).fadeOut();
			}
			$(Div[$(this).index()]).fadeIn();
		});


		//标签切换
		$("#assetUl li").on('click',function() {
			 number = $(this).index();
					switch (number) {
					case 0:
						initAccount();
						break;
					case 1:
						initStock();
						break;
					case 2:
						initFuturesAssets();
						break;
					case 3:
						initBondAssets();
						break;
					}
		});
		//确定按钮
		$(".performanceAlsbtn").each(function(i) {
			$(this).on('click', function() {
				switch (i) {
				case 0:
					aPeriod_num = 1;
					initAccount();
					$('#assetUl li:eq(0)').data('type', false);
					break;
				case 1:
					sPeriod_num = 1;
					initStock();
					$('#assetUl li:eq(1)').data('type', false);
					break;
				}
				$('#assetReferenceBenchmarkYields .th-inner:eq(2)').text(benchmark[assetBMK]);
				var morePeriod = $('.morePeriod').is(':checked');
				if (morePeriod == 1) {
					$('.attributionTypeSpn').text('多期归因');
				} else {
					$('.attributionTypeSpn').text('单期归因');
				}
			});
		});
        //归因方式
        $("[name='assetAttributionmode'],[name='stockAttributionmode']").on('change', function() {
            attributionMode = $(this).val();
            $("[value='" + attributionMode + "']").prop('checked', 'false');
            showHiddenAssetTab();
            if (attributionMode == "single") {
                $(".statisticFrequencys").addClass("hidden");
                $(".incomeTab").fadeOut();
                
            } else {
                $(".statisticFrequencys").removeClass("hidden");
                $(".incomeTab").fadeIn();
                
            }
        });
		/*//基准选择
		$("[name='atBenchmarkRdo']").on('change',function(){
			assetBMK = $(this).val();
		});*/
		//统计区间
		$(".cdata").on("change", function() {
			$('#assetUl li:lt(2)').data('type', true);
			if ($(this).attr('name') == 'date_start') {
				dateStart = util.fmtYyyMd($(this).val());
				$('.cdata:even').val($(this).val());
				$('.cdata:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				dateEnd = util.fmtYyyMd($(this).val());
				$('.cdata:odd').val($(this).val());
				$('.cdata:even').datetimepicker('setEndDate', $(this).val());
			}
		});
		//统计频率
		$(".statisticFrequencys [type='radio']").on('change', function() {

			$('#assetUl li:lt(2)').data('type', true);
			statisticFrequency = $(this).val();
			$('[value=' + statisticFrequency + ']').prop('checked', 'false');

		});
		//切换股票周期
		$('#profile div:lt(2)').on('click', function() {
			$('#profile div:lt(2)').index($(this)) == 0 ? sPeriod_num-- : sPeriod_num++;
		//					stockReferenceBenchmarkYields();
		});
		$('#stand_alone').on('click', function() {
			$('.incomeTab').fadeOut();
			$('#particulars').fadeIn();
			$('#summarizing').fadeOut();
		});
		$('#multi_phase').on('click', function() {
			$('.incomeTab').fadeIn();
		});
		//多期行业选择
		$(".Industry").on('change', function() {
			stockIndustry = $(this).val();
			stockSWSPeriodAttribution();
		});
		//汇总明细选择
		$('.incomeTab li').on('click', function() {
			var id = $(this).parents('.assetAllocationDiv').attr("id");
			var div = $('#'+id+' .earningDiv');
			var tab = $('#'+id+' .incomeTab li');
			$(tab).removeClass("active");
			$(div[$(this).index()]).fadeIn();
			$(this).addClass('active');
            showHiddenAssetTab();
		});
		//日期控件渲染
		$('.cdata').datetimepicker({
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
		benchmarkcustomization();

	}


	//归因动作
	function attributionFcn(event) {
		attributionMode = event.data[0].filter(':checked');
		$("[value='" + attributionMode + "']").attr("checked", "checked");
		if (attributionMode == "single") {
			$(".statisticFrequencys").addClass("hidden");
		} else {
			$(".statisticFrequencys").removeClass("hidden");
		}
	}

	function showHiddenAssetTab() {
        if(attributionMode=='multi'&&$(".incomeTab:eq(0) .active").text()=="汇总"){
            $(".assetTab").addClass("hidden");
            $(".assetTab:eq(1)").removeClass("hidden");
		}else {
            $(".assetTab").addClass("hidden");
            $(".assetTab:eq(0)").removeClass("hidden");
		}
    }

	/**
	 * 资产账户
	 */
	function initAccount() {
		aPeriod_num = 1;
		assetScheckParams();
	}
	//检查参数
	function assetScheckParams() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'frequency' : statisticFrequency,
			'period' : attributionMode,
			'user_id' : useUserId,
			'benchmark' : assetBMK
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/check_params/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				if (rdata.succeed) {
					$('.cdata:even').datetimepicker('setStartDate', rdata.interval.min).val(dateFmt(rdata.date_range.min, '-'));
					$('.cdata:odd').datetimepicker('setEndDate', rdata.interval.max).val(dateFmt(rdata.date_range.max, '-'));
					$('.cdata:even').datetimepicker('setEndDate', rdata.interval.max);
					$('.cdata:odd').datetimepicker('setStartDate', rdata.interval.min);
					dateStart = util.fmtYyyMd($('.cdata:even').val());
					dateEnd = util.fmtYyyMd($('.cdata:odd').val());
					assetReferenceBenchmarkYields();
                    assetReferenceBenchmarkYields2();
					assetEarningsAndAttribution();
					assetPositionControl();
					assetSinglePeriodAttribution();
				} else {
					layer.msg(rdata.info_code);
				}
			}
		})
	}


	//资产账户-参考基准收益率
	function assetReferenceBenchmarkYields() {
		initAssetTab($("#assetReferenceBenchmarkYields"), '');
		assetGrid.bootstrapTable('refresh',{url:apiPath + '/api/v1/self_management/attribution/account/analysis/'});
		tableloadState = true;
	//				var params = {
	//						'fund_id':fundId,
	//						'classify':'type',//s_sws
	//						'date_range':{'min':dateStart,'max':dateEnd},
	//						'benchmark':assetBMK,
	//						'frequency':statisticFrequency,
	//						'period':attributionMode,
	//						'period_num':aPeriod_num
	//						};
	//				$.ajax({
	//					url:apiPath+'/api/v1/self_management/attribution/account/analysis/',
	//					type:'post',
	//					contentType:"application/json;charset=utf-8",
	//					data:JSON.stringify(params),
	//					success:function(resp){
	//						 var rdata = eval('(' + resp + ')').data;
	//						inittab($("#assetReferenceBenchmarkYields"),rdata);
	//						$("#assetReferenceBenchmarkYields").bootstrapTable('load',rdata);
	//					}
	//				})
	}
    //生成基准 汇总
    function assetReferenceBenchmarkYields2() {
        var params = {
            'fund_id' : fundId,
            "benchmark" : assetBMK,
            'date_range' : {
                'min' : dateStart,
                'max' : dateEnd
            },
            'frequency' : statisticFrequency,
			'user_id':useUserId
        };
        $.ajax({
            url : apiPath + '/api/v1/self_management/attribution/account/summary/',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                inittab1($('#assetReferenceBenchmarkYields2'), resp.summary);
                $('#assetReferenceBenchmarkYields2').bootstrapTable('load',resp.summary);
            },
            error : function(resp) {
                // var r = eval('(' + resp.responseJSON + ')');
                var r = resp.responseJSON;
            }
        })
    }



	//资产账户-超额收益&归因分析&归因贡献比较
	function assetEarningsAndAttribution() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'benchmark' : assetBMK, //{"hs300", "csi500", "sse50", "nfi"}
			'period' : attributionMode, //'single','multi'
			'frequency' : statisticFrequency, //'d',statisticFrequency,'m','s'
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/account/return/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				// var rdata = eval('(' + resp + ')');
				var rdata = resp;
				//超额收益&归因分析 - 组合Tab
				var tData = [ [ $('#fund_name').text() + '收益' ], [ '同期' + benchmark[assetBMK] + '收益' ], [ '产品超额收益' ], [ '资产配置' ], [ '证券选择' ], [ '交互作用' ] ];
				$.each(rdata.attribution.concat(rdata.returns), function(i, n) {
					switch (n[0]) {
					case 'return':
						tData[0][1] = n[1];
						break;
					case 'bm_return':
						tData[1][1] = n[1];
						break;
					case 'ex_return':
						tData[2][1] = n[1];
						break;
					case 'allocation':
						tData[3][1] = n[1];
						break;
					case 'selection':
						tData[4][1] = n[1];
						break;
					case 'interaction':
						tData[5][1] = n[1];
						break;
					}
				});
				var aaa = $("#assetExcessEarningsTab tr").slice(2, 5)
				var dom = aaa.add($("#assetAttributionAnalysisTab tr").slice(2, 5));
				for (var i = 0; i < dom.length; i++) {
					dom.eq(i).find('td:eq(0)').text(tData[i][0]);
					dom.eq(i).find('td:eq(1)').text((tData[i][1] * 100).toFixed(2) + '%');
				}
				//归因贡献比较
				initColumn1($("#assetAttributionComparison"), {
					'name' : '归因分析',
					'series' : tData.slice(3)
				});
			}
		})
	}

	//资产账户-仓位控制
	function assetPositionControl() {
		var params = {
			'fund_id' : fundId,
			'user_id' : useUserId,
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'benchmark' : assetBMK //{"hs300", "csi500", "sse50", "nfi"}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/account/position_control/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $('#assetPositionControl');
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				initSplineAndArae(dom, {
					'date' : rdata.date,
					'series' : [ '仓位', rdata.position, benchmark[assetBMK] + '累计收益率', rdata.benchmark_price ]
				});

			}
		})
	}
	//资产账户-单期归因
	function assetSinglePeriodAttribution() {
		var params = {
			'fund_id' : fundId,
			//'classify':'sws',
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'benchmark' : assetBMK, //{"hs300", "csi500", "sse50", "nfi"}
			'frequency' : statisticFrequency,
			'period' : attributionMode,
			'user_id' : useUserId
		};

		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/account/contribution/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $("#assetSinglePeriodAttribution");
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				var series = [ {
					'name' : '超额收益率',
					'type' : 'column',
					data : rdata.data.ex_return
				}, {
					'name' : '贡献度',
					'type' : 'column',
					data : rdata.data.contribution
				} ];
				var xCategories = rdata.data.names;
				initMixedGraphs(dom, {
					'series' : series,
					'xCategories' : xCategories
				});
			}
		})

	}




	//操作基准
	function operatingBenchmarks(req) {
		var params = {
			'customize_name' : req.name,
			'customize_id' : guid(),
			'component' : req.data,
			'action' : req.action,
			'user_id' : useUserId,
			'date_range' : {
				'min' : util.fmtYyyMd($('#customization input[name="date_start"]').val()),
				'max' : util.fmtYyyMd($('#customization input[name="date_end"]').val())
			},
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/custom_benchmark/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				if (rdata.succeed) {
					var series = [];
					for (var i = 0; i < rdata.data_dict.data_list.length; ++i) {
						var serie = rdata.data_dict.data_list[i];
						var datas = [];
						for (var j = 0; j < serie.data.length; ++j) {
							var data = {
								y : serie.data[j] / serie.data[0],
								y0 : serie.data[j]
							};
							datas.push(data);
						}
						serie['data'] = datas;
						series.push(serie);
						$('#sureBtn').removeAttr("disabled"); //启用
					}
				} else {
					layer.msg(rdata.status);
				}

				initSpline($("#benchmarkGrid"), {
					'series' : series,
					'date' : rdata.data_dict.dates
				});

			}
		})
	}
	//拟合
	function fittingBenchmarks() {
		$('#sliderTab [type="number"]').each(function() {
			if ($(this).val() == '') {
			} else {
				var name = $(this).attr('name');
				var tName = $(this).parents("td").find(".stoBtnactiv").attr("data-id");
				if (tName != undefined) { //是否存在外部导入数据  !excelData.hasOwnProperty(name)
					excelData[name] = {}
					excelData[name] = {
						"name" : tName,
						'weight' : $(this).val() / 100
					}
				} else {
					excelData[name] = $.extend(excelData[name], {
						'weight' : $(this).val() / 100
					});
				}
			}
		});
		var n = $('#conindexName').val();
		operatingBenchmarks({
			'name' : n,
			'data' : excelData,
			'action' : 'insert'
		});
	}

	//查询自定义
	function selCustomdatums() {
		$.ajax({
			url : apiPath + '/api/v1/self_management/custom_benchmark/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify({
				'action' : 'query',
				'user_id' : useUserId
			}),
			success : function(resp) {
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				$('#assetbenchmarkrdos .newRdo').remove();
				var radioStr = '';
				$.each(rdata.data, function(i, n) {
					benchmark[n.index_id] = n.index_name;
					radioStr += "<div class='selectDiv newRdo'>"
						+ "<input type='radio' id = " + n.index_id + "  name='atBenchmarkRdo' value='" + n.index_id + "'>"
						+ "<label for='" + n.index_id + "'>" + n.index_name + "</label>"
						+ "</div>"
				});
				$("#assetbenchmarkrdos input:last").parent().after(radioStr);
				$('#assetbenchmarkrdos .newRdo').on('dblclick', function() {
					var name = $(this).text();
					var dom = $(this);
					layer.confirm('确认删除  ' + name + '？', {
						btn : [ '删除', '取消' ] //按钮
					}, function(index) {
						delByName({
							'user_id' : useUserId,
							'customize_name' : name,
							'delete_duplicate' : true
						});
						dom.remove();
						layer.msg('删除成功！');
						layer.close(index);
					}, function() {});

				});
				//基准选择
				$("[name='atBenchmarkRdo']").on('change', function() {
					assetBMK = $(this).val();
				});
			}
		})
	}
	/**
	 * 股票资产
	 */
	function initStock() {
		sPeriod_num = 1;
		check_params();
	}
	//检查参数
	function check_params() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'frequency' : statisticFrequency,
			'period' : attributionMode,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/check_params/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				if (rdata.succeed) {
					init_default_sws_Benchmark();
				} else {
					layer.msg(rdata.info_code);
				}
			}
		})
	}


    //生成基准 明细
    function init_default_sws_Benchmark() {
        var params = {
            'fund_id' : fundId,
            'date_range' : {
                'min' : dateStart,
                'max' : dateEnd
            },
            'frequency' : statisticFrequency,
            'period' : attributionMode,'user_id':useUserId
        };
        $.ajax({
            url : apiPath + '/api/v1/self_management/custom_benchmark/default_sws/',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                stockBMK = resp.benchmark_id;
                stockReferenceBenchmarkYields();
                stockEarningsAndAttribution();
                stockPositionControl();
                stockSinglePeriodAttribution();
                init_default_sws_Benchmark2();
                if (attributionMode == 'multi') {
                    $('#stockSWSPeriodAttributionDiv').removeClass('hidden');
                    stockSWSPeriodAttribution();

                } else {
                    $('#stockSWSPeriodAttributionDiv').addClass("hidden");
                }
            },
            error : function(resp) {
                var r = resp.responseJSON;
                layer.msg(r.error_log);
            }
        })
    }
    //生成基准 汇总
    function init_default_sws_Benchmark2() {
        var params = {
            'fund_id' : fundId,
            "benchmark" : stockBMK,
            'date_range' : {
                'min' : dateStart,
                'max' : dateEnd
            },
            'frequency' : statisticFrequency,'user_id':useUserId
        };
        $.ajax({
            url : apiPath + '/api/v1/self_management/attribution/security/summary/',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                inittab($('#stockReferenceBenchmarkYields2'), resp.summary);
                $('#stockReferenceBenchmarkYields2').bootstrapTable('load',resp.summary);
                
            },
            error : function(resp) {
                var r = resp.responseJSON;
            }
        })
    }
    //股票资产-参考基准收益率
    function stockReferenceBenchmarkYields() {
        $("#stockReferenceBenchmarkYields").bootstrapTable('refresh');
        inittab($("#stockReferenceBenchmarkYields"), '');
        //			$("#stockReferenceBenchmarkYields").bootstrapTable('load');
        //			mainGrid.bootstrapTable('refresh',{url:ctx+'/product/find'});

        //			var params = {
        //					'fund_id':fundId,
        //					'date_range':{'min':dateStart,'max':dateEnd},
        //					'benchmark':stockBMK,//{"hs300", "csi500", "sse50", "nfi"}
        //					'frequency':statisticFrequency,
        //					'period':attributionMode,//'single',
        //					'period_num':sPeriod_num
        //					};
        //			$.ajax({
        //				url:apiPath+'/api/v1/attribution/security/analysis/',
        //				type:'post',
        //				contentType:"application/json;charset=utf-8",
        //				data:JSON.stringify(params),
        //				success:function(resp){
        //					var rdata = eval('(' + resp + ')');
        //					$("#phaseFrequency").text(rdata.dates.min+"--"+rdata.dates.max);
        //					//渲染或更新表格
        //
        //					inittab($("#stockReferenceBenchmarkYields"),rdata.data);
        //					$("#stockReferenceBenchmarkYields").bootstrapTable('load',rdata.data);
        //				}
        //			})
    }
	//股票资产-超额收益&归因分析&归因贡献比较
	function stockEarningsAndAttribution() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'benchmark' : stockBMK, //{"hs300", "csi500", "sse50", "nfi"}
			'period' : attributionMode, //'single','multi'
			'frequency' : statisticFrequency, //'d',statisticFrequency,'m','s'
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/security/return/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				//超额收益&归因分析 - 组合Tab
				var tData = [ [ $('#fund_name').text() + '收益' ], [ '同期申万一级行业收益' ], [ '产品超额收益' ], [ '行业配置' ], [ '个股选择' ], [ '交互作用' ] ];
				$.each(rdata.attribution.concat(rdata.returns), function(i, n) {
					switch (n[0]) {
					case 'return':
						tData[0][1] = n[1];
						break;
					case 'bm_return':
						tData[1][1] = n[1];
						break;
					case 'ex_return':
						tData[2][1] = n[1];
						break;
					case 'allocation':
						tData[3][1] = n[1];
						break;
					case 'selection':
						tData[4][1] = n[1];
						break;
					case 'interaction':
						tData[5][1] = n[1];
						break;
					}
				});
				var aaa = $("#stockExcessEarningsTab tr").slice(2, 5)
				var dom = aaa.add($("#stockAttributionAnalysisTab tr").slice(2, 5));
				for (var i = 0; i < dom.length; i++) {
					dom.eq(i).find('td:eq(0)').text(tData[i][0]);
					dom.eq(i).find('td:eq(1)').text((tData[i][1] * 100).toFixed(2) + '%');
				}
				//归因贡献比较
				initColumn1($("#stockAttributionComparison"), {
					'name' : '归因分析',
					'series' : tData.slice(3)
				});
			}
		})
	}

	//股票资产-仓位控制
	function stockPositionControl() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'benchmark' : stockBMK, //{"hs300", "csi500", "sse50", "nfi"}
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/security/position_control/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $('#stockPositionControl');
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				initSplineAndArae(dom, {
					'date' : rdata.date,
					'series' : [ '仓位', rdata.position, '申万行业基准累计收益率', rdata.benchmark_price ]
				});
			}
		})
	}

	//股票资产-单期归因
	function stockSinglePeriodAttribution() {
		var params = {
			'fund_id' : fundId,
			//'classify':'sws',
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'benchmark' : stockBMK, //{"hs300", "csi500", "sse50", "nfi"}
			'frequency' : statisticFrequency,
			'period' : attributionMode,
			'user_id' : useUserId
		};

		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/security/contribution/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $("#stockSinglePeriodAttribution");
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				var series = [ {
					'name' : '超额收益率',
					'type' : 'column',
					data : rdata.data.ex_return
				}, {
					'name' : '贡献度',
					'type' : 'spline',
					data : rdata.data.contribution
				} ];
				var xCategories = rdata.data.names;
				initMixedGraphs(dom, {
					'series' : series,
					'xCategories' : xCategories
				});
			}
		})

	}
	//股票资产-多期归因-行业
	function stockSWSPeriodAttribution() {
		var params = {
			'fund_id' : fundId,
			//'classify':'sws',
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'benchmark' : stockBMK,
			'frequency' : statisticFrequency,
			'period' : attributionMode,
			'sws_class' : stockIndustry, //"110000",null
			'user_id' : useUserId
		};

		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/security/contribution/sws/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $("#stockSWSPeriodAttribution");
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;
				var opStr = '';
				$(".Industry").html("");
				$.each(rdata.sws_list, function(i, n) {
					opStr += "<option value=" + n.sws_class + ">" + n.sws_name + "</option>"
				});name
				$(".Industry").append(opStr).val(rdata.sws_name);

				var series = [ {
					'name' : '超额收益率',
					'type' : 'column',
					data : rdata.data.ex_return
				}, {
					'name' : '贡献度',
					'type' : 'spline',
					data : rdata.data.contribution
				} ];
				var xCategories = rdata.data.names;
				initMixedGraphs(dom, {
					'series' : series,
					'xCategories' : xCategories
				});
			}
		})
	}

	//初始化基准化自定义动作
	function benchmarkcustomization() {
		//显示自定义基准
		$("#assetCust").on('click', function() {
			$("#assetAcount").addClass("hidden");
			$("#customization").removeClass("hidden");
		})
		$('#myTabs li:eq(0)').click(function() {
			$("#customization").addClass("hidden");
			$("#assetAcount").removeClass("hidden");
		});
		$('#myTabs li:eq(1)').click(function() {
			$("#customization").addClass("hidden");
			$("#profile").removeClass("hidden");
		});
		//自定义基准名称检测
		$('#conindexName').on('blur', function() {
			var name = $(this).val();
			$.ajax({
				url : apiPath + '/api/v1/custom_benchmark/check_benchmark_name/',
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify({
					'user_id' : useUserId,
					'customize_name' : name,
					'delete_duplicate' : false
				}),
				success : function(resp) {
					// var rdata = eval('(' + resp + ')');
                    var rdata = resp;
					if (!rdata.succeed) {
						layer.confirm('名称重复,是否覆盖？', {
							btn : [ '覆盖', '取消' ] //按钮
						}, function(index) {
							delByName({
								'user_id' : useUserId,
								'customize_name' : name,
								'delete_duplicate' : true
							});
							layer.close(index);
						}, function() {});
					}
				}
			})

		});
		//导入excel
		$('#sliderTab input[type="file"]').on('change', function() {
			importf($(this)[0]);
		});
		//预览
		$("#previewBtn").on('click', function() {
			delByName({
				'user_id' : useUserId,
				'customize_name' : $('#conindexName').val(),
				'delete_duplicate' : true
			});
			insertBMK();
		});
		//确定按钮
		$("#sureBtn").on('click', function() {
			selCustomdatums();
			$('#prcBasic').fadeIn(50);
			$('#customization').fadeOut(50);
			layer.msg('添加成功！');
		});
		//返回按钮
		$('#customBack').click(function() {
			delByName({
				'user_id' : useUserId,
				'customize_name' : $('#conindexName').val(),
				'delete_duplicate' : true
			});
			$('#prcBasic').fadeIn(50);
			$('#customization').fadeOut(50);
			layer.msg('操作已取消！');
			selCustomdatums();


		});
		//初始化滑块
		for (var i = 1; i < $('.control-group').length + 1; i++) {
			new SlideBar({
				actionBlock : 'action-block' + i,
				actionBar : 'action-bar' + i,
				slideBar : 'scroll-bar' + i,
				barLength : 250,
				maxNumber : 100,
				showArea : 'showArea' + i
			});
		}
		//自定义DIV显示
		$('#customBtn').click(function() {
			$('#prcBasic').fadeOut(50);
			$('#customization').fadeIn(50);
			$('#sureBtn').attr('disabled', 'disabled'); //禁用
		});
		//股票选择
		$('.stockSlcbtn').click(function() {
			var State = $(this).hasClass('stoBtnactiv');
			if (State == 1) {
				$(this).removeClass('stoBtnactiv');
				$(this).parents("td").find('[type="number"]').val(''); //清空值
				$(this).parents("td").find('.action-bar').css('width', '0px'); //滑块
				$(this).parents("td").find('.action-block').css('left', '0px'); //条
				$(this).parents("td").find('.main').css('pointer-events', 'none');
			} else {
				var stock = $(this).parent().find('button');
				for (var i = 0; i < stock.length; i++) {
					$(stock[i]).removeClass('stoBtnactiv');
				}
				$(this).addClass('stoBtnactiv');
				$(this).siblings('label').removeClass('stoBtnactiv');
				$(this).parents("td").find('.main').css('pointer-events', 'auto');
			}
		});

	}
	//添加操作
	function insertBMK() {
		var prcName = $('#conindexName').val();
		var weightValue = [];
		var valSum = 0;
		$('#customization .sliderInp').each(function() {
			if ($(this).val() != '' && $(this).val() != 0) {
				weightValue.push({
					'dom' : $(this),
					'val' : $(this).val()
				});
				valSum += ($(this).val() * 1);
			}
		});
		if (prcName.length == 0) {
			layer.msg('综合指数名称不能为空，请输入名称');
		} else if (detectionInterval()) {
			return
		} else if (valSum != 100) {
			layer.confirm('指数成分不为1，是否归一', {
				btn : [ '确定', '取消' ] //按钮
			}, function(index) {
				var Sum = 0;
				$.each(weightValue, function(i, n) { //归一操作
					if (i == (weightValue.length - 1)) {
						weightValue[i]['val'] = 100 - Sum;
					} else {
						weightValue[i]['val'] = (weightValue[i]['val'] * 100 / valSum).toFixed(0);
						Sum += (weightValue[i]['val'] * 1);
					}
					weightValue[i]['dom'].val(weightValue[i]['val']);

				});
				fittingBenchmarks();
				layer.close(index);
			}, function() {});
		} else {
			fittingBenchmarks();
		/*for(var i=0;i<3;i++){
			if(percent[i].value!=0){
				var state=$(percent[i]).parents('td').find('button').hasClass('stoBtnactiv');
				if(state==0){
					layer.msg('请选择指标');
				}
				else{
					fittingBenchmarks();
					break;
				}
			};
		}*/
		}
	}
	function detectionInterval() {
		$.each(excel_range, function(i, n) {
			if (!(n.min < $('#yield_date_start').val() && n.max > $('#yield_date_end').val())) {
				layer.msg('导入样本不足，无法计算！');
				return true;
			}
		})
		return false;
	}

	/**
	 * 期货资产
	 */
	function initFuturesAssets() {
		futuresOverallAttribution();
		futuresInterestContract();
		futuresLossContract();
	}
	//期货总体归因
	function futuresOverallAttribution() {
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/future/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify({
				'fund_id' : fundId,
				'date_range' : null,
				'user_id' : useUserId
			}),
			success : function(resp) {
				if (resp.succeed) {
					//表
					initFuturesTab1($('#futuresOverallAttributionTab'), resp.contribution);
					//图
					initFuturesGrid($('#futuresOverallAttributionGrid'), resp['I/L']);
				} else {
					//layer.msg(resp.error_info);
					console.log(resp.error_info);
				}
			}
		})
	}

	//利益合约
	function futuresInterestContract() {
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/future/variety/income/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify({
				'fund_id' : fundId,
				'date_range' : null,
				'user_id' : useUserId
			}),
			success : function(resp) {
				if (resp.succeed) {
					//表
					initFuturesTab2($('#futuresInterestContractTab'), resp.variety_detail);
					//图
					var gData = resp.contribution_data;
					$.each(gData.series, function(i, n) {
						if (n.name.indexOf('持仓') != -1) //持仓占比设置为线图
							gData.series[i].type = 'spline';
					});
					initFuturesGrid($('#futuresInterestContractGrid'), gData);
				} else {
					//layer.msg(resp.error_info);
					console.log(resp.error_info);
				}
			}
		})
	}

	//亏损合约
	function futuresLossContract() {
		$.ajax({
			url : apiPath + '/api/v1/self_management/attribution/future/variety/loss/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify({
				'fund_id' : fundId,
				'date_range' : null,
				'user_id' : useUserId
			}),
			success : function(resp) {
				if (resp.succeed) {
					//表
					initFuturesTab2($('#futuresLossContractTab'), resp.variety_detail);
					//图
					var gData = resp.contribution_data;
					$.each(gData.series, function(i, n) {
						if (n.name.indexOf('持仓') != -1) //持仓占比设置为线图
							gData.series[i].type = 'spline';
					});
					initFuturesGrid($('#futuresLossContractGrid'), gData);
				} else {
					console.log(resp.error_info);
					//layer.msg(resp.error_info);
				}
			}
		})
	}





















	/**
	 * 债券资产
	 */
	function initBondAssets() {
	}




	//按名称删除
	function delByName(params) {
		$.ajax({
			url : apiPath + '/api/v1/self_management/custom_benchmark/check_benchmark_name/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				// var rdata = eval('(' + resp + ')');
                var rdata = resp;

			}
		})

	}
	//生成guid
	function guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	/**
		     * 查询条件
		     */
	function queryParamsAsset(params, data) {
		solidParams = {
			fund_id : fundId,
			classify : 'type',
			date_range : {
				'min' : dateStart,
				'max' : dateEnd
			},
			benchmark : assetBMK,
			frequency : statisticFrequency,
			period : attributionMode, //'single',
			period_num : params.pageNumber, //sPeriod_num//
			user_id : useUserId
		};
		return JSON.stringify(solidParams);
	}

	function queryParamsStock(params, data) {
		solidParams = {
			fund_id : fundId,
			date_range : {
				'min' : dateStart,
				'max' : dateEnd
			},
			benchmark : stockBMK,
			frequency : statisticFrequency,
			period : attributionMode, //'single',
			period_num : params.pageNumber, //sPeriod_num//
			user_id : useUserId
		};
		return JSON.stringify(solidParams);
	}

	/**
	 * 获取返回的数据的时候做相应处理，让bootstrap table认识我们的返回格式
	 * @param {Object} res
	 */
	function responseHandler(res) {
		// var rdata = eval('(' + res + ')');
        var rdata = res;
		if (rdata.total_period) {
			//		    		$("#phaseFrequency").text(rdata.dates.min+"--"+rdata.dates.max);
			$("#phaseFrequency").text("第 " + rdata.period_num + "/" + rdata.total_period + " 期   ( " + rdata.dates.min + "--" + rdata.dates.max + ' )');
			$("#assetFrequency").text("第 " + rdata.period_num + "/" + rdata.total_period + " 期   ( " + rdata.dates.min + "--" + rdata.dates.max + ' )');
		} else {
			$("#phaseFrequency").text(rdata.dates.min + "--" + rdata.dates.max);
			$("#assetFrequency").text(rdata.dates.min + "--" + rdata.dates.max);
		}

		total_period = rdata.total_period ? rdata.total_period : 1;

		return {
			"rows" : rdata.data,
			"total" : rdata.data.length * total_period
		}
	}

	//大类资产归因 -- 初始化表格
	function initAssetTab(dom, resp) {
		assetGrid = dom.bootstrapTable({
			sidePagination : 'server',
			cache : false,
			method : 'post',
			url : apiPath + '/api/v1/self_management/attribution/account/analysis/',
			contentType : 'application/json;charset=utf-8',
			queryParams : queryParamsAsset,
			striped : true,
			undefinedText : '--',
			singleSelect : false,
			clickToSelect : true,
			pagination : true,
			pageSize : 5,
			pageNumber : 1,
			responseHandler : responseHandler,
			formatLoadingMessage : 
				function() {
				if(tableloadState==false){
					return "正在加载中...";
				}else{
					return "未找到匹配记录";
				}
				
			},
			formatNoMatches : function() {
				if(tableloadState==false){
					return "正在加载中...";
				}else{
					return "未找到匹配记录";
				}
			},
			formatRecordsPerPage : function(pageNumber) {
				return '';
			},
			formatShowingRows : function(pageFrom, pageTo, totalRows) {
				return ''
			},
			paginationPreText : '上一期',
			paginationNextText : '下一期',
			columns : [
				[
					{
						title : '资产类别',
						field : 'name',
						rowspan : 2,
						align : 'center',
						valign : 'middle'
					},
					{
						title : $('#fund_name').text(),
						colspan : 2,
						align : 'center'
					},
					{
						title : benchmark[assetBMK],
						colspan : 2,
						align : 'center'
					},
					{
						title : '超额收益分解',
						colspan : 3,
						align : 'center'
					},
					{
						title : '超额收益率',
						field : 'ex_return',
						rowspan : 2,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {

							if (val * 1 > 0)
								return '<span style="color:red;">' + util.fmtRatio(val) + '</span>';
							else if (val * 1 < 0)
								return '<span style="color:green;">' + util.fmtRatio(val) + '</span>';
							else
								return util.fmtRatio(val)

						}
					}
				],
				[
					{
						field : 'weight',
						title : '权重',
						sortable : false,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtRatio(val);
						}
					},
					{
						field : 'return',
						title : '收益率',
						sortable : false,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtRatio(val);
						}
					},
					{
						field : 'bm_weight',
						title : '权重',
						sortable : false,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtRatio(val);
						}
					},
					{
						field : 'bm_return',
						title : '收益率',
						sortable : false,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtRatio(val);
						}
					},
					{
						field : 'allocation',
						title : '资产配置',
						sortable : false,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtRatio(val);
						}
					},
					{
						field : 'selection',
						title : '证券选择',
						sortable : false,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtRatio(val);
						}
					},
					{
						field : 'interaction',
						title : '交互作用',
						sortable : false,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtRatio(val);
						}
					},
				]
			]
		});
	}

    //股票归因 -- 初始化表格
    function inittab(dom, resp) {
        dom.bootstrapTable({
            sidePagination : 'server',
            cache : false,
            method : 'post',
            url : apiPath + '/api/v1/self_management/attribution/security/analysis/',
            contentType : 'application/json;charset=utf-8',
            queryParams : queryParamsStock,
            striped : true,
            search : false,
            undefinedText : '--',
            singleSelect : false,
            clickToSelect : true,
            pagination : true,
            pageSize : 29,
            pageNumber : 1,
            responseHandler : responseHandler,
            onPageChange:initPagin,
            formatRecordsPerPage : function(pageNumber) {
                return '';
            },
            formatShowingRows : function(pageFrom, pageTo, totalRows) {
                var page_count = pageTo - pageFrom + 1;
                if (totalRows == page_count) {
                    return ''
                } else {
                    return '第 ' + pageTo / page_count + '/' + page_count + ' 期';
                }
                $("#stockReferenceBenchmarkYields2 .pagination-detail").css("position","absolute !important");
                $("#stockReferenceBenchmarkYields2 .pagination-detail").css("top","-50px");
                $("#stockReferenceBenchmarkYields2 .pagination-detail").css("left","20px");
            },
            paginationPreText : '上一期',
            paginationNextText : '下一期',
            columns : [
                [
                    {
                        title : '资产类别',
                        field : 'name',
                        rowspan : 2,
                        align : 'center',
                        valign : 'middle'
                    },
					
                    {
                        title : $('#fund_name').text(),
                        colspan : 2,
                        align : 'center'
                    },
                    {
                        title : '申万一级行业',
                        colspan : 2,
                        align : 'center'
                    },
                    {
                        title : '超额收益分解',
                        colspan : 3,
                        align : 'center'
                    },
                    {
                        title : '超额收益率',
                        field : 'ex_return',
                        rowspan : 2,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            if (val * 1 > 0)
                                return '<span style="color:red;">' + util.fmtRatio(val,3) + '</span>';
                            else if (val * 1 < 0)
                                return '<span style="color:green;">' + util.fmtRatio(val,3) + '</span>';
                            else
                                return util.fmtRatio(val,3)
                        }
                    }
                ],
                [
                    {
                        field : 'weight',
                        title : '权重',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'return',
                        title : '收益率',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'bm_weight',
                        title : '权重',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'bm_return',
                        title : '收益率',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'allocation',
                        title : '行业配置',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'selection',
                        title : '个股选择',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'interaction',
                        title : '交互作用',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                ]
            ]
        });
    }
    function initPagin() {
		$('#stockReferenceBenchmarkYields2').parent().next().next().find("span.pagination-info").css("position","absolute");
        $('#stockReferenceBenchmarkYields2').parent().next().next().find("span.pagination-info").css("top","-50px");
        $('#stockReferenceBenchmarkYields2').parent().next().next().find("span.pagination-info").css("left","20px");
    }
    //资产账户汇总
    function inittab1(dom, resp) {
        dom.bootstrapTable({
            cache : false,
            contentType : 'application/json;charset=utf-8',
            striped : true,
            search : false,
            undefinedText : '--',
            singleSelect : false,
            clickToSelect : true,
            pagination : true,
            pageSize : 29,
            pageNumber : 1,
			data:resp,
            formatRecordsPerPage : function(pageNumber) {
                return '';
            },
            formatShowingRows : function(pageFrom, pageTo, totalRows) {
                var page_count = pageTo - pageFrom + 1;
                if (totalRows == page_count) {
                    return ''
                } else {
                    return '第 ' + pageTo / page_count + '/' + totalRows / page_count + ' 期';
                }
            },
            paginationPreText : '上一期',
            paginationNextText : '下一期',
            columns : [
                [
                    {
                        title : '资产类别',
                        field : 'name',
                        rowspan : 2,
                        align : 'center',
                        valign : 'middle'
                    },
                    {
                        title : $('#fund').text(),
                        colspan : 2,
                        align : 'center'
                    },
                    {
                        title : '申万一级行业',
                        colspan : 2,
                        align : 'center'
                    },
                    {
                        title : '超额收益分解',
                        colspan : 3,
                        align : 'center'
                    },
                    {
                        title : '超额收益率',
                        field : 'ex_return',
                        rowspan : 2,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            if (val * 1 > 0)
                                return '<span style="color:red;">' + util.fmtRatio(val,3) + '</span>';
                            else if (val * 1 < 0)
                                return '<span style="color:green;">' + util.fmtRatio(val,3) + '</span>';
                            else
                                return util.fmtRatio(val,3)
                        }
                    }
                ],
                [
                    {
                        field : 'weight',
                        title : '权重',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'return',
                        title : '收益率',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'bm_weight',
                        title : '权重',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'bm_return',
                        title : '收益率',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'allocation',
                        title : '行业配置',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'selection',
                        title : '个股选择',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'interaction',
                        title : '交互作用',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                ]
            ]
        });
    }
    //股票归因 -- 初始化表格
    function inittab2(dom, resp) {
        dom.bootstrapTable({
            striped : true,
            sidePagination : 'client',
            cache : false,
            data : resp,
            pagination : false,
            search : false,
            undefinedText : '--',
            singleSelect : false,
            striped : true,
            clickToSelect : true,
            columns : [
                [
                    {
                        title : '资产类别',
                        field : 'name',
                        rowspan : 2,
                        align : 'center',
                        valign : 'middle'
                    },
                    {
                        title : $('#fund').text(),
                        colspan : 2,
                        align : 'center'
                    },
                    {
                        title : '基准',
                        colspan : 2,
                        align : 'center'
                    },
                    {
                        title : '超额收益分解',
                        colspan : 3,
                        align : 'center'
                    },
                    {
                        title : '超额收益率',
                        field : 'ex_return',
                        rowspan : 2,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            if (val * 1 > 0)
                                return '<span style="color:red;">' + util.fmtRatio(val,3) + '</span>';
                            else if (val * 1 < 0)
                                return '<span style="color:green;">' + util.fmtRatio(val,3) + '</span>';
                            else
                                return util.fmtRatio(val,3)
                        }
                    }
                ],
                [
                    {
                        field : 'weight',
                        title : '权重',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'return',
                        title : '收益率',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'bm_weight',
                        title : '权重',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'bm_return',
                        title : '收益率',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'allocation',
                        title : '资产配置',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'selection',
                        title : '股票选择',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                    {
                        field : 'interaction',
                        title : '交互作用',
                        sortable : false,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return util.fmtRatio(val,3);
                        }
                    },
                ]
            ]
        });
    }
	//期货资产
	function initFuturesTab1(dom, resp) {
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
			formatLoadingMessage : function() {
				return "未找到匹配记录";
			},
			formatNoMatches : function() {
				return "正在加载中。。。";
			},
			columns : [
				{
					field : 'row_name',
					title : resp.columns.row_name,
					sortable : false,
					align : 'center',
					valign : 'middle'
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
					field : 'net_income',
					title : resp.columns.net_income,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val / 10000, 4);
					}
				},
				{
					field : 'contribution',
					title : resp.columns.contribution,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
			],
		/* onClickRow:resp.onClickRow,
		 onPostBody:resp.onPostBody*/
		});
	}
	function initFuturesTab2(dom, resp) {
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
			formatLoadingMessage : function() {
				return "未找到匹配记录";
			},
			formatNoMatches : function() {
				return "正在加载中。。。";
			},
			columns : [
				{
					field : 'row_name',
					title : resp.columns.row_name,
					sortable : false,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'contract',
					title : resp.columns.contract,
					sortable : false,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'B/S',
					title : resp.columns['B/S'],
					sortable : false,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'contribution',
					title : resp.columns.contribution,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val / 10000, 4);
					}
				},
				{
					field : 'contribution_p',
					title : resp.columns.contribution_p,
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

	//百分比图
	function initFuturesGrid(dom, resp) {
		dom.highcharts({
			chart : {
				type : 'column'
			},
			colors : [ '#2C8CF8', '#EA6987', '#FB88B3', '#D72F54', '#9370DB' ],
			title : {
				text : ''
			},
			xAxis : {
				categories : resp.categories
			},
			yAxis : [ {
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
			}, {
				title : {
					text : ''
				},
				labels : {
					formatter : function() {
						return util.fmtFixed(this.value, 4);
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
				enabled : true
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
					//stacking: 'percent'
				}
			},
			series : resp.series
		});
	}

	//初始化柱状图
	function initColumn1(dom, resp) {
		dom.highcharts({
			chart : {
				type : 'column'
			},
			colors : [ '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea' ],
			title : {
				style : {
					color : '#fff'
				},
				text : '.'
			},
			xAxis : {
				type : 'category',
				labels : {
					style : {
						fontSize : '13px',
						fontFamily : 'Verdana, sansserif'
					}
				}
			},
			yAxis : {
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
				enabled : false
			},
			/*exporting: {
				enabled: false  //设置导出按钮不可用
			},*/
			credits : {
				enabled : false
			},
			plotOptions : {
				series : {
					//borderWidth: 0,
					dataLabels : {
						enabled : true,
						//format: '{point.y:.2f}%'
						formatter : function() {
							return util.fmtRatio(this.y);
						}
					}
				}
			},
			tooltip : {
				pointFormatter : function() {
					return resp.name + ": <b>" + util.fmtRatio(this.y) + "</b>";
				}
			},
			series : [ {
				name : resp.name,
				data : resp.series,
			/*dataLabels: {
				format: '{point.y:.4f}',
			    enabled: true
			}*/
			} ]
		});

	}
	//初始化折线面积图
	function initSplineAndArae(dom, resp) {
		dom.highcharts({
			chart : {
				zoomType : 'xy'
			},
			colors : [ '#81A2C1', '#D30E4C' ],
			title : {
				style : {
					color : '#fff'
				},
				text : '.'
			},
			xAxis : [ {
				categories : resp.date,
				crosshair : true
			} ],
			yAxis : [ { // Primary yAxis
				labels : {
					formatter : function() {
						return (this.value * 100).toFixed(0) + '%';
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				title : {
					text : resp.series[0],
					style : {
						color : Highcharts.getOptions().colors[1]
					}
				}
			}, { // Secondary yAxis
				title : {
					text : resp.series[2],
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				labels : {
					formatter : function() {
						return (this.value * 100).toFixed(0) + '%';
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				opposite : true
			} ],
			tooltip : {
				//pointFormat:'<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.4f}</b><br/>',
				pointFormatter : function() {
					return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + util.fmtRatio(this.y) + '</b><br/>';
				},
				shared : true
			},
			legend : {
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			series : [ {
				name : resp.series[0],
				type : 'area', //spline
				data : resp.series[1],
				tooltip : {
					valueSuffix : ''
				}
			}, {
				name : resp.series[2],
				type : 'spline', //area
				yAxis : 1,
				data : resp.series[3],
				tooltip : {
					valueSuffix : ''
				}
			} ]
		});
	}
	//初始化混合图
	function initMixedGraphs(dom, resp) {
		dom.highcharts({
			chart : {
				zoomType : 'xy'
			},
			colors : [ '#81A2C1', '#D30E4C' ],
			title : {
				style : {
					color : '#fff'
				},
				text : '.'
			},
			xAxis : {
				categories : resp.xCategories,
				crosshair : true
			},
			yAxis : {
				labels : {
					formatter : function() {
						return (this.value * 100).toFixed(0) + '%';
					},
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				title : {
					text : ''
				}
			},
			tooltip : {
				//pointFormat:'<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.4f}</b><br/>',
				pointFormatter : function() {
					return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + util.fmtRatio(this.y) + '</b><br/>';
				},
				shared : true
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			series : resp.series
		});
	}
	//初始化曲线图
	function initSpline(dom, resp) {
		dom.highcharts({
			chart : {
				type : 'spline'
			},
			title : {
				style : {
					color : '#fff'
				},
				text : '.'
			},
			xAxis : [ {
				categories : resp.date
			} ],
			yAxis : { // Primary yAxis
				labels : {
					format : '{value}',
					style : {
						color : Highcharts.getOptions().colors[0]
					}
				},
				title : {
					text : '',
					style : {
						color : Highcharts.getOptions().colors[1]
					}
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
							y_value_kwh += '日期: ' + points[i].point.category + '<br><br>' + points[i].series.name + ': ' + points[i].point.y0.toFixed(3);
						} else {
							y_value_kwh += '<br>' + points[i].series.name + ': ' + points[i].point.y0.toFixed(3);
						}
					}

					return y_value_kwh;
				//return '<b>单位净值:'+this.point.nav+  '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+Highcharts.numberFormat((this.y*100),2,'.')+'%</b>'+' <br/>';
				},
			},
			legend : {
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			series : resp.series
		});
	}

	//解析EXCEL
	function importf(obj) { //导入
		if (!obj.files) {
			return;
		}
		var f = obj.files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			if (rABS) {
				wb = XLSX.read(btoa(fixdata(data)), { //手动转化
					type : 'base64'
				});
			} else {
				wb = XLSX.read(data, {
					type : 'binary'
				});
			}
			//wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
			//wb.Sheets[Sheet]获取第一个Sheet的数据
			var name = $(obj).attr('name')
			$(obj).parents("td").find('.main').css('pointer-events', 'auto');
			$(obj).siblings().removeClass('stoBtnactiv')
			$(obj).siblings('label').addClass('stoBtnactiv');
			var series = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
			excel_range[name] = {
				'min' : series[0].dates,
				'max' : series[series.length - 1].dates
			}
			$.each(series, function(i, n) {
				if (n.dates < excel_range[name].min)
					excel_range[name].min = n.dates;
				if (n.dates > excel_range[name].max)
					excel_range[name].max = n.dates;
			});
			excelData[name] = {
				'name' : name,
				'weight' : 0,
				'series' : series
			}
		};
		if (rABS) {
			reader.readAsArrayBuffer(f);
		} else {
			reader.readAsBinaryString(f);
		}
	}
	//解码
	function fixdata(data) { //文件流转BinaryString
		var o = "",
			l = 0,
			w = 10240;
		for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
		return o;
	}
	//日期格式转换
	function dateFmt(str, symbol) {
		if (symbol == 'CN')
			return str.substring(0, 4) + "年" + str.substring(4, 6) + "月" + str.substring(6, 8) + "日";
		return str.substring(0, 4) + symbol + str.substring(4, 6) + symbol + str.substring(6, 8);
	}

	function getStyle(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	}

	function startMove(obj, attr, iTarget) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var iCur = 0;

			if (attr == 'opacity') {
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			var iSpeed = (iTarget - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (iCur == iTarget) {
				clearInterval(obj.timer);
			} else {
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		}, 30)
	}
	function nextWeek() {
		var oBtnPrev = document.getElementById('prev');
		var oBtnNext = document.getElementById('next');
		var oMarkLeft = document.getElementById('mark_left');
		var oMarkRight = document.getElementById('mark_right');
		//上面的左右按钮
		oBtnPrev.onmouseover = oMarkLeft.onmouseover = function() {
			startMove(oBtnPrev, 'opacity', 100);
		}

		oBtnPrev.onmouseout = oMarkLeft.onmouseout = function() {
			startMove(oBtnPrev, 'opacity', 0);
		}

		oBtnNext.onmouseover = oMarkRight.onmouseover = function() {
			startMove(oBtnNext, 'opacity', 100);
		}

		oBtnNext.onmouseout = oMarkRight.onmouseout = function() {
			startMove(oBtnNext, 'opacity', 0);
		}
	}
	//滑动条，
	function initAction() {
		var iSpeed=0;
		var left=0;
		function move(obj, iTarget)
		{
			clearInterval(obj.timer);
			obj.timer=setInterval(function (){
				iSpeed+=(iTarget-obj.offsetLeft)/5;
				iSpeed*=0.7;
				left+=iSpeed;
				
				if(Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1)
				{
					clearInterval(obj.timer);
					
					obj.style.left=iTarget+'px';	
					//alert('关了');
				}
				else
				{
					obj.style.left=left+'px';
				}
			}, 30);
		}
		var assetUl = document.getElementById('assetUl');
		var assetLi = assetUl.getElementsByTagName('li');
		var assetyBg = assetLi[assetLi.length - 1];
		var current = assetLi[0].offsetLeft;
		for (var i = 0; i < assetLi.length - 1; i++) {
			assetLi[i].onmouseover = function() {
				target = this.offsetLeft; // 把左侧的位置给target
				move(assetyBg,target);
			};
			assetLi[i].onmouseout = function() {
				target = current;
				move(assetyBg,target);
			};
			assetLi[i].onclick = function() {
				current = this.offsetLeft;
			};
		}
	}
	//输出区域
	exports.init = _init;
});