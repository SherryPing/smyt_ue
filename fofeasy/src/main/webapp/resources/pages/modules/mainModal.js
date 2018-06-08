define(function(require, exports, module) {
	// 引入js和css区域
	require('jdirk');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('sonic');
	var util =  require('util');
	var $ = require('jquery');
	var Ladda = require('ladda');
	// 变量区域
	var mainForm;
	var fileFormat;
	var dateStart; //统计范围
	var dateEnd;
	var conditionDatas;
	var assetAccoutData; //表格数据
	var stockIndustryData;

	// 初始化区域
	$(function() {
		init();
	});
	function init() {
		initConfig();
		initAction();
	}
	function initConfig() {
		
		var now = new Date();
		var lastM = new Date();
		lastM.setMonth(now.getMonth()-1);
		var dateStartStr = util.fmtYyyyMMdd(lastM)
		var dateEndStr = util.fmtYyyyMMdd(now)
		
		fileFormat = 'xls';
		conditionDatas = act_data();
		conditionDatas.dateStart = dateStartStr; //'2016-11-01';
		conditionDatas.dateEnd = dateEndStr;//'2016-12-30';
//		$("input[name='start_data']").val($("#foundation_date").text());
//		$("input[name='end_data']").val($("#statistic_date").text());
		$("input[name='start_data']").val(dateStartStr);
		$("input[name='end_data']").val(dateEndStr);
//		prepareReportData();
	}
	function initAction() {
		$('.exportData').datetimepicker({ //日期选择
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
		$("#exportTbl input[type='checkbox']").prop('checked', true);//默认全部选上
		$('#generateReport').click(function(){
			$('#layer1').css('display','none');
			$('#onLoad').css('display','none');
		});
		$('.checkboxData').click(function() { //频率选择
			var whether = $(this).hasClass('checkboxdataAct');
			if (whether == 1) {
				$(this).removeClass('checkboxdataAct');
			} else {
				var count = $('.checkboxData');
				for (var i = 0; i < count.length; i++) {
					$(count[i]).removeClass('checkboxdataAct');
				}
				$(this).addClass('checkboxdataAct');
			}
		});
		$('#exportBenchmark .bmarkSlc').click(function() { //选择基准点击事件
			var a = $(this).find('div').hasClass('benchmarkDivfalse');
			if (a == 1) {
				$(this).find('div').removeClass("benchmarkDivfalse");
				$(this).find('label').removeClass("benchmarkLabfalse");
			} else {
				$(this).find('div').addClass("benchmarkDivfalse");
				$(this).find('label').addClass("benchmarkLabfalse");
			}
		});
		$('.expAllslc').click(function() { //单行多选
			var count = 0;
			var mulSlc = $(this).parent().next().find('input');
			for (var i = 0; i < mulSlc.length; i++) {
				var Choice = $(mulSlc[i]).is(':checked');
				count += Choice;
			}

			if (count == mulSlc.length) {
				$(this).parent().next().find('input').prop('checked', false);
			} else {
				$(this).parent().next().find('input').prop('checked', true);
			}
		});
		$('#expclearBtn').click(function() { //清空选择按钮
			$('#exportTbl input').prop("checked", false);
			var benchmarkDiv = $('#exportBenchmark .bmarkSlc');
			for (var i = 0; i < benchmarkDiv.length; i++) {
				if (i > 0) {
					$(benchmarkDiv[i]).find('div').addClass('benchmarkDivfalse');
					$(benchmarkDiv[i]).find('label').addClass('benchmarkLabfalse');
				} else {
					$(benchmarkDiv[i]).find('div').removeClass('benchmarkDivfalse');
					$(benchmarkDiv[i]).find('label').removeClass('benchmarkLabfalse');
				}
			}
		});

		$('#exportExcel').bind('click', function() {
			$('#layer1').fadeIn();
			$('#onLoad').fadeIn();
			loading();
		
			Choice();
			prepareReportData("xls");
		});

	}

	//客户多选数据对象。
	function act_data() {
		var data = {
			"dateStart" : '',
			"dateEnd" : '',
			"frequency" : '',
			"statisticalInterval":'',
			"selectBenchmarks" : [],
			"earningsIndicators" : [],
			"riskincomeIndicators" : [],
			"earnings_riskindicators" : [],
			"styleIndicator" : [],
			"RelativeIndex" : []
		};
		return data
	}

	function Choice() { //将选上的添加到数据对象里，在导出word和pdf调用这个方法。
		//清空
		conditionDatas = act_data();

		var startDate = $("input[name='start_data']").val();
		var endDate = $("input[name='end_data']").val();
		if (startDate > endDate) {
			layer.msg("开始日期比结束日期大，请您重新选择。");
		} else {
			conditionDatas.dateStart = startDate;
			conditionDatas.dateEnd = endDate;
			var Frequency = $('#exportFrequency button'); //频率
			for (var i = 0; i < Frequency.length; i++) {
				var btnChoice = $(Frequency[i]).hasClass('checkboxdataAct');
				if (btnChoice == 1) {
					var Sign = $(Frequency[i]).attr('id');
					conditionDatas.frequency = Sign;
					break;
				}
			}
			var statisticalInterval = $("#statisticalInterval .selectTime");//统计区间
			for(var i = 0;i<statisticalInterval.length;i++){
				var IntervalChoice = $(statisticalInterval[i]).hasClass("choiceTime");
				if(IntervalChoice==1){
					var Sign = $(statisticalInterval[i]).data('id');
					conditionDatas.statisticalInterval = Sign;
				}
			}
			//选择基准
			var benchmark = $('#radiusChoice .bmarkSlc div');
			for (var i = 0; i < benchmark.length; i++) {
				var bchChoice = $(benchmark[i]).hasClass('benchmarkDivfalse');
				if (bchChoice != 1) {
					var Sign = $(benchmark[i]).attr('id');
					conditionDatas.selectBenchmarks.push(Sign);
				}
			}
			var Mulsleobj = $("#exportTbl input[type='checkbox']"); //获取table下每一个多选对象,
			for (var i = 0; i < Mulsleobj.length; i++) { //遍历每个多选对象
				var Choice = $(Mulsleobj[i]).is(':checked'); //判断对象是是否选中。
				if (Choice == 1) { //如果选中，就往数组里添加。
					var belongArray = $(Mulsleobj[i]).parents('tr').attr('id'); //获取到每一行tr元素title属性，然后根据这个属性，往数据对象哪个数组添加。
					var Sign = $(Mulsleobj[i]).attr('name'); //获取本对象的id,往数组里添加
					switch (belongArray) {
					case "earningsIndicators":
						if (Sign == '正收益周(月)数') {
							conditionDatas.earningsIndicators.push('正收益周数');
							conditionDatas.earningsIndicators.push('正收益月数');
						} else if (Sign == '非正收益周(月)数') {
							conditionDatas.earningsIndicators.push('非正收益周数');
							conditionDatas.earningsIndicators.push('非正收益月数');
						} else if (Sign == '最高单周(月)回报') {
							conditionDatas.earningsIndicators.push('最高单周回报');
							conditionDatas.earningsIndicators.push('最高单月回报');
						} else if (Sign == '最低单周(月)回报') {
							conditionDatas.earningsIndicators.push('最低单周回报');
							conditionDatas.earningsIndicators.push('最低单月回报');
						} else if (Sign == '最长连续上涨周(月)数') {
							conditionDatas.earningsIndicators.push('最长连续上涨周数');
							conditionDatas.earningsIndicators.push('最长连续上涨月数');
						} else if (Sign == '最长连续下跌周(月)数') {
							conditionDatas.earningsIndicators.push('最长连续下跌周数');
							conditionDatas.earningsIndicators.push('最长连续下跌月数');
						} else {
							conditionDatas.earningsIndicators.push(Sign);
						}

						break;
					case "riskincomeIndicators":
						conditionDatas.riskincomeIndicators.push(Sign);
						break;
					case "earnings_riskindicators":
						conditionDatas.earnings_riskindicators.push(Sign);
						break;
					case "styleIndicator":
						conditionDatas.styleIndicator.push(Sign);
						break;
					case "RelativeIndex":
						conditionDatas.RelativeIndex.push(Sign);
						break;
					}
				}
			}
		}
		console.log(conditionDatas);
	}
	;
	/*
	 * 准备报告数据-表格和图片
	 */
	function prepareReportData(fileFormat) {
		var params = {
			'fund_ids' : fundIds,  //fundIds为easy2.js中声明的全局变量
			'date_range' : {
				'min' : conditionDatas.dateStart.replace('-', '').replace('-', ''),
				'max' : conditionDatas.dateEnd.replace('-', '').replace('-', '')
			},
//			'date_start' : conditionDatas.dateStart.replace('-', '').replace('-', ''),
//			'date_end' : conditionDatas.dateEnd.replace('-', '').replace('-', ''),
			
			'benchmarks' : conditionDatas.selectBenchmarks.join(','),
			'revenue' : conditionDatas.earningsIndicators,
			'risk' : conditionDatas.riskincomeIndicators,
			'revenue_risk' : conditionDatas.earnings_riskindicators,
			'relative' : conditionDatas.RelativeIndex,
			'freq' : conditionDatas.frequency,
			'freq_lenth' : conditionDatas.statisticalInterval,
			'user_id':useUserId
		};
        layer.msg("报告生成中，请耐心等待...");
		$.ajax({
			url : apiPath + '/api/v1/prepare_mutli_performance_data/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
            success : function(resp) {
                exportReport(fileFormat);
                $('#layer1').fadeOut();
                $('#onLoad').fadeOut();
            },error:function(){
                $('#layer1').fadeOut();
                $('#onLoad').fadeOut();
                layer.msg("请重试");
            }
        })
// 			complete:function(){
// //				layer.msg("网络连接异常，请稍后再试！");
//                 $('#layer1').fadeOut();
//                 $('#onLoad').fadeOut();
// 			},
// 			success : function(resp) {
// 				exportReport(fileFormat);
// 			}
// 		})
		layer.msg("报告生成中，请耐心等待...");
	}
	function exportReport(fileFormat) {
		console.log('导出文件格式 is ' + fileFormat);

		var url = ctx + '/productReport/exportExcel?user_id='+useUserId;
		//var tempwindow=window.open("");      
		//tempwindow.location=url;
		window.open(url);
	}
	function loading() {
		var loaders = [
			{
				width : 100,
				height : 100,
				stepsPerFrame : 1,
				trailLength : 1,
				pointDistance : .02,
				fps : 30,
				fillColor : '#05E2FF',
				step : function(point, index) {
					this._.beginPath();
					this._.moveTo(point.x, point.y);
					this._.arc(point.x, point.y, index * 7, 0, Math.PI * 2, false);
					this._.closePath();
					this._.fill();
				},
				path : [
					[ 'arc', 50, 50, 30, 0, 360 ]
				]
			},
		];
		var d,
			a,
			container = document.getElementById('onLoad');
		d = document.createElement('div');
		d.className = 'loading';
		a = new Sonic(loaders[0]);
		d.appendChild(a.canvas);
		container.appendChild(d);
		a.canvas.style.marginTop = (150 - a.fullHeight) / 2 + 'px';
		a.canvas.style.marginLeft = (150 - a.fullWidth) / 2 + 'px';
		a.play();
	}
});