/**
 * 组合配置-策略组合.js
 */

define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	var util = require('util');
	require('layer');
	require('bootstrap_table_zh');
	require('move');
	require('header');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('modernizr');
	require('progressBar');
	require("highcharts_zh_CN");
	require("highchartmap");
	var selectFunds = require('base/selectFunds');
	//变量区域
	var indexId = [];
	var indexName = [];
	var indexName_i=[];
	var weight_i=[];
	var pre_investmentAmountinp=[];
	var toopIndex="";
	var dynamic_startDate = null;
	var dynamic_endDate = null;
	var fullSample_startDate = null;
	var fullSample_endDate = null;
	var step1Benchmark = [];
	var step1Model;
	var params;
	$(function() {
		init();
	})

	function init() {
		initConfig();
		initEvent();
		choiceStrategy();
	}

	//初始化配置
	function initConfig() {
	}

	//初始化事件
	function initEvent() {
		$('.dateInp').datetimepicker({ //日期选择
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
		//表格复选框选中
		$('.checkboxBtn').click(function() {
			$(this).toggleClass('checkboxActive');
			choiceStrategy();
		});
		//全样本区间选择日期
		$('.allranges').on('change', function() {
			$('#externalSample').prop('checked', true);
			$('input[name="start_date"]').val($('#fullsample_startDate').val());
			$('input[name="end_date"]').val($('#fullsample_endDate').val());
		});
		//内样本区间选择日期
		$('.Insidesample').on('change', function() {
			$('#insideSample').prop('checked', true);
		});
		//检查重名
		$('#newPrcname').blur(function() {
			var data = {
				"portfolio_name" : $('#newPrcname').val(),
				"user_id" : useUserId,
			}
			$.ajax({
				url : apiPath + "/api/v1/portfolio/check_name/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(data),
				success : function(resp) {
					if (!resp.succeed) {
						layer.msg("组合名称重复，请更改。");
						$('#newPrcname').focus();
					}
				},
				error : function(resp) {
					var r = eval('(' + resp.error_info + ')');
					layer.msg(r);
				}
			});
		})
		//风险评价模型
		$('#rp').click(function(){
			$('#riskAdjust').fadeIn();
		})
		//选中全样本区间
		$('input:radio[name="Sample"]').click(function(){			
			if($(this).attr('id')=="externalSample"){
				$('#riskAdjust').css("visibility","visible");
				$('#riskDiv').css("display","block")
			}else{
				$('#riskAdjust').css("visibility","hidden");
				$('#riskDiv').css("display","none")
			}			
		})
		//显示调仓周期
		$('input:radio[name="condition"]').click(function(){
			if($(this).attr("id")!="rp"){
				$('#riskAdjust').css('display','none')
			}else{
				$('#riskAdjust').css('display','block');
			}
		})
		//选中调仓。
		$('input:radio[name="adjustPer"]').click(function(){			
					$('#adjustLength').fadeIn(200);
					$('#defineMon').val("6");
					$('#defineMon').focus();
		})
		//选择不调仓
		$('#keep').click(function(){
			$('#adjustLength').fadeOut(200);
			$('#defineMon').val("");
		});
		//目标函数选择。影响约束条件
		$('input:radio[name="oriDetail"]').click(function() {
			$('.constraintConditions input').val("");
			var conDiv = $('#resOption .constraintConditions')
			if ($(this).attr('id') == "equivalent_var") {
				$(conDiv[0]).css("display", "none");
				$(conDiv[1]).css("display", "inline-block");
				$(conDiv[2]).css("display", "none");
				$(conDiv[4]).css("display", "inline-block");
				$(conDiv[3]).css("display", "none");
			} else if ($(this).attr('id') == "equivalent_cvar") {
				$(conDiv[0]).css("display", "none");
				$(conDiv[1]).css("display", "none");
				$(conDiv[2]).css("display", "inline-block");
				$(conDiv[4]).css("display", "inline-block");
				$(conDiv[3]).css("display", "none");
			} else if ($(this).attr('id') == "equivalent_mdd"){
				$(conDiv[0]).css("display", "none");
				$(conDiv[1]).css("display", "none");
				$(conDiv[2]).css("display", "none");
				$(conDiv[3]).css("display", "inline-block");
				$(conDiv[4]).css("display", "inline-block");
			} else {
				$(conDiv[0]).css("display", "inline-block");
				$(conDiv[1]).css("display", "none");
				$(conDiv[2]).css("display", "none");
				$(conDiv[4]).css("display", "inline-block");
				$(conDiv[3]).css("display", "none");
			}
		})
		//选中原始风险平价
		$('input:radio[name="oriRisk"]').click(function(){			
			if($(this).attr('id')=="target_risk"){
				$('#bestDetail').css("display","none");
				$('#oriDetail').css("display","block");
				$('#resOption').css("display","block");
				$('input:radio[id="equivalent_std"]').prop("checked",true);
				$('.initDiv').css("display","none");
				$('.nonInitDiv').css("display","block");
			}else{
				$('#bestDetail').css("display","block");
				$('#constraintConditions').val("");
				$('#oriDetail').css("display","none");
				$('input:radio[id="o_equivalent_std"]').prop("checked",true);
				$('.initDiv').css("display","none");
				$('.nonInitDiv').css("display","block");
			}			
		})
		//区间限制。
		$('#insideSample_endDate1').on('change', function() {
			var thisDate = util.addDays($(this).val(),1);
			$('#insideSample_startDate2').val(thisDate);
			$('#insideSample_startDate2').datetimepicker('setStartDate', thisDate);
			$('#insideSample_endDate2').datetimepicker('setStartDate', thisDate);
		});
		$('#insideSample_startDate2').on('change', function() {
			var thisDate = util.addDays($(this).val(),-1);
			$('#insideSample_endDate1').val(thisDate);
		})
		//第一步确定按钮
		$('#nextBtn1').click(function() {
			var count = 0;
			var manyIndex = $('.checkboxBtn');
			indexName = [];
			for (var i = 0; i < manyIndex.length; i++) {
				if ($(manyIndex[i]).hasClass("checkboxActive")) {
					indexName.push($(manyIndex[i]).text());
					count += 1;
				}
			}
			if ($('#newPrcname').val().length == 0) {
				layer.msg("组合名称不能为空");
			} else if ($('#investmentAmountinp').val().length == 0) {
				layer.msg("投资金额不能为空");
			} else if ($("input:checkbox[name='benchmark']:checked").length == 0) {
				layer.msg("请选择Benchmark");
			} else if (count < 2) {
				layer.msg('请至少选择2个指数');
			}else if($('#externalSample').is(':checked') && $('#fullsample_endDate').val()<$('#fullsample_startDate').val()){
                layer.msg("结束日期不能大于开始日期");
            }else if($('#insideSample').is(':checked') && $('#insideSample_endDate1').val()<$('#insideSample_startDate1').val()){
                layer.msg("结束日期不能大于开始日期");
            }else if($('#insideSample').is(':checked') && $('#insideSample_endDate2').val()<$('#insideSample_startDate2').val()){
                layer.msg("结束日期不能大于开始日期");
            } else if ($("input:radio[name='condition']:checked").length == 0) {
				layer.msg('请选择配置模型');
			} else {
				if ($('input:radio[name="condition"]:checked').attr('id') == "custom") {
					customStrategy();
				}else if ($('input:radio[name="condition"]:checked').attr('id') == "rp") {
					 if($('.adjActive').is(":checked")){
							if($('#defineMon').val().length==0){
								layer.msg('请选择调仓长度。');
							}
							else{
								step1Next("risk");
								$('.step').fadeOut(500);
								$('#riskModel').fadeIn(800);
							}
						}else{
							step1Next("risk");
							$('.step').fadeOut(500);
							$('#riskModel').fadeIn(800);
						}
				}else {
					step1Next("mv");
					$('.step').fadeOut(500);
					$('.targetSet').fadeIn(800);
				}
			}
		});
		function step1Next(type) {
			var params = {
				"index_id" : indexId,
				"o_date_range" : {
					"max" : $("#insideSample_endDate1").val(),
					"min" : $("#insideSample_startDate1").val()
				}
			}
			$.ajax({
				url : apiPath + "/api/v1/portfolio/strategy/static/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if (resp.succeed) {
						if(type=="risk"){
							var data ={data:resp["static"].data,series:
								[
									{
										field : 'num',
										title : resp["static"].columns.num,
										sortable : false,
										align : 'center',
										valign : 'middle'
									},
									{
										field : 'index_name',
										title : resp["static"].columns.index_name,
										sortable : false,
										align : 'center',
										valign : 'middle'
									},
									/*{
										field : 'fund_type',
										title : resp["static"].columns.fund_type,
										sortable : false,
										align : 'center',
										valign : 'middle'
									},*/
									{
										field : 'return_a',
										title : "区间" + resp["static"].columns.return_a,
										class : "inceptionYield",
										sortable : false,
										align : 'center',
										valign : 'middle',
										formatter : function(val) {
											return util.fmtRatio(val);
										}
									},
									{
										field : 'mdd',
										title : "区间" + resp["static"].columns.mdd,
										sortable : false,
										align : 'center',
										valign : 'middle',
										formatter : function(val) {
											return util.fmtRatio(val);
										}
									},
									{
										field : 'sharp_a',
										title : "区间" + resp["static"].columns.sharp_a,
										sortable : false,
										align : 'center',
										valign : 'middle',
										formatter : function(val) {
											return util.fmtFixed(val, 4);
										}
									},
									{
										field : 'std_a',
										title : "区间" + resp["static"].columns.std_a,
										sortable : false,
										align : 'center',
										valign : 'middle',
										formatter : function(val) {
											return util.fmtRatio(val);
										}
									},
								]
								}
								initTable2($("#riskTbl"), data);
								$("#riskTbl").bootstrapTable('load', resp["static"]);
						}else{
							var data ={data:resp["static"].data,series:
							[
								{
									field : 'num',
									title : resp["static"].columns.num,
									sortable : false,
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'index_name',
									title : resp["static"].columns.index_name,
									sortable : false,
									align : 'center',
									valign : 'middle'
								},
								/*{
									field : 'return_a',
									title : resp["static"].columns.return_a,
									sortable : false,
									align : 'center',
									valign : 'middle'
								},*/
								{
									field : 'return_a',
									title : "区间" + resp["static"].columns.return_a,
									class : "inceptionYield",
									sortable : false,
									align : 'center',
									valign : 'middle',
									formatter : function(val) {
										return util.fmtRatio(val);
									}
								},
								{
									field : 'mdd',
									title : "区间" + resp["static"].columns.mdd,
									sortable : false,
									align : 'center',
									valign : 'middle',
									formatter : function(val) {
										return util.fmtRatio(val);
									}
								},
								{
									field : 'sharp_a',
									title : "区间" + resp["static"].columns.sharp_a,
									sortable : false,
									align : 'center',
									valign : 'middle',
									formatter : function(val) {
										return util.fmtFixed(val, 4);
									}
								},
								{
									field : 'std_a',
									title : "区间" + resp["static"].columns.std_a,
									sortable : false,
									align : 'center',
									valign : 'middle',
									formatter : function(val) {
										return util.fmtRatio(val);
									}
								},
								{
									field : '',
									title : "配置权重下限",
									sortable : false,
									align : 'center',
									valign : 'middle',
									formatter : function(val, row) {
										return "<input data-id='" + row.row_name + "' class='configureWeightsinp' name='min' type='number' value='0'>%"
									}
								},
								{
									field : '',
									title : "配置权重上限",
									sortable : false,
									align : 'center',
									valign : 'middle',
									formatter : function(val, row) {
										return "<input data-id='" + row.row_name + "' class='configureWeightsinp' name='max' type='number' value='100'>%"
									}
								},
							]
							}
							initTable2($("#step2Tbl"), data);
							$("#mvTbl").bootstrapTable('load', resp["static"]);
						}
						
					}
				},
				error : function(resp) {
					var r = eval('(' + resp.error_info + ')');
					layer.msg(r);
				}
			});
		}
		//重置按钮
		$('.reset').on('click', function() {
			$(this).parents('.step').find('input:text').val('');
			$(this).parents('.step').find('input:not([name="condition"])').removeAttr("checked");
			$('.checkboxBtn').removeClass('checkboxActive');
		});
		//第二步重置按钮
		$('#step2reset').click(function() {
			$('.constraintConditions').css('display', 'inline-block');
		});
		//风险第二步重置按钮
		$('#riskReset').click(function(){
			$('#riskModel input').val("");
		});
		$('.subfundinp').on('change', function() {
			$('#step2Tbl input[name="min"]').val($('#subfundMin').val());
			$('#step2Tbl input[name="max"]').val($('#subfundMax').val());
		})
		//目标设定影响约束条件
		$('input:radio[name="targetfunction"]').click(function() {
			var conDiv = $('.constraintConditions')
			if ($(this).attr('id') == "max_income") {
				$(conDiv[0]).css("display", "none");
				$(conDiv[1]).css("display", "inline-block");
				$(conDiv[2]).css("display", "inline-block");
				$('#return_a').val("");
			} else if ($(this).attr('id') == "min_std") {
				$(conDiv[1]).css("display", "none");
				$(conDiv[0]).css("display", "inline-block");
				$(conDiv[2]).css("display", "inline-block");
				$('#std_a').val("");
				
			} else {
				$(conDiv[0]).css("display", "inline-block");
				$(conDiv[1]).css("display", "inline-block");
				$(conDiv[2]).css("display", "inline-block");
			}
		})
		//步骤2上一步。
		$('#step2Back').click(function() {
			$('.step').fadeOut(500);
			$('.newPolicydiv').fadeIn(800);
		});
		$('.step2Back').click(function() {
			$('.step').fadeOut(500);
			$('.newPolicydiv').fadeIn(800);
		});
		//第二种情况的配置权重的重置按钮。
		$('#weightReset').click(function() {
			$('.creatPrc-step3-secondul-content input').val('');
			$('.creatPrc-step3-secondul-content input:first').focus();
		});
		//步骤3上一步
		$('#step3Back').click(function() {
			$('.step').fadeOut(500);
			$('.targetSet').fadeIn(800);
		})
		//风险评价步骤3上一步
		$('#riskstep3Back').click(function(){
			$('.step').fadeOut(500);
			$('#riskModel').fadeIn(800);
		})
		//步骤2下一步
		$('#nextBtn2').click(function() {
			var inceptionYield = $('#step2Tbl tbody .inceptionYield');
			var maxYield = parseFloat($(inceptionYield[0]).text());
			for (var i = 0; i < inceptionYield.length; i++) {
				if (maxYield < parseFloat($(inceptionYield[i]).text())) {
					maxYield = parseFloat($(inceptionYield[i]).text());
				}
			}
			if ($('#max_income:checked') || $('#min_std:checked')) {
				if ($('#max_income').is(':checked') && $('#std_a').val().length == 0) {
					layer.msg('年化波动率不能为空');
				} else if ($('#min_std').is(':checked') && $('#return_a').val().length == 0) {
					layer.msg('年化收益率不能为空');
				} else {
					if ($('#return_a').val() > maxYield) {
						layer.confirm('您所选择的产品组合可能无法满足设置的约束条件，是否继续下一步操作？', {
							btn : [ '是', '否' ] //按钮
						}, function(index) {
							$(this).attr('disabled', 'true');
							step2Nextben();
							layer.close(index);
						}, function() {
							$('#return_a').focus();
						});
					} else {
						step2Nextben();
					}
				}

			} else {
				if ($('#return_a').val() > maxYield) {
					layer.confirm('您所选择的产品组合可能无法满足设置的约束条件，是否继续下一步操作？', {
						btn : [ '是', '否' ] //按钮
					}, function(index) {
						$(this).attr('disabled', 'true');
						step2Nextben();
						layer.close(index);
					}, function() {
						$('#return_a').focus();
					});
				} else {
					step2Nextben();
				}
			}
		});
		//第二种情况上一步。
		$('#secondBack').click(function() {
			$('.step').fadeOut(500);
			$('.newPolicydiv').fadeIn(800);
		});
		function step2Nextben() {
			progressStop();
			progressStart();
			$('#layer').css('display', 'block');
			$('#modalName').val($('input:radio[name="targetfunction"]:checked').val());
			$('#Conditions').html('');
			//benchmark多选框
			step1Benchmark = [];
			var benchmark = $('.radioDiv input[name="benchmark"]');
			for (var i = 0; i < benchmark.length; i++) {
				if ($(benchmark[i]).is(":checked")) {
					step1Benchmark.push($(benchmark[i]).attr("id"));
				}
			}
			step1Model = $('input:radio[name="condition"]:checked').attr('id');
			var target = $('input:radio[name="targetfunction"]:checked').attr('id');
			//表格产品ID
			var fundIds = {}
			var tr = $("#step2Tbl tbody tr");
			for (var i = 0; i < $("#step2Tbl tbody tr").length; i++) {
				var prcId = $(tr[i]).find('input:first').data('id');
				var min = $(tr[i]).find('input:first').val() / 100;
				var max = $(tr[i]).find('input:last').val() / 100;
				fundIds[prcId] = {
					'max' : max,
					'min' : min
				};
			}
			params = {
				"index_id" : indexId,
				"user_id" : useUserId,
				"name" : $("#newPrcname").val(),
				"amount" : $('#investmentAmountinp').val() * 10000,
				"o_date_range" : {
					"max" : $("#insideSample_endDate1").val(),
					"min" : $("#insideSample_startDate1").val()
				},
				"p_date_range" : {
					"max" : $("#insideSample_endDate2").val(),
					"min" : $("#insideSample_startDate2").val()
				},
				"benchmark" : step1Benchmark,
				"method" : step1Model,
				"target" : target,
				"static_cons" : {},
				"weight_cons" : {
					'component' : fundIds,
					"specify" : {
						"cash" : {
							"max" : 0,
							"min" : 0
						}
					}
				}
			}
			if ($("#return_a").val().length != 0) {
				$('#Conditions').append('<span>年化收益率>=</span>' + $("#return_a").val() + "%,");
				$.extend(params.static_cons, {
					"return_a" : $('#return_a').val() / 100
				});
			}
			if ($("#std_a").val().length != 0) {
				$('#Conditions').append('<span class="left10">年化波动<=</span>' + $("#std_a").val() + "%,");
				$.extend(params.static_cons, {
					"std_a" : $('#std_a').val() / 100
				});
			}
			if ($('#risk_free').val().length != 0) {
				$('#Conditions').append('<span class="left10">无风险收益率</span>' + $("#risk_free").val() + '%&nbsp;.');
				$.extend(params.static_cons, {
					"risk_free" : parseFloat($('#risk_free').val() / 100)
				});
			}
			$.ajax({
				url : apiPath + "/api/v1/portfolio/strategy/optimized/static/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if (resp.succeed) {
						progressComplete();
						var benchmark = $('input[name="benchmark"]:checked');
						var brnchmarkContent = "";
						for(var i = 0;i<benchmark.length-1;i++){
							brnchmarkContent+="<span class='left10'>"+benchmark[i].value+",</span>"
						}
						brnchmarkContent+="<span class='left10'>"+benchmark[i].value+"</span>";
						if($('input[name=Sample]:checked').val()=="全样本区间"){
							$('#step3showInfo .chTitle').text("全样本区间");
							$('#step3showInfo .Interval').text($('#fullsample_startDate').val()+"至"+$('#fullsample_endDate').val());
							$('.allrange').text($('#fullsample_startDate').val()+"至"+$('#fullsample_endDate').val());
						}else{		
							$('#step3showInfo .chTitle').text("内外样本区间");
							$('#step3showInfo .Interval').text($('#insideSample_startDate1').val()+"至"+$('#insideSample_endDate1').val()+"，"+
									$('#insideSample_startDate2').val()+"至"+$('#insideSample_endDate2').val());
							$('.allrange').text($('#insideSample_startDate2').val()+"至"+$('#insideSample_endDate2').val());
						}						
						$("#step3showInfo .benchmark").html(brnchmarkContent);
						$("#step3showInfo .mode").text($('input:radio[name="condition"]:checked').val());
						$('#step3showInfo .target').text($('input:radio[name="targetfunction"]:checked').val());
						$('#step3showInfo .constraintConditions').text($('input:radio[name="targetfunction"]:checked').val());
						/*$('.allrange_stardate').html($('#fullsample_startDate').val());
						$('.allrange_enddate').html($('#fullsample_endDate').val());*/
						resp.result.pre_investmentAmountinp=$('#investmentAmountinp').val();
						initTable3($('#creatPrctbl'), resp.result);
						for(var i=0;i<resp.result.data.length;i++){
							weight_i.push(util.fmtRatio(resp.result.data[i].weight));
							indexName_i.push(resp.result.data[i].index_name);
							/*pre_investmentAmountinp.push(resp.result.data[i].weight*temp);*/
						}
						$('#creatPrctbl').bootstrapTable('load', resp.result);
						meanVariance();
						combinationExpectation();
						step3Line(1);
						setTimeout(function () {
							
							$('#layer').css('display', 'none');
							$('.step').fadeOut();
							$('.createCombination').fadeIn();
						  }, 1500);
					}else{
						$('#layer').css('display', 'none');
					}
				},
				error : function(resp) {
					$('#layer').css('display', 'none');
				}
			});
		}
		//风险评价模型第二步，下一步按钮。进入风险评价模型第三步。
		$('#riskBtn').click(function(){
			//进度条操作
			progressStart();
			$('#layer').css('display', 'block');
			$('#riskConditions').html('');
			//benchmark多选框
			step1Benchmark = [];
			var benchmark = $('.radioDiv input[name="benchmark"]');
			for (var i = 0; i < benchmark.length; i++) {
				if ($(benchmark[i]).is(":checked")) {
					step1Benchmark.push($(benchmark[i]).attr("id"));
				}
			}
			step1Model = $('input:radio[name="condition"]:checked').attr('id');
			if($('#target_risk').is(":checked")){
				target = $('input:radio[name="oriDetail"]:checked').attr('id');
			}else{
				target = "o_equivalent_std";
			}
			var fistval
			if($("#equivalent_var").is(":checked")){
				fistval = $("#varRisk").val();
			}else if($("#equivalent_cvar").is(":checked")){
				fistval = $("#cvarRisk").val();
			}else if($("#equivalent_mdd").is(":checked")){
				fistval = $("#mdd").val();
			}else{
				fistval = $('#annRisk').val();
				if(fistval.length==0){
					fistval = null;
				}
			}
			if($('#annRisk').val().length!=0){
				$('#riskConditions').append("<span>年化波动率<=</span>"+$('#annRisk').val()+"%,")
			}else if($('#varRisk').val().length!=0){
				$('#riskConditions').append("<span>风险价值（vaR）<=</span>"+$('#varRisk').val()+"%,")
			}else if($('#cvarRisk').val().length!=0){
				$('#riskConditions').append("<span>条件风险价值（CVaR）<=</span>"+$('#cvarRisk').val()+"%,")
			}else if($('#noRisk').val().length!=0){
				$('#riskConditions').append("<span>无风险收益率=</span>"+$('#noRisk').val()+"%,")
			}else if($('#mdd').val().length!=0){
				$('#riskConditions').append("<span>最大回撤<=</span>"+$('#mdd').val()+"%,")
			}
			
			params = {					
					"index_id" : indexId,
					"user_id" : useUserId,
					"name" : $("#newPrcname").val(),
					"amount" : $('#investmentAmountinp').val() * 10000,
					"o_date_range" : {
						"max" : $("#insideSample_endDate1").val(),
						"min" : $("#insideSample_startDate1").val()
					},
					"p_date_range" : {
						"max" : $("#insideSample_endDate2").val(),
						"min" : $("#insideSample_startDate2").val()
					},
					"benchmark" : step1Benchmark,
					"method" : step1Model, 
					"target" : target,
					"static_cons" : {"target_risk":Number(fistval/100),"risk_free":$('#noRisk').val().length==0?null:Number($('#noRisk').val()/100)},
					"weight_cons" : {
						'component' : null,
						"specify" : {
							"cash" : {
								"max" : 0,
								"min" : 0
							}
						}
					},
					/*"r_weight" : weight*/
				};
			$.extend(params, {"freq" : $('input:radio[name="adjustPer"]:checked').data('type')});
			$.extend(params, {"optimize_period":$('#defineMon').val().length==0?null:Number($('#defineMon').val())});
			$.ajax({
				url : apiPath + "/api/v1/portfolio/strategy/optimized/static/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if(resp.succeed){
						progressComplete();
						var benchmark = $('input:checkbox[name="benchmark"]:checked');
						var brnchmarkContent = "";
						for (var i = 0; i < benchmark.length - 1; i++) {
							brnchmarkContent += "<span class='left10'>" + benchmark[i].value + ",</span>"
						}
						brnchmarkContent += "<span class='left10'>" + benchmark[i].value + "</span>";
						if ($('input[name=Sample]:checked').val() == "全样本区间") {
							$('.step3showInfo .chTitle').text("全样本区间");
							$('.step3showInfo .Interval').text($('#fullsample_startDate').val() + "至" + $('#fullsample_endDate').val());
						} else {
							$('.step3showInfo .chTitle').text("内外样本区间");
							$('.step3showInfo .Interval').text($('#insideSample_startDate1').val() + "至" + $('#insideSample_endDate1').val() + "，" +
								$('#insideSample_startDate2').val() + "至" + $('#insideSample_endDate2').val());
						}
						$(".step3showInfo .benchmark").html(brnchmarkContent);
						$(".step3showInfo .mode").text($('input:radio[name="condition"]:checked').val());
						$('.step3showInfo .target').text($('input:radio[name="oriRisk"]:checked').val()+"-"+$('input:radio[name="oriDetail"]:checked').next().text());
						$('.step3showInfo .constraintConditions').text($('input:radio[name="targetfunction"]:checked').val());
						resp.result.pre_investmentAmountinp = $('#investmentAmountinp').val();
						initTable3($('#riskcreatPrctbl'), resp.result);
						$('#riskcreatPrctbl').bootstrapTable("load",resp.result);
						setTimeout(function() {
							$('#layer').css('display', 'none');
							$('.step').fadeOut();
							$('.riskcreateCombination').fadeIn();
						}, 1500);
						//累计收益指标与组合预期业绩指标
						step3Line("risk")
						combinationExpectation("risk");
					}else{
						$('#layer').css('display', 'none');
						layer.msg("请重新操作");
					}
				},
				error : function(resp) {
                    $('#layer').css('display', 'none');
                    layer.msg("请重新操作");
					$('.step').fadeOut();
					$('.riskcreateCombination').fadeIn();
				}
			});
		});
		//自定义自策略权重
		function customStrategy() {
			progressStop();
			progressStart();
			$('#layer').css('display', 'block');
			//benchmark多选框
			step1Benchmark = [];
			var benchmark = $('.radioDiv input[name="benchmark"]');
			for (var i = 0; i < benchmark.length; i++) {
				if ($(benchmark[i]).is(":checked")) {
					step1Benchmark.push($(benchmark[i]).attr("id"));
				}
			}
			step1Model = $('input:radio[name="condition"]:checked').attr('id');
			var weight = {};
			var weightValue = 1 / indexId.length;
			var prcName = $('.prcName');
			var weightContent = "";
			for (var i = 0; i < indexId.length; i++) {
				var prcId = indexId[i];
				weight[prcId] = weightValue;
				weightContent += "<p><span class='prcName manywords140' title='" + indexName[i] + "'>" + indexName[i] + "</span><input data-id='" + indexId[i] + "' class='configureWeightsinp' type='number' value='" + util.fmtFixed(weightValue * 100, 1) + "'>%</p>";
			}
			$('.creatPrc-step3-secondul .creatPrc-step3-secondul-content').html(weightContent);
			params = {
				"index_id" : indexId,
				"user_id" : useUserId,
				"name" : $("#newPrcname").val(),
				"amount" : $('#investmentAmountinp').val() * 10000,
				"o_date_range" : {
					"max" : $("#insideSample_endDate1").val(),
					"min" : $("#insideSample_startDate1").val()
				},
				"p_date_range" : {
					"max" : $("#insideSample_endDate2").val(),
					"min" : $("#insideSample_startDate2").val()
				},
				"benchmark" : step1Benchmark,
				"method" : step1Model,
				"static_cons" : {},
				"weight_cons" : {},
				"weight" : weight
			}
			$.ajax({
				url : apiPath + "/api/v1/portfolio/strategy/optimized/asset/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if (resp.succeed) {
						progressComplete();
						initArea($('#secondAre'), {'date':resp.result.categories,'series' : resp.result.series}, {
							color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
							reservations : 'percent1',
							stacking: "percent",
							lineColor: "#ffffff",
							markerLineWidth: 1,
							markerRadius: 1,
							legend : {
								enabled : true
							}										
						});
						step3Line(2);
						rateofReturn(2);
						dynamicCondition(2);
						setTimeout(function () {
							$('#layer').css('display', 'none');
							$('.step').fadeOut();
							$('.secondSituation').fadeIn();
						  }, 1500);
					}else{
						$('#layer').css('display', 'none');
					}
				},
				error : function(resp) {
					$('#layer').css('display', 'none');
					layer.msg(resp.info_msg);
				}
			});
		}
		$('#configureWeights').click(function() {
			var weightsresult = null;
			var result = $(".creatPrc-step3-secondul-content .configureWeightsinp");
			for (var i = 0; i < result.length; i++) {
				weightsresult += parseFloat($(result[i]).val());
			}
			if (weightsresult!=100) {
				layer.confirm('指数成分不为1，是否归一', {
					btn : [ '确定', '取消' ] //按钮
				}, function(index) {
                    var state = false;
                    var count = 0;
                    for(var k = 0;k<result.length;k++){
                        if($(result[k]).val()==0){
                            count++
                        }
                    }
                    if(count==result.length){
                        state = true;
                    }
                    for (var i = 0; i < result.length; i++) {
                    	if($(result[i]).val()=="" || state){
                            params.weight[$(result[i]).data('id')] = parseFloat((100/result.length).toFixed(3))
                            $(result[i]).val((100/result.length).toFixed(1));
						}else{
                            params.weight[$(result[i]).data('id')] = parseFloat(($(result[i]).val()/weightsresult).toFixed(3)) //;
                            $(result[i]).val(($(result[i]).val()/weightsresult * 100).toFixed(1));
						}
                    }
					layer.close(index);
                    $.ajax({
                        url : apiPath+"/api/v1/portfolio/strategy/optimized/asset/",
                        type : 'post',
                        contentType : "application/json;charset=utf-8",
                        data : JSON.stringify(params),
                        success : function(resp) {
                            if(resp.succeed){
                                initArea($('#secondAre'), {'date':resp.result.categories,'series' : resp.result.series}, {
                                    color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
                                    reservations : 'percent1',
                                    stacking: "percent",
                                    lineColor: "#ffffff",
                                    markerLineWidth: 1,
                                    markerRadius: 1,
                                    legend : {
                                        enabled : true
                                    }
                                });
                            }
                        },
                        error : function(resp) {
                            layer.msg(resp.info_msg);
                        }
                    });
                    step3Line(2);
                    rateofReturn(2);
                    dynamicCondition(2);
				}, function() {});
			} else {
				for (var i = 0; i < result.length; i++) {
                    params.weight[$(result[i]).data('id')] = parseFloat($(result[i]).val()/weightsresult.toFixed(3))//;
                    $(result[i]).val(($(result[i]).val()/weightsresult * 100).toFixed(1));
				}
                $.ajax({
                    url : apiPath+"/api/v1/portfolio/strategy/optimized/asset/",
                    type : 'post',
                    contentType : "application/json;charset=utf-8",
                    data : JSON.stringify(params),
                    success : function(resp) {
                        if(resp.succeed){
                            initArea($('#secondAre'), {'date':resp.result.categories,'series' : resp.result.series}, {
                                color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
                                reservations : 'percent1',
                                stacking: "percent",
                                lineColor: "#ffffff",
                                markerLineWidth: 1,
                                markerRadius: 1,
                                legend : {
                                    enabled : true
                                }
                            });
                        }
                    },
                    error : function(resp) {
                        layer.msg(resp.info_msg);
                    }
                });
				step3Line(2);
				rateofReturn(2);
				dynamicCondition(2);
			}
		});
		$(".savePrc").click(savePrc);
	}
	//策略选择
	function choiceStrategy() {
		indexId = [];
		var indexBtn = $('#industrymainTbl .checkboxBtn');
		for (var i = 0; i < indexBtn.length; i++) {
			if ($(indexBtn[i]).hasClass("checkboxActive")) {
				indexId.push($(indexBtn[i]).data('id'));
			}
		}
		var params = {
			"index_id" : indexId
		}
		$.ajax({
			url : apiPath + "/api/v1/portfolio/strategy/static/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					fullSample_startDate = resp.interval.min;
					fullSample_endDate = resp.interval.max;
					$('#fullsample_startDate').val(fullSample_startDate);
					$('#fullsample_endDate').val(fullSample_endDate);
					$('#insideSample_startDate1').val(fullSample_startDate);
					$('#insideSample_startDate2').val(fullSample_startDate);
					$('#insideSample_endDate1').val(fullSample_endDate);
					$('#insideSample_endDate2').val(fullSample_endDate);
					$('.startDate').datetimepicker('setStartDate', fullSample_startDate);
					$('.startDate').datetimepicker('setEndDate', fullSample_endDate);
					//$('.endDate').datetimepicker('setStartDate', fullSample_startDate);
					$('.endDate').datetimepicker('setEndDate', fullSample_endDate);
				}
			},
			error : function(resp) {
				var r = eval('(' + resp.error_info + ')');
				layer.msg(r);
			}
		});
	}
	//均值方差
	function meanVariance() {
		var chart1 = new Highcharts.Chart('meanVariance', {
			"title" : {
				"text" : ''
			},
			credits : {
				enabled : false
			},
		});
		chart1.showLoading("数据加载中...");
		$.ajax({
			url : apiPath + "/api/v1/portfolio/strategy/optimized/efficient_frontier/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					var data = [];
					var showNumber = [];
					for (var i = 0; i < resp.income_risk.length; i++) {
						var array = {};
						array = {
							x : parseFloat(util.fmtFixed(resp.income_risk[i].income, 6)),
							y : parseFloat(util.fmtFixed(resp.income_risk[i].std, 6))
						}
						for (j in resp.income_risk[i].weight) {
							var key = j
							createJson([key],parseFloat(util.fmtFixed(resp.income_risk[i].weight[j], 6)),array);
						}
						data.push(array);
					}
					for(j in resp.income_risk[0].weight){
						var key = j
						showNumber.push(key);
					}
					initCurvechart($('#meanVariance'),{series:data,keynumber:showNumber});
					chart1.hideLoading();
				}
			},
			error : function(resp) {
				layer.msg(resp.info_msg);
			}
		});
	}
	//组合预期
	function combinationExpectation(type) {
		$.ajax({
			url : apiPath + "/api/v1/portfolio/strategy/optimized/indicators/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					if(type=="risk"){
						$('.allrange').html(resp.interval.min+"至"+resp.interval.max)
						$('#riskTbldiv .accountTbl td:eq(0) div:nth-child(2)').html(util.fmtRatio(resp.result["return"]));
						$('#riskTbldiv .accountTbl td:eq(1) div:nth-child(2)').html(util.fmtRatio(resp.result.return_a));
						$('#riskTbldiv .accountTbl td:eq(2) div:nth-child(2)').html(util.fmtRatio(resp.result.std_a));
						$('#riskTbldiv .accountTbl td:eq(3) div:nth-child(2)').html(util.fmtRatio(resp.result.dd_a));
						$('#riskTbldiv .accountTbl td:eq(4) div:nth-child(2)').html((parseFloat(resp.result.sortino_a)).toFixed(2));
						$('#riskTbldiv .accountTbl td:eq(5) div:nth-child(2)').html((parseFloat(resp.result.sharp_a)).toFixed(2));
						$('#riskTbldiv .accountTbl td:eq(6) div:nth-child(2)').html(util.fmtRatio(resp.result.mdd));
						$('#riskTbldiv .accountTbl td:eq(7) div:nth-child(2)').html(resp.result.mdd_date);
						$('#riskTbldiv .accountTbl td:eq(8) div:nth-child(2)').html(resp.result.formation_time + "天");
						rateofReturn("risk");
						dynamicCondition("risk");						
					}else{
						$('.accountTbl td:eq(0) div:nth-child(2)').html(util.fmtRatio(resp.result["return"]));
						$('.accountTbl td:eq(1) div:nth-child(2)').html(util.fmtRatio(resp.result.return_a));
						$('.accountTbl td:eq(2) div:nth-child(2)').html(util.fmtRatio(resp.result.std_a));
						$('.accountTbl td:eq(3) div:nth-child(2)').html(util.fmtRatio(resp.result.dd_a));
						$('.accountTbl td:eq(4) div:nth-child(2)').html((parseFloat(resp.result.sortino_a)).toFixed(2));
						$('.accountTbl td:eq(5) div:nth-child(2)').html((parseFloat(resp.result.sharp_a)).toFixed(2));
						$('.accountTbl td:eq(6) div:nth-child(2)').html(util.fmtRatio(resp.result.mdd));
						$('.accountTbl td:eq(7) div:nth-child(2)').html(resp.result.mdd_date);
						$('.accountTbl td:eq(8) div:nth-child(2)').html(resp.result.formation_time + "天");
						step3Line(1);
						rateofReturn(1);
						dynamicCondition(1);
					}
				}
			},
			error : function(resp) {
				layer.msg(resp.info_msg);
			}
		});
	}
	//创建产品第三步，折线图。
	function step3Line(type) {
		$.ajax({
			url : apiPath + "/api/v1/portfolio/strategy/optimized/nav/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					if (resp.succeed) {
						if (type == 1) {
							initchart($('#yieldlineCharts'),resp.result,{
								chart_type:'line',
								color: [ '#f8354f', '#1f8aee', '#2FB9A1', '#7bbdf5', '#E4C11B', '#622A80', '#FFA1CC', '#349CB8' ],
								reservations:"percent",	
								radius:1,
								legend:{
									enabled : true,
									layout : 'horizontal', 
									align :  'center', 
									verticalAlign :  'bottom', 
								},
							});
						} else if(type=="risk"){
							initchart($('#riskVariance'),resp.result,{
								chart_type:'line',
								color: [ '#f8354f', '#1f8aee', '#2FB9A1', '#7bbdf5', '#E4C11B', '#622A80', '#FFA1CC', '#349CB8' ],
								reservations:"percent",	
								radius:1,
								legend:{
									enabled : true,
									layout : 'horizontal', 
									align :  'center', 
									verticalAlign :  'bottom', 
								},
							});
						}else {
							initchart($('#secondLine'),resp.result,{
								chart_type:'line',
								color: [ '#f8354f', '#1f8aee', '#2FB9A1', '#7bbdf5', '#E4C11B', '#622A80', '#FFA1CC', '#349CB8' ],
								reservations:"percent",	
								radius:1,
								legend:{
									enabled : true,
									layout : 'horizontal', 
									align :  'center', 
									verticalAlign :  'bottom', 
								},
							});
						}
					}
				}
			},
			error : function(resp) {
				console.log(resp);
				layer.msg(resp.info_msg);
			}
		});
	}
	//创建产品第三步，收益率
	function rateofReturn(type) {
		$.ajax({
			url : apiPath + "/api/v1/portfolio/strategy/optimized/income/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					if (type == 1) {
						/*initColumn($('#yieldCharts'), resp.result, [ '#2765B9', '#2C8CF8', '#FB88B3', '#D72F54', '#9370DB' ]);*/
						initchart($('#yieldCharts'),resp.result,{
							chart_type:'column',
							reservations:"percent",
							'columnPointWidth':"20",
							legend:{
								enabled:true,
							},
						});
					} else if(type=="risk"){
						initchart($('#riskyieldCharts'), resp.result, {
							chart_type : 'column',
							reservations : "percent",
							'columnPointWidth':"20",
							legend : {
								enabled : true,
							},
						});
					}else {
						/*initColumn($('#secondyieldCharts'), resp.result, [ '#2765B9', '#2C8CF8', '#FB88B3', '#D72F54', '#9370DB' ]);*/
						initchart($('#secondyieldCharts'),resp.result,{
							chart_type:'column',
							reservations:"percent",
							'columnPointWidth':"20",
							legend:{
								enabled:true,
							},
						});
					}
				}
			},
			error : function(resp) {
				layer.msg(resp.info_msg);
			}
		});
	}
	//创建产品第三步，动态回撤
	function dynamicCondition(type) {
		$.ajax({
			url : apiPath + "/api/v1/portfolio/strategy/optimized/retracement/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					if (type == 1) {
						initArea($('#dynamicDallback'), {'date':resp.result.categories,'series' : resp.result.series}, {
							'color':['#7cb5ec'],
							'reservations' : 'percent2',
							'x_tickmarkPlacement':'on',
							'lineWidth':2,
							'markerRadius':1,
							legend : {},						
						});
						$('.cdata:even').datetimepicker('setStartDate', resp.interval.min);
						$('.cdata:even').datetimepicker('setEndDate', resp.interval.max);
						$('.cdata:odd').datetimepicker('setStartDate', resp.interval.min);
						$('.cdata:odd').datetimepicker('setEndDate', resp.interval.max);
					} else if(type==2){
						initArea($('#seconddynamicDallback'), {'date':resp.result.categories,'series' : resp.result.series}, {
							'color':['#7cb5ec'],
							'reservations' : 'percent2',
							'x_tickmarkPlacement':'on',
							'lineWidth':2,
							'markerRadius':1,
							legend : {},						
						});
					}else{
						initArea($('#riskdynamicDallback'), {'date':resp.result.categories,'series' : resp.result.series}, {
							'color':['#7cb5ec'],
							'reservations' : 'percent2',
							'x_tickmarkPlacement':'on',
							'lineWidth':2,
							'markerRadius':1,
							legend : {},						
						});
						$.ajax({
							url : apiPath+"/api/v1/portfolio/strategy/optimized/asset/",
							type : 'post',
							contentType : "application/json;charset=utf-8",
							data : JSON.stringify(params),
							success : function(resp) {
								if(resp.succeed){
								initArea($('#risksecondAre'), {'date':resp.result.categories,'series' : resp.result.series}, {
									color: [ "#BDE1FD", "#C3EEE9", "#FE8F86", "#F8EDBC", '#1053ae', '#1f8aee', '#7bbdf5', '#abe5a4', '#e5f1a4', '#81daea', '#89eff7', '#56cff4', '#f9e47d', '#a3fc70', '#49f2d2' ],
									reservations : 'percent1',
									stacking: "percent",
									lineColor: "#ffffff",
									markerLineWidth: 1,
									markerRadius: 1,
									legend : {
										enabled : true
									}
								});
								}
							},
							error : function(resp) {
								layer.msg(resp.info_msg);
							}
						});
					}
				}
			},
			error : function(resp) {
				layer.msg(resp.info_msg);
			}
		});
	}
	//保存新创建的产品
	function savePrc() {
		progressStop();
		progressStart();
		$('#layer').css('display', 'block');
		$.ajax({
			url : apiPath + "/api/v1/portfolio/strategy/optimized/save/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					progressComplete();
					layer.msg(resp.result);
					setTimeout(function () {
						$('#layer').css('display', 'none');
						//seesionStorage.setItem("comNewprc",$('#newPrcname').val());
						window.location.href = ctx + "/combination/detail/"+resp.fund_id;
					  }, 1500);
				}else{
					$('#layer').css('display', 'none');
				}
			},
			error : function(resp) {
				$('#layer').css('display', 'none');
				layer.msg(resp.info_msg);
			}
		});
	}
	function initTable2(dom, data) {
		dom.bootstrapTable({
			striped : true,
			sidePagination : 'client',
			cache : false,
			data : data.data,
			pagination : false,
			search : false,
			undefinedText : '--',
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			columns : data.series,
		});
	}
	//step3表格
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
					field : 'num',
					title : resp.columns.num,
					sortable : false,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'index_name',
					title : resp.columns.index_name,
					sortable : false,
					align : 'center',
					valign : 'middle'
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
					field : 'return_a',
					title : resp.columns.return_a,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'sharp_a',
					title : resp.columns.sharp_a,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtFixed(val, 4);
					}
				},
				{
					field : 'std_a',
					title : resp.columns.std_a,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val) {
						return util.fmtRatio(val);
					}
				},
				{
					field : 'weight',
					title : resp.columns.weight,
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return "<span data-id='" + row.row_name + "' class='bold'type='number'>" + util.fmtRatio(val, 4) + "</span>"
					}
				},
				{
					field : 'weight',
					title : '拟投资金额（万元）',
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return "<span type='number'>" + (resp.pre_investmentAmountinp*val).toFixed(2) + "</span>"
					}
				},
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.onPostBody
		});
	}
	//初始化曲线图.
	function initCurvechart(dom, resp) {
		dom.highcharts({
			chart : {
				type : 'spline',
				inverted : true
			},
			colors : [ '#f8354f', '#1f8aee', '#2FB9A1', '#7bbdf5', '#E4C11B', '#622A80', '#FFA1CC', '#349CB8' ],
			title : {
				text : ''
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				reversed : false,
				title : {
					enabled : true,
					text : '期望年化收益率',
					align:"high"
				},
				labels : {
					formatter : function() {
						return util.fmtRatio(this.value);
					}
				},
				maxPadding : 0.05,
				showLastLabel : true
			},
			yAxis : {
				title : {
					text : '期望年化波动率',
					align:"high"
				},
				labels : {
					formatter : function() {
						return util.fmtRatio(this.value);
					}
				},
			},
			legend : {
				enabled : false
			},
			tooltip : {
				headerFormat : '<b>{series.name}</b><br/>',
				pointFormatter : function() {
					var show = "<span>配置比例：</span><br>";
					for(var i = 0;i<resp.keynumber.length;i++){
						show+='<span>'+resp.keynumber[i]+'：'+util.fmtRatio(this[resp.keynumber[i]],4)+'</span><br>'
					}
						show+='<span>投资组合预期业绩表现：</span><br><span>期望年化收益率：' + util.fmtRatio(this.x,4) + '</span><br>期望年化波动率：' + util.fmtRatio(this.y,4);
					return show;
				},
				shared : true
			},
			exporting : {
				enabled : false //设置导出按钮不可用
			},
			credits : {
				enabled : false //不显示highcharts链接
			},
			plotOptions : {
				spline : {
					marker : {
						enable : false
					}
				},
				series : {
					marker : {
						radius : 1, //曲线点半径，默认是4
					}
				}
			},
			series : [ {
				name : '有效边界',
				data : resp.series,
			} ]
		});
	}
	
	function createJson(prop, val,str1) {
		// 如果 val 被忽略
		if (typeof val === "undefined") {
			// 删除属性
			delete str1[prop];
		} else {
			// 添加 或 修改
			str1[prop] = val;
		}
	}
});