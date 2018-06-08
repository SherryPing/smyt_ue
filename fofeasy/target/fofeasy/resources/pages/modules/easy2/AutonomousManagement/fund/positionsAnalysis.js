/**
 * @author martin
 * 持仓分析.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	require("base64");
	require("move");
	require("highstock")
	// require("highcharts_zh_CN");
	require('bootstrap_table_zh');
	require("chartCollection");
	var util = require('util');

	// 变量区域
	var fundId = $('#fundId').val();
	var dateStart; //统计范围开始
	var dateEnd; //统计范围结束
	//母基金日期
	var mother_startdate1 = null;
	var mother_enddate1 = null;
	var mother_startdate2 = null;
	var mother_enddate2 = null;
	//策略日期
	var strategy_startdate1 = null;
	var strategy_enddate1 = null;
	var strategy_startdate2 = null;
	var strategy_enddate2 = null;
	var cc_startdate1 = null;
	var cc_enddate1 = null;
	//资产账户日期
	var account_startdate1 = null;
	var account_enddate1 = null;
	//股票资产日期
	var stock_startdate1 = null;
	var stock_enddate1 = null;
	var stock_startdate2 = null;
	var stock_enddate2 = null;
	var stock_startdate3 = null;
	var stock_enddate3 = null;
	//期货日期
	var futures_startdate1 = null;
	var futures_enddate1 = null;
	var futures_startdate2 = null;
	var futures_enddate2 = null;
	var futures_startdate3 = null;
	var futures_enddate3 = null;
	var futures_startdate4 = null;
	var futures_enddate4 = null;
	var leader = 0,
		target = 0;
	var ccfreq = "m1";
	var accessFreq = 'd';
	var Distance;
	Location = 0;
	var level; //统计维度
	//债券日期
	var bondStartdate1 = null;
	var bondEnddate1 = null;
    var bondStartdate2 = null;
    var bondEnddate2 = null;
    var couponStaticdate = ""
	var bondDatastate1 = 0;
    var bondDatastate2 = 0;
	// 初始化区域
	function _init() {
		initAction();
		isfof();
		checkaccounts();
		initConfig();
        initAccount();
		initDateTab();
	}
	//滑动条，这个move函数不能删。
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
		var assetUl = document.getElementById('positionUl');
		var assetLi = assetUl.getElementsByTagName('li');
		var assetyBg = assetLi[assetLi.length - 1];
		var current = assetLi[0].offsetLeft; // 用于存放点击时候的 offsetLeft
		for (var i = 0; i < assetLi.length; i++) {
			assetLi[i].onmouseover = function() {
				target = this.offsetLeft; // 把左侧的位置给target
				move(assetyBg,target);
			}
			assetLi[i].onmouseout = function() {
				target = current; // 鼠标离开，target是刚才我们点击的位置
				move(assetyBg,target);
			}
			assetLi[i].onclick = function() {
				current = this.offsetLeft; //点击的时候把当前位置存贮一下
			}
		}
	}
	//初始参数
	function initConfig() {
		$("#positionUl>li").each(function(i) {
			$(this).on('click', function() {
				switch (i) {
				case 0:
					//加载资产账户
					initAccount();
					break;
				case 1:
					//加载股票资产
					initStock();
					break;
				case 2:
					//加载期货资产
					initFuture();
					break;
				case 3:
					//加载期货资产
                    initBonds();
					break;
				}
			})
		});
		$('#positionUl>li').on('click', function() {
			var Div = $('.assetAllocationDiv');
			for (var i = 0; i < Div.length; i++) {
				$(Div[i]).fadeOut();
			}
			$(Div[$(this).index()]).fadeIn();
		});

		dateStart = null //util.fmtYyyMd($('.cdata:even:eq(0)').val());
		dateEnd = null //util.fmtYyyMd($('.cdata:odd:eq(0)').val());
		level = $("[name='optionsRadios']:checked").val() * 1;
		//日期选择
		$('.form_date').datetimepicker({
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
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
		//母基金日期选择1
		$(".mother_date1").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				mother_startdate1 = $(this).val();
				$('.mother_date1:even').val($(this).val());
				$('.mother_date1:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				mother_enddate1 = $(this).val();
				$('.mother_date1:odd').val($(this).val());
				$('.mother_date1:even').datetimepicker('setEndDate', $(this).val());
			}
			parentTbl();
			parentincome();
			parentRound();
			parentvar();
			parentstdev();
		});
		//母基金日期选择2
		$(".mother_date2").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				mother_startdate2 = $(this).val();
				$('.mother_date2:even').val($(this).val());
				$('.mother_date2:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				mother_enddate2 = $(this).val();
				$('.mother_date2:odd').val($(this).val());
				$('.mother_date2:even').datetimepicker('setEndDate', $(this).val());
			}
			parentsequencediagram();
		});
		//策略日期选择1
		$(".strategy_date1").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				strategy_startdate1 = $(this).val();
				$('.strategy_date1:even').val($(this).val());
				$('.strategy_date1:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				strategy_enddate1 = $(this).val();
				$('.strategy_date1:odd').val($(this).val());
				$('.strategy_date1:even').datetimepicker('setEndDate', $(this).val());
			}
			strategyTbl();
			strategyRound();
			strategyincome();
			strategyvar();
			strategystdev();
		});
		//策略日期选择2
		$(".strategy_date2").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				strategy_startdate2 = $(this).val();
				$('.strategy_date2:even').val($(this).val());
				$('.strategy_date2:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				strategy_enddate2 = $(this).val();
				$('.strategy_date2:odd').val($(this).val());
				$('.strategy_date2:even').datetimepicker('setEndDate', $(this).val());
			}
			strategysequencediagram();
		});
		//资产账户资产配置日期选择
		$(".account_date1").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				account_startdate1 = util.fmtYyyMd($(this).val());
				$('.account_date1:even').val($(this).val());
				$('.account_date1:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				account_enddate1 = util.fmtYyyMd($(this).val());
				$('.account_date1:odd').val($(this).val());
				$('.account_date1:even').datetimepicker('setEndDate', $(this).val());
			}
			assetAccountTab();
			assetAccountGrid();
		});
		//股票资产行业分析日期选择
		$(".stock_date1").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				stock_startdate1 = util.fmtYyyMd($(this).val());
				$('.stock_date1:even').val($(this).val());
				$('.stock_date1:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				stock_enddate1 = util.fmtYyyMd($(this).val());
				$('.stock_date1:odd').val($(this).val());
				$('.stock_date1:even').datetimepicker('setEndDate', $(this).val());
			}
			stockIndustryTab();
			stockIndustryGrid();
		});
		//股票资产市值分析日期选择
		$(".stock_date2").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				stock_startdate2 = util.fmtYyyMd($(this).val());
				$('.stock_date2:even').val($(this).val());
				$('.stock_date2:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				stock_enddate2 = util.fmtYyyMd($(this).val());
				$('.stock_date2:odd').val($(this).val());
				$('.stock_date2:even').datetimepicker('setEndDate', $(this).val());
			}
			stockMarketValueTab();
			stockMarketValueGrid();
		});
		//股票资产股票分析日期选择
		$(".stock_date3").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				stock_startdate3 = util.fmtYyyMd($(this).val());
				$('.stock_date3:even').val($(this).val());
				$('.stock_date3:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				stock_enddate3 = util.fmtYyyMd($(this).val());
				$('.stock_date3:odd').val($(this).val());
				$('.stock_date3:even').datetimepicker('setEndDate', $(this).val());
			}
			stockAnalysisValuationTab();
			stockAnalysisCentralizedGrid();
		});
		//期货资产账户净值日期选择
		$(".futures_date1").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				futures_startdate1 = $(this).val();
				$('.futures_date1:even').val($(this).val());
				$('.futures_date1:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				futures_enddate1 = $(this).val();
				$('.futures_date1:odd').val($(this).val());
				$('.futures_date1:even').datetimepicker('setEndDate', $(this).val());
			}
			accountNet();
			accountTbl();
		});
		//期货资产账户出入金日期选择
		$(".futures_date2").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				futures_startdate2 = $(this).val();
				$('.futures_date2:even').val($(this).val());
				$('.futures_date2:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				futures_enddate2 = $(this).val();
				$('.futures_date2:odd').val($(this).val());
				$('.futures_date2:even').datetimepicker('setEndDate', $(this).val());
			}
			accountUkashday();
		});
		//期货资产隔夜风险日期选择
		$(".futures_date3").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				futures_startdate3 = $(this).val();
				$('.futures_date3:even').val($(this).val());
				$('.futures_date3:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				futures_enddate3 = $(this).val();
				$('.futures_date3:odd').val($(this).val());
				$('.futures_date3:even').datetimepicker('setEndDate', $(this).val());
			}
			overnightRisk();
		});
		//期货资产头寸分析日期选择
		$(".futures_date4").on("change", function() {
			if ($(this).attr('name') == 'date_start') {
				futures_startdate4 = $(this).val();
				$('.futures_date4:even').val($(this).val());
				$('.futures_date4:odd').datetimepicker('setStartDate', $(this).val());
			} else {
				futures_enddate4 = $(this).val();
				$('.futures_date4:odd').val($(this).val());
				$('.futures_date4:even').datetimepicker('setEndDate', $(this).val());
			}
			averagePosition();
		});
        //债券券种分析日期
        $(".bondsDate1").on("change", function() {
            if ($(this).attr('name') == 'date_start') {
                bondStartdate1 = $(this).val();
                $('.bondsDate1:even').val($(this).val());
                $('.bondsDate1:odd').datetimepicker('setStartDate', $(this).val());
            } else {
                bondEnddate1 = $(this).val();
                $('.bondsDate1:odd').val($(this).val());
                $('.bondsDate1:even').datetimepicker('setEndDate', $(this).val());
            }
            couponSpecies();
        });
		//确定按钮
		$('[name="btnOK"]:eq(0)').on('click', function() {
			initAccount();
		});
		$('[name="btnOK"]:eq(1)').on('click', function() {
			stockRefresh();
		});
		//绑定基准
		$("[name='optionsRadios']").on('change', function() {
			level = $(this).val() * 1;
			stockRefresh();
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
		//期货资产，账户出入金、逐日、逐月。
		$('.accessFreq:eq(0)').click(function() {
			$(this).addClass("positionChoice_ac");
			$('.accessFreq:eq(1)').removeClass("positionChoice_ac");
			$('#accessmonthdiv').fadeOut(50);
			$('#accessdaydiv').fadeIn(500);
			accessFreq = 'd';
			accountUkashday();
		});
		$('.accessFreq:eq(1)').click(function() {
			$(this).addClass("positionChoice_ac");
			$('.accessFreq:eq(0)').removeClass("positionChoice_ac");
			$('#accessdaydiv').fadeOut(50);
			$('#accessmonthdiv').fadeIn(500);
			accessFreq = 'm';
			accountUkashday();
		});
		//期货资产-品种分析日夜选择
		$('#dayBtn').click(function() {
			$(this).addClass("positionChoice_ac");
			$('#nightBtn').removeClass("positionChoice_ac");
			$('.nightTransact').fadeOut(50);
			$('.dayTransact').fadeIn(500);
		});
		$('#nightBtn').click(function() {
			$(this).addClass("positionChoice_ac");
			$('#dayBtn').removeClass("positionChoice_ac");
			$('.nightTransact').fadeIn(500);
			$('.dayTransact').fadeOut(50);
		});
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
	}
	//初始化资产账户
	function initAccount() {
		assetAccountTab();
		assetAccountGrid();
	}

	function initDateTab() {
		//日期选择
		$('.dateInp').datetimepicker({
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});

	}
	//业务逻辑

	/**
	 * 资产账户
	 */
	//判断基金是否有股票资产和期货资产
	function checkaccounts() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/check_accounts/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				//				var assetUl = document.getElementById('positionUl');
				//				var assetLi = assetUl.getElementsByTagName('li');
				//				var assetyBg = assetLi[assetLi.length - 1];
				//				var Distance = assetUl.children[0].offsetLeft;
				//				if (!resp.security) {
				//					$('#positionUl li:eq(1)').css("display", "none");
				//					$('#positionUl li:last-child').css('margin-top', '30px');
				//					$('#asseLine').css('width', '330px');
				//					startMove1(assetyBg, Distance);
				//				} else if (!resp.future) {
				//					$('#positionUl li:eq(2)').css("display", "none");
				//					$('#positionUl li:last-child').css('margin-top', '30px');
				//					$('#asseLine').css('width', '330px');
				//					startMove1(assetyBg, Distance);
				//				} else if (!resp.security && !resp.future) {
				//					$('#positionUl li:eq(1)').css("display", "none");
				//					$('#positionUl li:eq(2)').css("display", "none");
				//					$('#positionUl li:last-child').css('margin-top', '30px');
				//					$('#asseLine').css('width', '220px');
				//					startMove1(assetyBg, Distance);
				//				}
			}
		})
	}
	//判断是否为fof，如果不是，母基金设置模块隐藏起来。如果是显示出来。
	function isfof() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/is_fof/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.is_fof) {
					$('#parentFund').fadeIn(50);
					parentTbl();
					parentsequencediagram();
					parentincome();
					parentRound();
					parentvar();
					parentstdev();
					strategyTbl();
					strategyRound();
					strategyincome();
					strategyvar();
					strategystdev();
					strategysequencediagram();
					Policydependencies();
					ccOfsubfund();
				}
			}
		})
	}
	//母基金设置-表格
	function parentTbl() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			date_range : {
				"min" : mother_startdate1,
				"max" : mother_enddate1
			}
		}; //{"min":null,"max":null}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/fund/section/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initmotherTab($('#parentfTbl'), resp.fof_allocation);
				$('#parentfTbl').bootstrapTable('load', resp.fof_allocation.data);
				mother_startdate1 = resp.date_range.min;
				mother_enddate1 = resp.date_range.max;
				$('.mother_date1:even').val(resp.date_range.min);
				$('.mother_date1:odd').val(resp.date_range.max);
				$('.mother_date1:even').datetimepicker('setStartDate', resp.interval.min);
				$('.mother_date1:even').datetimepicker('setEndDate', resp.interval.max);
				$('.mother_date1:odd').datetimepicker('setStartDate', resp.interval.min);
				$('.mother_date1:odd').datetimepicker('setEndDate', resp.interval.max);
			}
		})
	}
	//母基金设置-圆图
	function parentRound() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			date_range : {
				"min" : mother_startdate1,
				"max" : mother_enddate1
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/fund/proportion/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				init3dchart($('#montherRoundchart'), resp);
			}
		})
	}

	//母基金设置-收益
	function parentincome() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			date_range : {
				"min" : mother_startdate1,
				"max" : mother_enddate1
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/fund/return/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initchart($('#mincomeChart'), resp.return_data, {
					'reservations' : 'percent',
					'chart_type' : 'column',
					legend : {
						enabled : true
					}
				});
			}
		})
	}
	//母基金设置-var贡献占比
	function parentvar() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			date_range : {
				"min" : mother_startdate1,
				"max" : mother_enddate1
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/fund/var/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initchart($('#FluctuationChar'), resp.var_data, {
					'reservations' : 'percent',
					'chart_type' : 'column',
					legend : {
						enabled : true
					}
				});
			}
		})
	}
	//母基金设置-波动率
	function parentstdev() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			date_range : {
				"min" : mother_startdate1,
				"max" : mother_enddate1
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/fund/stdev/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initchart($('#momVolatility'), resp.dev_data, {
					'reservations' : 'percent',
					'chart_type' : 'column',
					legend : {
						enabled : true
					}
				});
			}
		})
	}
	//母基金设置-时序图
	function parentsequencediagram() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			date_range : {
				"min" : mother_startdate2,
				"max" : mother_enddate2
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/fund/series/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				/*initArea($('#momtimeChart'), {
					'legend' : true,
					'date' : resp.fof_allocation.categories,
					'series' : resp.fof_allocation.series
				});*/
				initArea($('#momtimeChart'),{'date' : resp.fof_allocation.categories,'series' : resp.fof_allocation.series},{
					color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
					reservations: "percent1",
					stacking: "percent",
					lineColor: "#ffffff",
					markerLineWidth: 1,
					markerRadius: 1,
					legend : {
						enabled : true
					}
				})
				mother_startdate2 = resp.date_range.min;
				mother_enddate2 = resp.date_range.max;
				$('.mother_date2:even').val(resp.date_range.min);
				$('.mother_date2:odd').val(resp.date_range.max);
				$('.mother_date2:even').datetimepicker('setStartDate', resp.interval.min);
				$('.mother_date2:even').datetimepicker('setEndDate', resp.interval.max);
				$('.mother_date2:odd').datetimepicker('setStartDate', resp.interval.min);
				$('.mother_date2:odd').datetimepicker('setEndDate', resp.interval.max);
			}
		})
	}
	//资产账户-tab
	function assetAccountTab() {
		var params = {
			'fund_id' : fundId,
			'classify' : 'type',
			'date_range' : {
				'min' : account_startdate1,
				'max' : account_enddate1
			},
			'reveal' : 1,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/section/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				// var rdata = eval('(' + resp;
				var rdata = resp;
				initTab1($('#assetAccounttbl'), rdata.total_data);
				account_startdate1 = rdata.date_range.min;
				account_enddate1 = rdata.date_range.max;
				$('.account_date1:even').val(rdata.date_range.min);
				$('.account_date1:odd').val(rdata.date_range.max);
				$('.account_date1:even').datetimepicker('setStartDate', rdata.interval.min);
				$('.account_date1:even').datetimepicker('setEndDate', rdata.interval.max);
				$('.account_date1:odd').datetimepicker('setStartDate', rdata.interval.min);
				$('.account_date1:odd').datetimepicker('setEndDate', rdata.interval.max);
				$('#assetAccounttbl').bootstrapTable('load', rdata.total_data);
			},
			error : function(resp) {
				// var r = eval('(' + resp.responseJSON;
                var r = resp.responseJSON;
			}
		})
	}

	//资产账户-grid
	function assetAccountGrid() {
		var params = {
			'fund_id' : fundId,
			'classify' : 'type',
			'date_range' : {
				'min' : account_startdate1,
				'max' : account_enddate1
			},
			'reveal' : 1,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/series/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $('#assetAccountchart');
				var rdata = resp;
				/*initArea(dom, {
					'legend' : true,
					'date' : rdata.date,
					'series' : rdata.data
				});*/
				initArea(dom,{'date' : rdata.date,'series' : rdata.data},{
					color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
					reservations: "percent1",
					stacking: "percent",
					lineColor: "#ffffff",
					markerLineWidth: 1,
					markerRadius: 1,
					legend : {
						enabled : true
					}
				})

			},
			error : function(resp) {
				var r = resp.responseJSON;
			}
		})
	}
	//策略配置-表格
	function strategyTbl() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			"date_range" : {
				'min' : strategy_startdate1,
				'max' : strategy_enddate1
			}
		}; //{"min":null,"max":null}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/strategy/section/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initstrategyTab($('#policyTbl'), resp.fof_allocation);
				$('#policyTbl').bootstrapTable('load', resp.fof_allocation);
				strategy_startdate1 = resp.date_range.min;
				strategy_enddate1 = resp.date_range.max;
				$('.strategy_date1:even').val(resp.date_range.min);
				$('.strategy_date1:odd').val(resp.date_range.max);
				$('.strategy_date1:even').datetimepicker('setStartDate', resp.interval.min);
				$('.strategy_date1:even').datetimepicker('setEndDate', resp.interval.max);
				$('.strategy_date1:odd').datetimepicker('setStartDate', resp.interval.min);
				$('.strategy_date1:odd').datetimepicker('setEndDate', resp.interval.max);
			}
		})
	}

	//策略配置-收益
	function strategyincome() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			"date_range" : {
				'min' : strategy_startdate1,
				'max' : strategy_enddate1
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/strategy/return/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initchart($('#incomeChart'), resp.return_data, {
					'reservations' : 'percent',
					'chart_type' : 'column',
					legend : {
						enabled : true
					}
				});
			}
		})
	}
	//策略配置-圆图
	function strategyRound() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			"date_range" : {
				'min' : strategy_startdate1,
				'max' : strategy_enddate1
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/strategy/proportion/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				init3dchart($('#policyRound'), resp);
			}
		})
	}
	//策略配置-var贡献占比
	function strategyvar() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			"date_range" : {
				'min' : strategy_startdate1,
				'max' : strategy_enddate1
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/strategy/var/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initchart($('#policyVar'), resp.var_data, {
					'reservations' : 'percent',
					'chart_type' : 'column',
					legend : {
						enabled : true
					}
				});
			}
		})
	}
	//策略配置-波动率
	function strategystdev() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			"date_range" : {
				'min' : strategy_startdate1,
				'max' : strategy_enddate1
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/strategy/stdev/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initchart($('#policyVolatility'), resp.dev_data, {
					'reservations' : 'percent',
					'chart_type' : 'column',
					legend : {
						enabled : true
					}
				});
			}
		})
	}
	//策略配置-时序图
	function strategysequencediagram() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId,
			"date_range" : {
				'min' : strategy_startdate2,
				'max' : strategy_enddate2
			}
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/strategy/series/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				/*initArea($('#policytimeChart'), {
					'legend' : true,
					'date' : resp.fof_allocation.categories,
					'series' : resp.fof_allocation.series
				});*/
				initArea($('#policytimeChart'),{'date' : resp.fof_allocation.categories,'series' : resp.fof_allocation.series},{
					color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
					reservations: "percent1",
					stacking: "percent",
					lineColor: "#ffffff",
					markerLineWidth: 1,
					markerRadius: 1,
					legend : {
						enabled : true
					}
				})
				strategy_startdate2 = resp.date_range.min;
				strategy_enddate2 = resp.date_range.max;
				$('.strategy_date2:even').val(resp.date_range.min);
				$('.strategy_date2:odd').val(resp.date_range.max);
				$('.strategy_date2:even').datetimepicker('setStartDate', resp.interval.min);
				$('.strategy_date2:even').datetimepicker('setEndDate', resp.interval.max);
				$('.strategy_date2:odd').datetimepicker('setStartDate', resp.interval.min);
				$('.strategy_date2:odd').datetimepicker('setEndDate', resp.interval.max);
			}
		})
	}
	//策略相关性-热力图
	function Policydependencies() {
		var params = {
			"fund_id" : fundId,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/strategy/dynamic_corref/',
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
				console.log(resp)
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
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/fof/fund/fund_corref/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed == false) {
					layer.msg(resp.msg);
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
	/**
	 * 初始化股票资产
	 */
	function initStock() {
		initanalysis();
	}
	//股票资产动作
	function initanalysis() {
		//加载行业分析
		stockIndustryTab();
		stockIndustryGrid();
		//加载市值分析
		stockMarketValueTab();
		stockMarketValueGrid();
		//加载股票分析
		stockAnalysisCentralizedTab();
		stockAnalysisValuationTab();
		stockAnalysisCentralizedGrid();
		stockAnalysisPortfoliorisk();
	}
	/**
	 * 股票资产-行业分析
	 */
	//股票资产-行业分析-tab
	function stockIndustryTab() {
		var params = {
			'fund_id' : fundId,
			'classify' : 's_sws',
			'date_range' : {
				'min' : stock_startdate1,
				'max' : stock_enddate1
			},
			'level' : level,
			'reveal' : 1,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/section/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				$.base64.utf8encode = true;
				var dom = $('#stockIndustryTab');
				var rdata = resp;
				stock_startdate1 = rdata.date_range.min;
				stock_enddate1 = rdata.date_range.max;
				$('.stock_date1:even').val(rdata.date_range.min);
				$('.stock_date1:odd').val(rdata.date_range.max);
				$('.stock_date1:even').datetimepicker('setStartDate', rdata.interval.min);
				$('.stock_date1:even').datetimepicker('setEndDate', rdata.interval.max);
				$('.stock_date1:odd').datetimepicker('setStartDate', rdata.interval.min);
				$('.stock_date1:odd').datetimepicker('setEndDate', rdata.interval.max);
				//展开行					
				var onClickRow = function(row, element, field) {
					var r = rdata.sub_type_data;
					element.find('i').attr("class","glyphicon glyphicon-menu-down");
					var r_clazz = element.data('index');
					if (!element.siblings().hasClass(r_clazz)) { //是否存在该展开
						var nRowStr = "";
						$.each(r[row.name], function(i, n) {
							nRowStr += "<tr class=" + r_clazz + " >" +
								"<td style='font-weight:500;font-size: 14px;'>" + n.name + "</td>" +
								"<td>" + util.fmtFixed(n.asset, 2) + "</td>" +
								"<td>" + util.fmtRatio(n.proportion) + "</td>" +
								"<td>" + util.fmtRatio(n.slope) + "</td></tr>";
						});
						element.after(nRowStr);
					} else {
						element.parent().find("." + r_clazz).remove();
						element.find('i').attr("class","glyphicon glyphicon-menu-right");
						
					}
				}
				initTab4(dom, {
					'data' : rdata.data,
					'onClickRow' : onClickRow
				});
				dom.bootstrapTable('load', rdata.data);
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//股票资产-行业分析-grid
	function stockIndustryGrid() {
		var params = {
			'fund_id' : fundId,
			'user_id' : useUserId,
			'classify' : 's_sws',
			'date_range' : {
				'min' : stock_startdate1,
				'max' : stock_enddate1
			},
			'reveal' : 0
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/series/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $("#stockIndustryGrid");
				var rdata = resp;
				/*initArea(dom, {
					'legend' : true,
					'date' : rdata.date,
					'series' : rdata.data
				});*/
				initArea(dom,{'date' : rdata.date,'series' : rdata.data},{
					color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
					reservations: "percent1",
					stacking: "percent",
					lineColor: "#ffffff",
					markerLineWidth: 1,
					markerRadius: 1,
					legend : {
						enabled : true
					}
				})
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	/**
	 * 股票资产-市值分析
	 */
	//股票资产-市值分析-tab
	function stockMarketValueTab() {
		var params = {
			'fund_id' : fundId,
			'classify' : 's_pmkt-range',
			'values' : [ 500000, 1000000, 3000000 ],
			'date_range' : {
				'min' : stock_startdate2,
				'max' : stock_enddate2
			},
			'level' : level,
			'reveal' : 0,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/section/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $('#stockMarketValueTab');
				var rdata = resp;
				stock_startdate2 = rdata.date_range.min;
				stock_enddate2 = rdata.date_range.max;
				$('.stock_date2:even').val(rdata.date_range.min);
				$('.stock_date2:odd').val(rdata.date_range.max);
				$('.stock_date2:even').datetimepicker('setStartDate', rdata.interval.min);
				$('.stock_date2:even').datetimepicker('setEndDate', rdata.interval.max);
				$('.stock_date2:odd').datetimepicker('setStartDate', rdata.interval.min);
				$('.stock_date2:odd').datetimepicker('setEndDate', rdata.interval.max);
				var td = [ {
					'name' : '50亿以下'
				}, {
					'name' : '50-100亿'
				}, {
					'name' : '100-300亿'
				}, {
					'name' : '300亿以上'
				} ];
				for (var i = 0; i < td.length; i++) { //初始化
					td[i].asset = '';
					td[i].proportion = '';
					td[i].slope = '';
				}
				$.each(rdata.data, function(i, n) {
					switch (n.name) {
					case ",500000":
						td[0].asset = n.asset;
						td[0].proportion = n.proportion;
						td[0].slope = n.slope;
						td[0].data = rdata.sub_type_data[n.name];
						break;
					case "500000,1000000":
						td[1].asset = n.asset;
						td[1].proportion = n.proportion;
						td[1].slope = n.slope;
						td[1].data = rdata.sub_type_data[n.name];
						break;
					case "1000000,3000000":
						td[2].asset = n.asset;
						td[2].proportion = n.proportion;
						td[2].slope = n.slope;
						td[2].data = rdata.sub_type_data[n.name];
						break;
					case "3000000,":
						td[3].asset = n.asset;
						td[3].proportion = n.proportion;
						td[3].slope = n.slope;
						td[3].data = rdata.sub_type_data[n.name];
						break;
					}
				});
				//展开行
				var SecondLevel = function(row, element, field) {
					//$.base64.utf8encode = true;
					var r_clazz = element.data('index');
					element.find('i').attr('class','glyphicon glyphicon-menu-down')
					if (!element.siblings().hasClass(r_clazz)) { //是否存在该展开
						var nRowStr = "";
						$.each(row.data, function(i, n) {
							nRowStr += "<tr class=" + r_clazz + ">" +
								"<td style='font-weight:500;font-size:14px;'>" + n.name + "</td>" +
								"<td>" + util.fmtFixed(n.asset, 2) + "</td>" +
								"<td>" + util.fmtRatio(n.proportion) + "</td>" +
								"<td>" + util.fmtRatio(n.slope) + "</td></tr>";
						});
						element.after(nRowStr);
					} else {
						element.find('i').attr("class","glyphicon glyphicon-menu-right");
						element.parent().find("." + r_clazz).remove();
					}
				}

				stockAnalysisVar();
				stockAnalysisChangeHands();
				stockAnalysisTransactions();

				initTab3(dom, {
					'data' : td,
					'onClickRow' : SecondLevel
				});
				dom.bootstrapTable('load', td);
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//股票资产-市值分析-grid
	function stockMarketValueGrid() {
		var params = {
			'fund_id' : fundId,
			'user_id' : useUserId,
			'classify' : 's_pmkt-range',
			'values' : [ 500000, 1000000, 3000000 ],
			'date_range' : {
				'min' : stock_startdate2,
				'max' : stock_enddate2
			},
			'reveal' : 0,
			'level' : 2
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/series/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $('#stockMarketValueGrid');
				var rdata = resp;
				var td = [ {
					'name' : '50亿以下'
				}, {
					'name' : '50-100亿'
				}, {
					'name' : '100-300亿'
				}, {
					'name' : '300亿以上'
				} ];
				$.each(rdata.data, function(i, n) {
					switch (n.name) {
					case ",500000":
						td[0].data = n.data;
						break;
					case "500000,1000000":
						td[1].data = n.data;
						break;
					case "1000000,3000000":
						td[2].data = n.data;
						break;
					case "3000000,":
						td[3].data = n.data;
						break;
					}
				});
				/*initArea(dom, {
					'legend' : true,
					'date' : rdata.date,
					'series' : td
				});*/
				initArea(dom,{'date' : rdata.date,'series' : td},{
					color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
					reservations: "percent1",
					stacking: "percent",
					lineColor: "#ffffff",
					markerLineWidth: 1,
					markerRadius: 1,
					legend : {
						enabled : true
					}
				})



			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})

	}
	/**
	 * 股票资产-股票分析
	 */

	//股票资产-股票分析-估值流动性
	function stockAnalysisValuationTab() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : stock_startdate3,
				'max' : stock_enddate3
			},
			'level' : "2",
			'page' : 1,
			'row_num' : 0,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/detail/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var dom = $('#stockAnalysisValuationTab');
				var rdata = resp;
				var sd = rdata.static_date;
				initTab2(dom, rdata);
				dom.bootstrapTable('load', rdata.data);
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})

	}
	//股票资产-股票分析-持股集中度
	function stockAnalysisCentralizedTab() {
		var params = {
			'fund_id' : fundId,
			'classify' : 's_hmkt-order',
			'values' : [ 1, 2, 3, 5, 10 ],
			'date_range' : {
				'min' : null,
				'max' : null
			},
			'level' : "2",
			'reveal' : 0,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/section/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var rdata = resp;
				var ratio; //占比
				$.each(rdata.data, function(i, n) {
					radio = util.fmtRatio(n.proportion);
					switch (n.name) {
					case "f_1":
						$("#stockAnalysisCentralizedTab tr:eq(0)>td:eq(2)>div").css({
							"width" : radio
						});
						$("#stockAnalysisCentralizedTab tr:eq(0)>td:eq(1)>span").text(radio);
						break;
					case "f_2":
						$("#stockAnalysisCentralizedTab tr:eq(1)>td:eq(2)>div").css({
							"width" : radio
						});
						$("#stockAnalysisCentralizedTab tr:eq(1)>td:eq(1)>span").text(radio);
						break;
					case "f_3":
						$("#stockAnalysisCentralizedTab tr:eq(2)>td:eq(2)>div").css({
							"width" : radio
						});
						$("#stockAnalysisCentralizedTab tr:eq(2)>td:eq(1)>span").text(radio);
						break;
					case "f_5":
						$("#stockAnalysisCentralizedTab tr:eq(3)>td:eq(2)>div").css({
							"width" : radio
						});
						$("#stockAnalysisCentralizedTab tr:eq(3)>td:eq(1)>span").text(radio);
						break;
					case "f_10":
						$("#stockAnalysisCentralizedTab tr:eq(4)>td:eq(2)>div").css({
							"width" : radio
						});
						$("#stockAnalysisCentralizedTab tr:eq(4)>td:eq(1)>span").text(radio);
						break;
					default:
						layer.msg("????");
						break;
					}
				});
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})

	}

	//股票资产-股票分析-重仓股
	function stockAnalysisCentralizedGrid() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : stock_startdate3,
				'max' : stock_enddate3
			},
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/top_stocks/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					var dom = $('#stockAnalysisCentralizedGrid');
					/*initArea(dom, {
						'legend' : true,
						'date' : resp.top10.categories,
						'series' : resp.top10.series
					});*/
					initArea(dom,{'date' : resp.top10.categories,'series' : resp.top10.series},{
						color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
						reservations: "percent1",
						stacking: "percent",
						lineColor: "#ffffff",
						markerLineWidth: 1,
						markerRadius: 1,
						legend : {
							enabled : true
						}
					})
					stock_startdate3 = resp.date_range.min;
					stock_enddate3 = resp.date_range.max;
					$('.stock_date3:even').val(resp.date_range.min);
					$('.stock_date3:odd').val(resp.date_range.max);
					$('.stock_date3:even').datetimepicker('setStartDate', resp.interval.min);
					$('.stock_date3:even').datetimepicker('setEndDate', resp.interval.max);
					$('.stock_date3:odd').datetimepicker('setStartDate', resp.interval.min);
					$('.stock_date3:odd').datetimepicker('setEndDate', resp.interval.max);
				}
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}

	//股票资产-股票分析-组合风险
	function stockAnalysisPortfoliorisk() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : dateStart,
				'max' : dateEnd
			},
			'benchmark' : 'hs300', //{"hs300", "csi500", "sse50", "nfi"}
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/beta/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var rdata = resp;
				$("#stockAnalysisPortfoliorisk li .Money:eq(0)").text(rdata.data.security_exposure.toFixed(2));
				$("#stockAnalysisPortfoliorisk li .Money:eq(1)").text(rdata.data.future_exposure.toFixed(2));
				$("#stockAnalysisPortfoliorisk li .Money:eq(2)").text(rdata.data.total_exposure.toFixed(2));
				$("#stockAnalysisPortfoliorisk li .Money:eq(3)").text(rdata.data.beta.toFixed(2));
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}

	//股票资产-股票分析-置信度
	function stockAnalysisVar() {
		var params = {
			'fund_id' : fundId,
			'date_range' : {
				'min' : stock_startdate2,
				'max' : stock_enddate2
			},
			'level' : "2",
			'window_length' : [ 1, 5, 10, 20 ],
			'alpha' : [ 0.95, 0.99 ],
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/var/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var rdata = resp;
				var var_rate = rdata.var_var_rate; //表格数据
				var var_data = rdata.var_data; //柱状图数据
				//95表
				$('#95_1_1').text(var_rate[0.95][0].window_length + "日");
				$('#95_1_2').text(var_rate[0.95][0].var.toFixed(2));
				$('#95_1_3').text(util.fmtRatio(var_rate[0.95][0].var_rate));
				$('#95_2_1').text(var_rate[0.95][1].window_length + "日");
				$('#95_2_2').text(var_rate[0.95][1].var.toFixed(2));
				$('#95_2_3').text(util.fmtRatio(var_rate[0.95][1].var_rate));
				$('#95_3_1').text(var_rate[0.95][2].window_length + "日");
				$('#95_3_2').text(var_rate[0.95][2].var.toFixed(2));
				$('#95_3_3').text(util.fmtRatio(var_rate[0.95][2].var_rate));
				$('#95_4_1').text(var_rate[0.95][3].window_length + "日");
				$('#95_4_2').text(var_rate[0.95][3].var.toFixed(2));
				$('#95_4_3').text(util.fmtRatio(var_rate[0.95][3].var_rate));$('#95_1_1').text(var_rate[0.95][0].window_length + "日");
				//99表
				$('#99_1_1').text(var_rate[0.99][0].window_length + "日");
				$('#99_1_2').text(var_rate[0.99][0].var.toFixed(2));
				$('#99_1_3').text(util.fmtRatio(var_rate[0.99][0].var_rate));
				$('#99_2_1').text(var_rate[0.99][1].window_length + "日");
				$('#99_2_2').text(var_rate[0.99][1].var.toFixed(2));
				$('#99_2_3').text(util.fmtRatio(var_rate[0.99][1].var_rate));
				$('#99_3_1').text(var_rate[0.99][2].window_length + "日");
				$('#99_3_2').text(var_rate[0.99][2].var.toFixed(2));
				$('#99_3_3').text(util.fmtRatio(var_rate[0.99][2].var_rate));
				$('#99_4_1').text(var_rate[0.99][3].window_length + "日");
				$('#99_4_2').text(var_rate[0.99][3].var.toFixed(2));
				$('#99_4_3').text(util.fmtRatio(var_rate[0.99][3].var_rate));
				//图
				var var_95 = [ {
					name : 'Var',
					data : []
				} ];
				var var_99 = [ {
					name : 'Var',
					data : []
				} ];
				for (var i = 0; i < var_data[0.95].length; i++) {
					var_95[0].data.push(var_data[0.95][i][1]);
					var_99[0].data.push(var_data[0.99][i][1]);
				}
				initchart($('#stockAnalysisVarGrid1'), {'name' : '95%','series' : var_95,'categories':[ '1日', '5日', '10日', '20日' ]}, {
					'color': [ "#4FA5D6" ],
					'unit':'万元',
					'reservations' : 'fixed21',
					'chart_type' : 'column',
					legend:{}
				});
				initchart($('#stockAnalysisVarGrid2'), {'name' : '99%','series' : var_99,'categories':[ '1日', '5日', '10日', '20日' ]}, {
					'color': [ "#11CAAE" ],
					'unit':'万元',
					'reservations' : 'fixed21',
					'chart_type' : 'column',
					legend:{}
				});
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}

	//股票资产-股票分析-换手率
	function stockAnalysisChangeHands() {
		var params = {
			'fund_id' : fundId,
			'date_range' : null,
			'user_id' : useUserId
		};
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/turnover/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var rdata = resp;
				$('#calculationStarday').html(rdata.interval.min.substring(5, 7) + "月" + rdata.interval.min.substring(8, 10) + "日");
				$('#calculationendday').html(rdata.interval.max.substring(5, 7) + "月" + rdata.interval.max.substring(8, 10) + "日")
				$('#prcChangehands').text(util.fmtRatio(rdata.turnover_rate));
				$('#dayChangehands').text(util.fmtRatio(rdata.average_turnover_rate));
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//股票资产-股票分析-交易行为分析
	function stockAnalysisTransactions() {
		var params = {
			'fund_id' : fundId,
			'window_length' : [ 5, 10, 20, 30 ],
			'date_range' : {
				'min' : stock_startdate2,
				'max' : stock_enddate2
			},
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/security/tradetype/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				var rdata = resp;
				//表
				var tabStr = "<thead><tr><td>信号</td><td>5日</td><td>10日</td><td>20日</td><td>30日</td></tr></thead>"
					+ "<tbody><tr><td>买入总次数</td>"
					+ "<td>" + rdata.data.buy.b[0] + "</td>"
					+ "<td>" + rdata.data.buy.b[1] + "</td>"
					+ "<td>" + rdata.data.buy.b[2] + "</td>"
					+ "<td>" + rdata.data.buy.b[3] + "</td></tr>"
					+ "<tr><td>趋势买入次数</td>"
					+ "<td>" + rdata.data.buy.b_mo[0] + "</td>"
					+ "<td>" + rdata.data.buy.b_mo[1] + "</td>"
					+ "<td>" + rdata.data.buy.b_mo[2] + "</td>"
					+ "<td>" + rdata.data.buy.b_mo[3] + "</td></tr>"
					+ "<tr><td>反转买入次数</td>"
					+ "<td>" + rdata.data.buy.b_co[0] + "</td>"
					+ "<td>" + rdata.data.buy.b_co[1] + "</td>"
					+ "<td>" + rdata.data.buy.b_co[2] + "</td>"
					+ "<td>" + rdata.data.buy.b_co[3] + "</td></tr>"
					+ "<tr><td>卖出总次数</td>"
					+ "<td>" + rdata.data.sell.s[0] + "</td>"
					+ "<td>" + rdata.data.sell.s[1] + "</td>"
					+ "<td>" + rdata.data.sell.s[2] + "</td>"
					+ "<td>" + rdata.data.sell.s[3] + "</td></tr>"
					+ "<tr><td>趋势卖出次数</td>"
					+ "<td>" + rdata.data.sell.s_mo[0] + "</td>"
					+ "<td>" + rdata.data.sell.s_mo[1] + "</td>"
					+ "<td>" + rdata.data.sell.s_mo[2] + "</td>"
					+ "<td>" + rdata.data.sell.s_mo[3] + "</td></tr>"
					+ "<tr><td>反转卖出次数</td>"
					+ "<td>" + rdata.data.sell.s_co[0] + "</td>"
					+ "<td>" + rdata.data.sell.s_co[1] + "</td>"
					+ "<td>" + rdata.data.sell.s_co[2] + "</td>"
					+ "<td>" + rdata.data.sell.s_co[3] + "</td></tr></tbody>";
				$("#stockAnalysisTransactions").html(tabStr);
				//图
				var gdata = [ {
					'data' : [
						{
							name : '',
							data : [],
							dataLabels : {
								enabled : true
							}
						},
						{
							name : '',
							data : [],
							dataLabels : {
								enabled : true
							}
						} ],
					date : []
				},
					{
						'data' : [
							{
								name : '',
								data : [],
								dataLabels : {
									enabled : true
								}
							},
							{
								name : '',
								data : [],
								dataLabels : {
									enabled : true
								}
							} ],
						date : []
					} ];
				$.each([ rdata.data.buy, rdata.data.sell ], function(i, n) { //数据组装
					switch (i) {
					case 0:
						gdata[i].data[0].name = '趋势买入';
						gdata[i].data[0].data = n.b_mo;
						gdata[i].data[1].name = '反转买入';
						gdata[i].data[1].data = n.b_co;
						gdata[i].date = n.window_length;
						break;
					case 1:
						gdata[i].data[0].name = '趋势卖出';
						gdata[i].data[0].data = n.s_mo;
						gdata[i].data[1].name = '反转卖出';
						gdata[i].data[1].data = n.s_co;
						gdata[i].date = n.window_length;
						break;
					}
				});
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//期货资产
	function initFuture() {
		accountNet();
		accountTbl();
		accountUkashday();
		overnightRisk();
		averagePosition();
		profitPosition();
		tradingProfit();
		dataList();
		varietyAnalysis();
	}
	//期货资产-账户净值
	function accountNet() {
		var params = {
			"fund_id" : fundId,
			"date_range" : {
				'min' : futures_startdate1,
				'max' : futures_enddate1
			},
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/accumulate_return/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initNavChart(resp);
				}
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//期货资产-账户概况表格
	function accountTbl() {
		var params = {
			"fund_id" : fundId,
			"date_range" : {
				'min' : futures_startdate1,
				'max' : futures_enddate1
			},
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/static/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					$('.accountTbl td:eq(0) div:nth-child(2)').html((resp.static_data.accumulae_return).toFixed(2));
					$('.accountTbl td:eq(1) div:nth-child(2)').html((parseFloat(resp.static_data.return_risk_ratio)).toFixed(2));
					$('.accountTbl td:eq(2) div:nth-child(2)').html((parseFloat(resp.static_data.annual_std)).toFixed(2));
					$('.accountTbl td:eq(3) div:nth-child(2)').html((parseFloat(resp.static_data.downside_std)).toFixed(2));
					$('.accountTbl td:eq(4) div:nth-child(2)').html(util.fmtFixed(resp.static_data.sortino,2));
					$('.accountTbl td:eq(5) div:nth-child(2)').html((parseFloat(resp.static_data.sharp)).toFixed(2));
					$('.accountTbl td:eq(6) div:nth-child(2)').html((parseFloat(resp.static_data.max_retracement)).toFixed(2));
					$('.accountTbl td:eq(7) div:nth-child(2)').html(resp.static_data.mdd_date);
					$('.accountTbl td:eq(8) div:nth-child(2)').html(resp.static_data.mdd_formation);
					futures_startdate1 = resp.date_range.min;
					futures_enddate1 = resp.date_range.max;
					$('.futures_date1:even').val(resp.date_range.min);
					$('.futures_date1:odd').val(resp.date_range.max);
					$('.futures_date1:even').datetimepicker('setStartDate', resp.interval.min);
					$('.futures_date1:even').datetimepicker('setEndDate', resp.interval.max);
					$('.futures_date1:odd').datetimepicker('setStartDate', resp.interval.min);
					$('.futures_date1:odd').datetimepicker('setEndDate', resp.interval.max);
				}
			},
			error : function(resp) {
				console.log(resp);
				layer.msg(resp.error_log);
			}
		})
	}
	//期货资产-账户出入金
	function accountUkashday() {
		var params = {
			"fund_id" : fundId,
			"date_range" : {
				'min' : futures_startdate2,
				'max' : futures_enddate2
			},
			"freq" : accessFreq,
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/circulation/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					futures_startdate2 = resp.date_range.min;
					futures_enddate2 = resp.date_range.max;
					$('.futures_date2:even').val(resp.date_range.min);
					$('.futures_date2:odd').val(resp.date_range.max);
					$('.futures_date2:even').datetimepicker('setStartDate', resp.interval.min);
					$('.futures_date2:even').datetimepicker('setEndDate', resp.interval.max);
					$('.futures_date2:odd').datetimepicker('setStartDate', resp.interval.min);
					$('.futures_date2:odd').datetimepicker('setEndDate', resp.interval.max);
					if (accessFreq == 'd') {
						var columnDate = {
							name : resp.graphic.series[0].name + "(万元)",
							type : 'column',
							data : resp.graphic.series[0].data,
						}
						var splineDate = {
							name : resp.graphic.series[1].name + "(万元)",
							type : 'spline',
							data : resp.graphic.series[1].data,
							yAxis : 1,
						}
						initmixed($('#ukashDaychart'), {
							categories : resp.graphic.categories,
							series : [ columnDate, splineDate ],
							color : [ "#175FC8", "#4FA5D6" ]
						});
						initUkashtbl($('#ukashDaytbl'), resp.cash_detail);
					} else {
						var columnDate = {
							name : resp.graphic.series[0].name + "(万元)",
							type : 'column',
							data : resp.graphic.series[0].data,
						}
						var splineDate = {
							name : resp.graphic.series[1].name + "(万元)",
							type : 'spline',
							data : resp.graphic.series[1].data,
							yAxis : 1,
						}
						initmixed($('#ukashMonthchart'), {
							categories : resp.graphic.categories,
							series : [ columnDate, splineDate ],
							color : [ "#175FC8", "#4FA5D6" ]
						});
						initUkashtbl($('#ukashMonthtbl'), resp.cash_detail);
						$('#ukashMonthtbl').bootstrapTable('load', resp.cash_detail);
					}
				}
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//期货资产-隔夜风险
	function overnightRisk() {
		var params = {
			"fund_id" : fundId,
			"date_range" : {
				'min' : futures_startdate3,
				'max' : futures_enddate3
			},
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/overnight_risk/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#overnightRiskchart'), resp.return_data, {
						'color':  [ "#E63568" ],
						'reservations' : 'percent',
						'chart_type' : 'line',
						'x_tickmarkPlacement':'on',
						'columnPointWidth':"20",
						legend : {
							enabled : true, 
							layout : 'horizontal', 
							align : 'center', 
							verticalAlign : 'bottom', 
						}
					});
					futures_startdate3 = resp.date_range.min;
					futures_enddate3 = resp.date_range.max;
					$('.futures_date3:even').val(resp.date_range.min);
					$('.futures_date3:odd').val(resp.date_range.max);
					$('.futures_date3:even').datetimepicker('setStartDate', resp.interval.min);
					$('.futures_date3:even').datetimepicker('setEndDate', resp.interval.max);
					$('.futures_date3:odd').datetimepicker('setStartDate', resp.interval.min);
					$('.futures_date3:odd').datetimepicker('setEndDate', resp.interval.max);
				}
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//头寸分析
	function averagePosition() {
		var params = {
			"fund_id" : fundId,
			"date_range" : {
				'min' : futures_startdate4,
				'max' : futures_enddate4
			},
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/average/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					var onClickRow = function(row, element, field) {
						var r = [];
						$.each(resp.sub_type_data.data, function(i, n) {
							if (n.S == row.row_name)
								r.push(resp.sub_type_data.data[i]);
						});
						var r_clazz = element.data('index');
						if (!element.siblings().hasClass(r_clazz)) { //是否存在该展开
							var nRowStr = "";
							$.each(r, function(i, n) {
								nRowStr += "<tr class=" + r_clazz + ">" +
									"<td><i class = 'glyphicon glyphicon-menu-right'></i>" + n.row_name + "</td>" +
									"<td>" + util.fmtFixed(n.S, 2) + "</td>" +
									"<td>" + util.fmtFixed(n.N, 2) + "</td>" +
									"<td>" + util.fmtFixed(n.B, 2) + "</td></tr>";
							});
							element.after(nRowStr);
						} else {
							element.parent().find("." + r_clazz).remove();
						}
					}
					initchart($('#PositionsChart'), resp.aver_pos, {
						'color': [ "#F75F52" ],
						'yTitle':'单位（万元）',
						'unit':'万元',
						'reservations' : 'fixed21',
						'chart_type' : 'column',
						'columnPointWidth':20,
						legend : {
							enabled : true
						}
					});
					initPositionstbl($("#PositionsTbl"), {
						'data' : resp.detail_data,
						'onClickRow' : onClickRow
					});
					$('#PositionsTbl').bootstrapTable('load', resp.detail_data);
					futures_startdate4 = resp.date_range.min;
					futures_enddate4 = resp.date_range.max;
					$('.futures_date4:even').val(resp.date_range.min);
					$('.futures_date4:odd').val(resp.date_range.max);
					$('.futures_date4:even').datetimepicker('setStartDate', resp.interval.min);
					$('.futures_date4:even').datetimepicker('setEndDate', resp.interval.max);
					$('.futures_date4:odd').datetimepicker('setStartDate', resp.interval.min);
					$('.futures_date4:odd').datetimepicker('setEndDate', resp.interval.max);
				}
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//盈亏分析
	function profitPosition() {
		var params = {
			"fund_id" : fundId,
			"date_range" : null,
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/realized_pl_amounts/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initTab5($('#profitTbl1'), resp.table_data);
				$('#profitTbl1').bootstrapTable('load', resp.table_data);
				initchart($('#profitchart1'), resp.trading_direction, {
					'color': [ "#1A9BFC" ],
					'yTitle':'单位（万元）',
					'unit':'万元',
					'reservations' : 'fixed21',
					'columnPointWidth':"20",
					'chart_type' : 'column',
					legend : {
						enabled : true, 
						layout : 'horizontal', 
						align : 'center', 
						verticalAlign : 'bottom', 
					}
				});
				initchart($('#profitchart2'), resp.trading_type, {
					'color': [ "#00CCCC" ],
					'yTitle':'单位（万元）',
					'unit':'万元',
					'reservations' : 'fixed21',
					'chart_type' : 'column',
					'columnPointWidth':"20",
					legend : {
						enabled : true, 
						layout : 'horizontal', 
						align : 'center', 
						verticalAlign : 'bottom', 
					}
				});
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//交易盈亏
	function tradingProfit() {
		var params = {
			"fund_id" : fundId,
			"date_range" : null,
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/realized_pl_times/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				initTab6($('#profitTbl2'), resp.table_data);
				$('#profitTbl2').bootstrapTable('load', resp.table_data);
				var hands = [ {
					name : "交易盈亏比",
					data : [ [ '盈利手数', resp.graphic_pl.hands.p ], {
						name : '亏损手数',
						y : resp.graphic_pl.hands.l,
						sliced : true,
						selected : true
					} ]
				} ];
				var times = [ {
					name : "交易盈亏比",
					data : [ [ '盈利次数', resp.graphic_pl.times.p ], {
						name : '亏损次数',
						y : resp.graphic_pl.times.l,
						sliced : true,
						selected : true
					} ]
				} ];
				initPie($('#pieChart1'), {
					title : '按交易手数统计盈亏比',
					series : hands
				});
				initPie($('#pieChart2'), {
					title : '按交易次数统计盈亏比',
					series : times
				});
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//数据列表
	function dataList() {
		var params = {
			"fund_id" : fundId,
			"date_range" : null,
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/data_table/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					var onClickRow = function(row, element, field) {
						var r = [];
						$.each(resp.sub_data.data, function(i, n) {
							if (n.sub_type_of == row.row_name)
								r.push(resp.sub_data.data[i]);
						});
						var r_clazz = element.data('index');
						if (!element.siblings().hasClass(r_clazz)) { //是否存在该展开
							var nRowStr = "";
							$.each(r, function(i, n) {
								nRowStr += "<tr class=" + r_clazz + ">" +
									"<td><i class = 'glyphicon glyphicon-menu-right'></i>" + n.row_name + "</td>" +
									"<td>" + util.fmtFixed(n.totoal, 2) + "</td>" +
									"<td>" + util.fmtFixed(n.b, 2) + "</td>" +
									"<td>" + util.fmtFixed(n.s, 2) + "</td></tr>";
							});
							element.after(nRowStr);
						} else {
							element.parent().find("." + r_clazz).remove();
						}
					}
					initTab7($('#datalistTbl'), {
						'data' : resp.data,
						'onClickRow' : onClickRow
					});
					$('#datalistTbl').bootstrapTable('load', resp.data);
				}
			},
			error : function(resp) {
				var r = resp.responseJSON;
				layer.msg(r.error_log);
			}
		})
	}
	//品种分析
	function varietyAnalysis() {
		var params = {
			"fund_id" : fundId,
			"date_range" : null,
			'user_id' : useUserId
		}
		$.ajax({
			url : apiPath + '/api/v1/self_management/position/future/variety/',
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initchart($('#varietyDay'), resp.inday.pl, {
						'color': [ "#F75F52" ],
						'yTitle':'单位（万元）',
						'unit':'万元',
						'reservations' : 'fixed21',
						'chart_type' : 'column',
						'columnPointWidth':20,
						legend : {
							enabled : true
						}
					});
					initchart($('#varietyNight'), resp.overnight.pl, {
						'color': [ "#F75F52" ],
						'yTitle':'单位（万元）',
						'unit':'万元',
						'reservations' : 'fixed21',
						'chart_type' : 'column',
						'columnPointWidth':20,
						legend : {
							enabled : true
						}
					});
					initpie2($('#varietyroundDay'), resp.inday.trade_times);
					initpie2($('#varietyroundNight'), resp.overnight.trade_times);
					initVarietytbl($('#VarietyDaytbl'), resp.inday.table);
					initVarietytbl($('#VarietyNighttbl'), resp.overnight.table);
					$('#VarietyDaytbl').bootstrapTable('load', resp.inday.table);
					$('#VarietyNighttbl').bootstrapTable('load', resp.overnight.table);
				}
			},
			error : function(resp) {
				console.log(resp);
			}
		})
	}
    /**
     * 股票资产-债券分析
     */
    function initBonds(){
        couponSpecies();
        ratingAnalysis();
	}
	//券种分析
    function couponSpecies(){
        var params = {
            "fund_id" : fundId,
            "date_range" : {max:bondEnddate1,min:bondStartdate1},
            'user_id' : useUserId
        }
        $.ajax({
            url : apiPath + '/api/v1/self_management/position/bond/classify_analysis/',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.succeed) {
                    couponStaticdate = resp.section_data.static_date;
                    var tableData = [];
                    for(var i = 0;i<resp.section_data.data.length;i++){
                        tableData.push(resp.section_data.data[i]);
                    }
                    if(bondDatastate1==0){
						bondStartdate1 = resp.series_data.interval.min;
						bondEnddate1 = resp.series_data.interval.max;
                    }
                    $('.bondsDate1:even').val(resp.series_data.interval.min);
                    $('.bondsDate1:odd').val(resp.series_data.interval.max);
                    $('.bondsDate1:even').datetimepicker('setStartDate', resp.series_data.interval.min);
                    $('.bondsDate1:even').datetimepicker('setEndDate', resp.series_data.interval.max);
                    $('.bondsDate1:odd').datetimepicker('setStartDate', resp.series_data.interval.min);
                    $('.bondsDate1:odd').datetimepicker('setEndDate', resp.series_data.interval.max);
                    //展开行
                    var onClickRow = function(row, element, field) {
                        var r = resp.section_data.sub_type_data;
                        element.find('i').attr("class","glyphicon glyphicon-menu-down");
                        var r_clazz = element.data('index');
                        if (!element.siblings().hasClass(r_clazz)) { //是否存在该展开
                            var nRowStr = "";
                            $.each(r[row.name], function(i, n) {
                                nRowStr += "<tr class=" + r_clazz + " >" +
                                    "<td style='font-weight:500;font-size: 14px;'>" + n.name + "</td>" +
                                    "<td>" + util.fmtFixed(n.full_market_price/10000, 2) + "</td>" +
                                    "<td>" + util.fmtRatio(n.proportion) + "</td>" +
                                    "<td>" + util.fmtRatio(n.slope) + "</td></tr>";
                            });
                            element.after(nRowStr);
                        } else {
                            element.parent().find("." + r_clazz).remove();
                            element.find('i').attr("class","glyphicon glyphicon-menu-right");
            
                        }
                    }
                    initTab($('#couponSpeciesTbl'),{data:tableData,'onClickRow':onClickRow,series:[
                    {
                    	field:'name',
                        title : "债券资产",
                        sortable : false,
                        width : 300,
                        align : 'center',
                        valign : 'middle',
                        formatter : function(val) {
                            return "<div class='outerDiv hand' style='text-align:left;'><div class='wP45'><i class='glyphicon glyphicon-menu-right'></i></div>"+val+"</div>";
                        }
                    },
                    {
						field:'full_market_price',
						title : "金额（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter:function(val){
							return util.fmtFixed(val / 10000,2)
						}
                    },
                    {
						field:'proportion',
						title : "占资产比例（%）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter:function(val){
							return util.fmtRatio(val)
						}
                    },
                    {
						field:'slope',
						title : "期间变化",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle'
                    },
                    ]
                    });
                    initArea($('#couponSpeciesChart'),{'date' : resp.series_data.date,'series' : resp.series_data.data},{
                        color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
                        reservations: "percent1",
                        stacking: "percent",
                        lineColor: "#ffffff",
                        markerLineWidth: 1,
                        markerRadius: 1,
                        legend : {
                            enabled : true
                        }
                    })
                    couponAnalysis();
                    interestAnalysis();
                    concentrationDegree();
                }else{
                    couponAnalysis();
                    interestAnalysis();
                    concentrationDegree();
                    $('#couponSpeciesChart').html("<div style='text-align: center;'>暂无数据</div>");
                    $('#couponSpeciesTbl').css("display","none")
				}
            },
            error : function(resp) {
                couponAnalysis();
                interestAnalysis();
                concentrationDegree();
                $('#couponSpeciesChart').html("<div style='text-align: center;'>暂无数据</div>");
                $('#couponSpeciesTbl').css("display","none")
            }
        })
	}
	//期限分析
	function couponAnalysis(){
        var params = {
            "fund_id" : fundId,
            "statistic_date" : couponStaticdate,//因为这个统计日期是券种分析返回来的数据。所以等券种分析请求成功之后再运行此函数。
            'user_id' : useUserId
        }
        $.ajax({
            url : apiPath + '/api/v1/self_management/position/bond/deadline_analysis/',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.succeed) {
                		var pieData = [];
                		pieData.push({innerSize: '90%',name:"资产占比",data:[[resp.data.proportion.series[0].name,resp.data.proportion.series[0].data[0]]]});
                        bondPie($('#termPie'),{title:"<br><br>期末券种",series:pieData});
                }else{
                    $('#termPie').html("<div style='text-align: center;'>暂无数据</div>");
				}
            },
            error : function(resp) {
                $('#termPie').html("<div style='text-align: center;'>暂无数据</div>");
            }
        })
	}
    //利息分析
    function interestAnalysis(){
        var params = {
            "fund_id" : fundId,
            "statistic_date" : couponStaticdate,//因为这个统计日期是券种分析返回来的数据。所以等券种分析请求成功之后再运行此函数。
            'user_id' : useUserId
        }
        $.ajax({
            url : apiPath + '/api/v1/self_management/position/bond/interest_analysis/',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.succeed) {
                    var pieData = [];
                    pieData.push({innerSize: '90%',name:"资产占比",data:[[resp.data.proportion.series[0].name,resp.data.proportion.series[0].data[0]]]});
                    bondPie($('#interestPie'),{title:"<br><br>期末券种",series:pieData});
                }else{
					$('#interestPie').html("<div style='text-align: center;margin-top:20%;'>暂无数据</div>");
				}
            },
            error : function(resp) {
                	$('#interestPie').html("<div style='text-align: center;margin-top:20%;'>暂无数据</div>");
            }
        })
    }
    //评级分析
	function ratingAnalysis(){
        var params = {
            "fund_id" : fundId,
            "date_range" : {max:bondEnddate2,min:bondStartdate2},
            'user_id' : useUserId
        }
        $.ajax({
            url : apiPath + '/api/v1/self_management/position/bond/rating_analysis/',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.succeed) {
                    couponStaticdate = resp.section_data.static_date;
                    var tableData = [];
                    for(var i = 0;i<resp.section_data.data.length;i++){
                        tableData.push(resp.section_data.data[i]);
                    }
                    if(bondDatastate2==0){
                        bondStartdate2 = resp.series_data.interval.min;
                        bondEnddate2 = resp.series_data.interval.max;
					}
                    $('.bondsDate2:even').val(resp.date_range.min);
                    $('.bondsDate2:odd').val(resp.date_range.max);
                    $('.bondsDate2:even').datetimepicker('setStartDate', resp.series_data.interval.min);
                    $('.bondsDate2:even').datetimepicker('setEndDate', resp.series_data.interval.max);
                    $('.bondsDate2:odd').datetimepicker('setStartDate', resp.series_data.interval.min);
                    $('.bondsDate2:odd').datetimepicker('setEndDate', resp.series_data.interval.max);
                    //展开行
                    var onClickRow = function(row, element, field) {
                        var r = resp.section_data.sub_type_data;
                        element.find('i').attr("class","glyphicon glyphicon-menu-down");
                        var r_clazz = element.data('index');
                        if (!element.siblings().hasClass(r_clazz)) { //是否存在该展开
                            var nRowStr = "";
                            $.each(r[row.name], function(i, n) {
                                nRowStr += "<tr class=" + r_clazz + " >" +
                                    "<td style='font-weight:500;font-size: 14px;'>" + n.name + "</td>" +
                                    "<td>" + util.fmtFixed(n.full_market_price/10000, 2) + "</td>" +
                                    "<td>" + util.fmtRatio(n.proportion) + "</td>" +
                                    "<td>" + util.fmtRatio(n.slope) + "</td></tr>";
                            });
                            element.after(nRowStr);
                        } else {
                            element.parent().find("." + r_clazz).remove();
                            element.find('i').attr("class","glyphicon glyphicon-menu-right");
            
                        }
                    }
                    initTab($('#ratingAnalysistbl'),{data:tableData,'onClickRow':onClickRow,series:[
                        {
                            field:'name',
                            title : "信用等级",
                            sortable : false,
                            width : 300,
                            align : 'center',
                            valign : 'middle',
                            formatter : function(val) {
                                return "<div class='outerDiv hand' style='text-align:left;'><div class='wP45'><i class='glyphicon glyphicon-menu-right'></i></div>"+val+"</div>";
                            }
                        },
                        {
                            field:'full_market_price',
                            title : "金额（万元）",
                            sortable : false,
                            width : 300,
                            align : 'center',
                            valign : 'middle',
                            formatter:function(val){
                                return util.fmtFixed(val/10000,2)
                            }
                        },
                        {
                            field:'proportion',
                            title : "占资产比例（%）",
                            sortable : false,
                            width : 300,
                            align : 'center',
                            valign : 'middle',
                            formatter:function(val){
                                return util.fmtRatio(val)
                            }
                        },
                        {
                            field:'slope',
                            title : "期间变化",
                            sortable : false,
                            width : 300,
                            align : 'center',
                            valign : 'middle'
                        },
                    ]
                    });
                    initArea($('#ratingCharts'),{'date' : resp.series_data.date,'series' : resp.series_data.data},{
                        color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
                        reservations: "percent1",
                        stacking: "percent",
                        lineColor: "#ffffff",
                        markerLineWidth: 1,
                        markerRadius: 1,
                        legend : {
                            enabled : true
                    	    }
                    })
                }else{
                    $('#ratingCharts').html("<div style='text-align: center;'>暂无数据</div>");
                    $('#ratingAnalysistbl').css("display","none");
				}
            },
            error : function(resp) {
                $('#ratingCharts').html("<div style='text-align: center;'>暂无数据</div>");
                $('#ratingAnalysistbl').css("display","none");
            }
        })
	}
	//集中度分析
	function concentrationDegree(){
        var params = {
            "fund_id" : fundId,
            "statistic_date" : couponStaticdate,//因为这个统计日期是券种分析返回来的数据。所以等券种分析请求成功之后再运行此函数。
            'user_id' : useUserId
        }
        $.ajax({
            url : apiPath + '/api/v1/self_management/position/bond/concentration_analysis/',
            type : 'post',
            contentType : "application/json;charset=utf-8",
            data : JSON.stringify(params),
            success : function(resp) {
                if (resp.succeed) {
                    var count = 0;
                    var content = "";
                    for(var i = 0;i<resp.data.proportion.series.length;i++){//第一次遍历获取到所有的值。
                    	count += resp.data.proportion.series[i].data[0]
                    }
                    //第二次遍历是渲染。
                    var insideLastpercent = 0;
                    for(var i = 0;i<resp.data.proportion.series.length;i++){
						if(i!==resp.data.proportion.series.length-1){
                            var percent = util.fmtFixed(resp.data.proportion.series[i].data[0] / count,4);
                            insideLastpercent+=parseFloat(util.fmtFixed(percent,4));
                            content+="<tr><td>"+resp.data.proportion.series[i].name+"</td><td>"+util.fmtRatio(percent)+"</td><td><div style='width:"+util.fmtFixed(percent*100,1)+"%'></div></td></tr>"
						}else{
							var last = 1 - parseFloat(util.fmtFixed(insideLastpercent,4));
                            content+="<tr><td>"+resp.data.proportion.series[i].name+"</td><td>"+util.fmtRatio(last)+"</td><td><div style='width:"+util.fmtFixed(last*100)+"%'></div></td></tr>"
						}

                    }
                    $('#bondCentralized').html(content);
                }else{
                	$('#bondCentralized').html("<div style='text-align: center;'>暂无数据</div>");
				}
            },
            error : function(resp) {
                $('#bondCentralized').html("<div style='text-align: center;'>暂无数据</div>");
            }
        })
	}
    //日期格式转换
	function dateFmt(str, symbol) {
		if (symbol == 'CN')
			return str.substring(0, 4) + "年" + str.substring(4, 6) + "月" + str.substring(6, 8) + "日";
		return str.substring(0, 4) + symbol + str.substring(4, 6) + symbol + str.substring(6, 8);
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
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'e_asset',
					title : resp.columns.e_asset,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
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
						if (val > 0) {
							return "<span class='red'>" + util.fmtFixed(val, 2) + "</span>";
						} else {
							return "<span class='green'>" + util.fmtFixed(val, 2) + "</span>";
						}
					}
				},
				{
					field : 's_nav',
					title : resp.columns.s_nav,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						if (val >= 1) {
							return "<span class='red'>" + util.fmtFixed(val, 4) + "</span>";
						} else {
							return "<span class='green'>" + util.fmtFixed(val, 4) + "</span>";
						}
					}
				},
				{
					field : 'e_nav',
					title : resp.columns.e_nav,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						if (val >= 1) {
							return "<span class='red'>" + util.fmtFixed(val, 4) + "</span>";
						} else {
							return "<span class='green'>" + util.fmtFixed(val, 4) + "</span>";
						}
					}
				},
				{
					field : 'income',
					title : resp.columns.income,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						if (val > 0) {
							return "<span class='red'>" + util.fmtRatio(val) + "</span>";
						} else {
							return "<span class='green'>" + util.fmtRatio(val) + "</span>";
						}
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
	//策略表格
	function initstrategyTab(dom, resp) {
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
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'e_asset',
					title : resp.columns.e_asset,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
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
						return util.fmtFixed(val, 2);
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
	//初始化表格
	function initTab(dom, resp) {
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
			columns : resp.series,
            onClickRow : resp.onClickRow,
		});
	}
	//初始化表格1
	function initTab1(dom, resp) {
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
				{
					field : 'name',
					title : '资产账户',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'asset',
					title : '资产净值（万元）',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'proportion',
					title : '占资产比例',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'slope',
					title : '占比区间变化',
					sortable : false,
					width : 300,
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
	//初始化表格2
	function initTab2(dom, resp) {
		dom.bootstrapTable({
			striped : true,
			sidePagination : 'client',
			cache : false,
			data : resp.data,
			pagination : true,
			pageNumber : 1,
			pageSize : 10,
			search : false,
			undefinedText : '--',
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			columns : [
				{
					field : 'stock_code',
					title : '股票代码',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'stock_name',
					title : '股票名称',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'proportion',
					title : '持仓比例',
					sortable : true,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'asset',
					title : '持仓市值(万元)',
					sortable : true,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'PE',
					title : 'PE',
					sortable : true,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 0);
					}
				},
				{
					field : 'pcir',
					title : '持股占流通股比',
					sortable : true,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				}
			]
		});

	}
	//初始化表格3
	function initTab3(dom, resp) {
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
					field : 'name',
					title : '市值',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',formatter : function(val) {
						return "<div class='outerDiv' style='text-align:left;'><div class='wP45'><i class='glyphicon glyphicon-menu-right'></i></div>"+val+"</div>";
					}
				},
				{
					field : 'asset',
					title : '资产净值（万元）',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'proportion',
					title : '占资产比例',
					sortable : true,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'slope',
					title : '占比区间变化',
					sortable : true,
					width : 300,
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
	//初始化表格4
	function initTab4(dom, resp) {
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
					field : 'name',
					title : '行业类别',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return "<div class='outerDiv' style='text-align:left;'><div class='wP45'><i class='glyphicon glyphicon-menu-right'></i></div>"+val+"</div>";
					}
				},
				{
					field : 'asset',
					title : '资产净值（万元）',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'proportion',
					title : '占资产比例',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'slope',
					title : '占比区间变化',
					sortable : false,
					width : 300,
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
	//初始化表格5
	function initTab5(dom, resp) {
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
				{
					field : 'row_ame',
					title : ' ',
					sortable : false,
					width : 300,
					align : 'left',
					valign : 'middle'
				},
				{
					field : 'total',
					title : '全部交易（万元）',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'bull',
					title : '多头交易（万元）',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'bear',
					title : '空头交易（万元）',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.SecondLevel
		});
	}
	//初始化表格6
	function initTab6(dom, resp) {
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
				{
					field : 'row_ame',
					title : ' ',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'hands_total',
					title : '实际交易',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'hands_profit',
					title : '盈利',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'hands_loss',
					title : '亏损',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'hands_plag.Helper._ratio',
					title : '盈亏比',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'hands_profit_average',
					title : '平均盈利(万元)',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'hands_loss_average',
					title : '平均亏损(万元)',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'hands_pl_averageag.Helper._ratio',
					title : '平均盈亏比',
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				}
			],
		});
	}
	//初始化表格7
	function initTab7(dom, resp) {
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
					title : "统计指标",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'totoal',
					title : "全部交易",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'inday',
					title : "多头交易",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'overnight',
					title : "空头交易",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.SecondLevel
		});
	}
	//初始化表格，持仓账户出入金表格
	function initUkashtbl(dom, resp) {
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
				[
					{
						field : 'row_name',
						rowspan : 2,
						title : '时间',
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle'
					},
					{
						colspan : 5,
						title : '资金情况',
						align : 'center'
					},
					{
						colspan : 3,
						title : '收益情况',
						align : 'center'
					}
				],
				[
					{
						field : 'balance_bf',
						title : resp.columns.balance_bf + "（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtFixed(val / 10000.0, 2);
						}
					},
					{
						field : 'deposit',
						title : resp.columns.deposit + "（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtFixed(val / 10000.0, 2);
						}
					},
					{
						field : 'withdrawal',
						title : resp.columns.withdrawal + "（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtFixed(val / 10000.0, 2);
						}
					},
					{
						field : 'deposit_withdrawal',
						title : resp.columns.deposit_withdrawal + "（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtFixed(val / 10000.0, 2);
						}
					},
					{
						field : 'balance_cf',
						title : resp.columns.balance_cf + "（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtFixed(val / 10000.0, 2);
						}
					},
					{
						field : 'realized_pl',
						title : resp.columns.realized_pl + "（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtFixed(val / 10000.0, 2);
						}
					},
					{
						field : 'accumulate_realized_pl',
						title : resp.columns.accumulate_realized_pl + "（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtFixed(val / 10000.0, 2);
						}
					},
					{
						field : 'mtm_pl',
						title : resp.columns.mtm_pl + "（万元）",
						sortable : false,
						width : 300,
						align : 'center',
						valign : 'middle',
						formatter : function(val) {
							return util.fmtFixed(val / 10000.0, 2);
						}
					} ]
			]
		});
	}
	//初始化表格，头寸分析表格
	function initPositionstbl(dom, resp) {
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
					title : resp.data.columns.row_name,
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'N',
					title : resp.data.columns.N + "（万元）",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'S',
					title : resp.data.columns.S + "（万元）",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'B',
					title : resp.data.columns.B + "（万元）",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				}
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.SecondLevel
		});
	}
	//初始化表格，品种分析表格
	function initVarietytbl(dom, resp) {
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
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'lots',
					title : resp.columns.lots,
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'gain',
					title : resp.columns.gain + "（万元）",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'loss',
					title : resp.columns.loss + "（万元）",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'revenue',
					title : resp.columns.revenue + "（万元）",
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
				{
					field : 'percentage',
					title : resp.columns.percentage,
					sortable : false,
					width : 300,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 2);
					}
				},
			]
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
	//初始化饼图2
	function initpie2(dom, resp) {
		var data = [];
		for (var i = 0; i < resp.categories.length; i++) {
			data.push([ resp.categories[i], resp.series[0].data[i] ]);
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
				text : ' ',
				align : "center"
			},
			colors : [ "#70D9CD", "#86CAFF", "#F91E6D", "#FE594B" ],
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
	function initPie(dom, resp) {
		$(function() {
			dom.highcharts({
				chart : {
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false,
					type : 'pie'
				},
				title : {
					float:true,
					text : resp.title
				},
				colors : [ "#0686D8", "#F75F52" ],
				tooltip : {
					headerFormat : '{series.name}<br>',
					pointFormat : '{point.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions : {
					pie : {
						allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : false
						},
						showInLegend : true
					}
				},
				credits : {
					enabled : false //不显示highcharts链接
				},
				exporting : {
					enabled : false //设置导出按钮不可用
				},
				series : resp.series
			});
		});

	}
	//债券饼图
	function bondPie(dom,resp){
        $(function () {
            dom.highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    spacing : [100, 0 , 40, 0],
                    type : 'pie',
                },
                title: {
                    text: resp.title,
                    align:"center",
                    verticalAlign:"top"
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        // point: {
                        //     events: {
                        //         mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                        //             // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                        //             chart.setTitle({
                        //                 text: e.target.name+ '\t'+ e.target.y + ' %'
                        //             });
                        //         }
                        //     }
                        // },
                    }
                },
                credits : {
                    enabled : false //不显示highcharts链接
                },
                exporting : {
                    enabled : false //设置导出按钮不可用
                },
				series: resp.series
            }, function(c) {
                // 环形图圆心
                var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                c.setTitle({
                    y:centerY + titleHeight/2
                });
                chart = c;
            });
        });
	}
	//期货混合图
	function initmixed(dom, data) {
		$(function() {
			dom.highcharts({
				chart : {
					zoomType : 'xy'
				},
				title : {
					text : ' '
				},
				subtitle : {
					text : ' '
				},
				colors : data.color,
				xAxis : [ {
					categories : data.categories,
					crosshair : true
				} ],
				yAxis : [ { // Primary yAxis
					labels : {
						formatter : function() {
							return util.fmtFixed(this.value / 10000, 0);
						},
						style : {
							color : Highcharts.getOptions().colors[1]
						}
					},
					title : {
						text : ' ',
						style : {
							color : Highcharts.getOptions().colors[1]
						}
					}
				}, { // Secondary yAxis
					title : {
						text : ' ',
						style : {
							color : Highcharts.getOptions().colors[0]
						}
					},
					labels : {
						formatter : function() {
							return util.fmtFixed(this.value / 10000, 0);
						},
						style : {
							color : Highcharts.getOptions().colors[0]
						}
					},
					opposite : true
				} ],
				tooltip : {
					pointFormatter : function() {
						return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + util.fmtFixed(this.y / 10000, 2) + '</b> <br/>';
					},
					shared : true
				},
				plotOptions : {
					series : {
						marker : {
							radius : 1, //曲线点半径，默认是4
						}
					}
				},
				credits : {
					enabled : false //不显示highcharts链接
				},
				series : data.series
			});
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
	function initNavChart(datas) {
		var data = datas.data;
		var dataInfo = new Array();
		for (var i = 0; i < data.categories.length; i++) {
			var date = data.categories[i][0]
			for (var j = 0; j < data.series[data.categories[i][0]].length; j++) {
				var date = data.series[data.categories[i][0]][j][0];
				data.series[data.categories[i][0]][j][0] = Date.UTC(date.substring(0, 4), parseInt(date.substring(5, 7) - 1), date.substring(8, 10));
			//					if(data.series[data.categories[i][0]][j][0]=="-"){
			//						delete data[series[data.categories[i][0]]][j][0];
			//					}
			}
			if (i != 0 && i != 1 && i != 5) {
				dataInfo.push({
					"name" : data.categories[i][1],
					"visible" : false,
					"data" : data.series[data.categories[i][0]]
				});
			} else {
				dataInfo.push({
					"name" : data.categories[i][1],
					"data" : data.series[data.categories[i][0]]
				});
			}
		}
		try {
			$('#futures_account_net_chart').highcharts({
				chart : {
					type : 'line',
					zoomType : 'x',
				},
				colors : [ '#1e71fa', '#e44e73', '#24cdfa', '#abe5a4', '#e5f1a4', '#81daea' ],
				"title" : {
					"text" : ''
				},
				xAxis : {
					type : 'datetime',
					dateTimeLabelFormats : {
						day : '%m-%d',
						week : '%m-%d',
						month : '%Y-%m',
						year : '%Y'
					}
				},
				tooltip : {
					dateTimeLabelFormats : {
						day : '%Y-%m-%d',
						week : '%m-%d',
						month : '%Y-%m',
						year : '%Y'
					},
					shared : true,
					animation : true,
					pointFormatter : function() {
						return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + util.fmtRatio(this.y) + '</b> <br/>';
					},
				},
				yAxis : {
					labels : {
						formatter : function() {
							return util.fmtRatio(this.value);
						}
					},
					title : {
						text : ' '
					}
				},
				legend : {
					enabled : true
				},
				plotOptions : {
					area : {
						fillColor : {
							linearGradient : {
								x1 : 0,
								y1 : 0,
								x2 : 0,
								y2 : 1
							},
							stops : [
								[ 0, Highcharts.getOptions().colors[0] ],
								[ 1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba') ]
							]
						},
						marker : {
							radius : 2
						},
						lineWidth : 1,
						states : {
							hover : {
								lineWidth : 1
							}
						},
						threshold : null
					},

					series : {
						marker : {
							radius : 1, //曲线点半径，默认是4
						}
					}
				},
				credits : {
					enabled : false //不显示highcharts链接
				},
				series : dataInfo
			});
		} catch (e) {
			$('#netCharts').show();
		}
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
	exports.init = _init;
})