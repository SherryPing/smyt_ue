/**
 * 评分评级_主观评价.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	require('jqueryform');
	var util = require('util');
	require('bootstrap_table_zh');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('header');
	require('jqueryform');
	//临时变量
	/*var apiPath = "http://192.168.1.114:8868";*/
	var org_id = $('#org_id').val()+"/"
	var org_id1 = $('#org_id').val();
	var user_id = $('#user_id').val();
	var org_id_init = $('#org_id_init').val();
	const subScore=9;
	var subScoreT;
	// 初始化区域
	$(function() {
		init();
	});
	function init() {
		initConfig();
		initEvent();
	}

	function initConfig() {
		
	}
	function initEvent() {
		$("#previ").click(function(){
			window.location.href= ctx+ "/InvestmentRatings/observationPool/Score/objectiveEvaluation/" + org_id_init +","+org_id ;
		})
		//评分依据卡片显示
		var inp=$(".rating input");
		$(".rating input").focus(function(){
			let index=($(this).parent().parent().index()-1)/3;
			let top=$(this).parent().parent().position().top;
			for(let i=0; i<inp.length;i++){
				$(".scoreReferCard").eq(i).css("display","none");
			}
			inp.removeAttr("readonly");
			$(".scoreReferCard").eq(index).css("top",top);
			$(".scoreReferCard").eq(10).css("top",top/1.5);
			$(".scoreReferCard").eq(index).css("display","block");
		});
		inp.removeAttr("readonly");
		//初始化表格
		function initTab(dom, resp) {
			dom.bootstrapTable({
				striped : true,
				sidePagination : 'client',
				cache : false,
				data : resp.data,
				pagination : false,
				classes:'table table-no-bordered',
				search : false,
				pagination:false,
	    		/*pageNumber:1,
	    		pageSize:5,
	    		pageList:[5,10,15],*/
				undefinedText : '--',
				singleSelect : false,
				striped : true,
				clickToSelect : true,
				columns : resp.columns,
			});
		}
		
		
		//1.主要股东背景	
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/shareholder_info/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				var columns = [
					{field : 'shareholder_name',align: 'left',width:110,valign: 'middle',formatter : function(val) {
						return "<span class='blueLeft'>" +val + "</span>"
					}},
					{field : 'invest_amount',align: 'left',width:200,valign: 'middle',formatter : function(val) {
						return "<span >出资金额（万元）：" +util.fmtFixed(val,2)  + "</span>"
					}},
					{field : 'invest_way',align: 'left',width:110,valign: 'middle',formatter : function(val) {
						return "<span >出资方式：" +val + "</span>"
					}},
					{field : 'shareholding_ratio',align: 'left',width:110,valign: 'middle',formatter : function(val) {
						return "<span>持股比例：" +util.fmtRatio(val,2) + "</span>"
					}},									
				];
				initTab($("#tab_1"), {
					data : resp,
					columns : columns
				});
				
			},
			error : function() {}
		});
		
		//2.组织架构	
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/department_info/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				var columns = [
					{
						field : 'depart_full_name',title : '部门全称',width:110,formatter : function(val) {
							return "<span class='blueLeft'><span class='depa'>" +val + "</span></span>"
						}
					},
					{
						field : 'depart_staff_num',title : '部门人数',width:100,formatter : function(val) {
							return "<span >部门人数：<span class='depa'>" +val + "</span></span>"
						}
					},
					{
						field : 'depart_main_function',title : '部门主要职能',width:200,formatter : function(val) {
							return "<span >部门主要职能：<span class='depa'>" +val + "</span></span>"
						}
					},
					{
						field : 'responsible_person',title : '主要负责人',width:110,formatter : function(val) {
							return "<span >主要负责人：<span class='depa'>" +val + "</span></span>"
						}
					},
				];
				initTab($("#tab_2"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".depa").length;i++){
					if($(".depa")[i].innerHTML.trim()=="null"){
						$(".depa")[i].innerHTML = "--";
					}
				}
			},
			error : function() {}
		});
		
		//3.经营规划
		$.ajax({
			url :apiPath+"/api/v1/due_diligence/org_info/" + org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				if(resp.org_mgt_plan.trim()){
					$("#div_3").html(resp.org_mgt_plan);
				}else{
					$("#div_3").html("--");
				}
				
			},
			error : function() {}
		})
		
		//4.核心投研人员教育/工作背景
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/staff_info/?org_id="+org_id1,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//data : JSON.stringify(params),
			success : function(resp) {
				var columns = [
					{
						field : 'user_name',title : '姓名',width:110,valign: 'top',formatter : function(val) {							
							return "<span class='blueLeft'><span class='staff'>" +val + "</span></span>"
						}
					},
					{
						field : 'hiredate',title : '入职时间',width:110,valign: 'top',formatter : function(val) {
							return "<span >入职时间：<span class='staff'>" +val + "</span></span>"
						}
					},
					{
						field : 'title',title : '职务',width:110,valign: 'top',formatter : function(val) {
							return "<span >职务：<span class='staff'>" +val + "</span></span>"
						}
					},
					{
						field : 'education',title : '背景/资格证书',width:200,valign: 'top',formatter : function(val) {
							return "<span >背景/资格证书：<span class='staff'>" +val + "</span></span>"
						}
					},
					{
						field : 'working_years',title : '从业年限（年）',width:110,valign: 'top',formatter : function(val) {
							return "<span >从业年限（年）：<span class='staff'>" +val + "</span></span>"
						}
					},
					{
						field : 'investment_years',title : '实盘年限（年）',width:110,valign: 'top',formatter : function(val) {
							return "<span >实盘年限（年）：<span class='staff'>" +val + "</span></span>"
						}
					},
					{
						field : 'working_experience',title : '职业经历',width:220,valign: 'top',formatter : function(val) {
							return "<span >职业经历：<span class='staff'>" +val + "</span></span>"
						}
					},
					{
						field : 'prize',title : '所获荣誉',width:220,valign: 'top',formatter : function(val) {
							return "<span >所获荣誉：<span class='staff'>" +val + "</span></span>"
						}
					},
					
				];
				initTab($("#tab_6"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".staff").length;i++){
					if($(".staff")[i].innerHTML.trim()=="null"){
						$(".staff")[i].innerHTML = "--";
					}
				}
			},
			error : function() {}
		});
		
		//5.激励机制
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/org_info_plan_motivation/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				if(resp.org_team_plan){
					$("#div_5_1").html(resp.org_team_plan);
				}else{
					$("#div_5_1").html("--");
				}
				if(resp.staff_assessment){
					$("#div_5_2").html(resp.staff_assessment);
				}else{
					$("#div_5_2").html("--");
				}
				if(resp.org_incentive){
					$("#div_5_3").html(resp.org_incentive);
				}else{
					$("#div_5_3").html("--");
				}
			},
			error : function() {}
		});
		
		//6.策略容量
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/strategy_info/?org_id="+org_id1,			
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				var columns = [
					{
						field : 'strategy_name',title : '策略类别/名称',align: 'left',valign: 'top',formatter : function(val) {
							return "<span class='blueLeft'>策略类别/名称：<span class='stra'>" +val + "</span></span>"
						}
					},
					{
						field : 'strategy_logic',title : '策略基本逻辑',align: 'left',valign: 'top',formatter : function(val) {
							return "<span>策略基本逻辑：<span class='stra'>" +val + "</span></span>"
						}
					},
					{
						field : 'strategy_scale_limit_calculate_basis',title : '策略容量及测算依据',align: 'left',valign: 'top',formatter : function(val) {
							return "<span>策略容量及测算依据：<span class='stra'>" +util.fmtFixed(val,2) + "</span></span>"
						}
					},
					{
						field : 'suited_market_condition',title : '策略适合的市场情形',align: 'left',valign: 'top',formatter : function(val) {
							return "<span>策略适合的市场情形：<span class='stra'>" +val + "</span></span>"
						}
					},
					{
						field : 'risk_and_control',title : '策略风险点及控制方式',align: 'left',valign: 'top',formatter : function(val) {
							return "<span>策略风险点及控制方式：<span class='stra'>" +val + "</span></span>"
						}
					},
				];
				/*console.log(resp)*/
				initTab($("#tab_8"), {
					data : resp,
					columns : columns
				});
				for(let i=0;i<$(".stra").length;i++){
					if($(".stra")[i].innerHTML.trim()=="null"){
						$(".stra")[i].innerHTML = "--";
					}
				}
				$("input").attr("readonly", "readonly");
				$("textarea").attr("readonly", "readonly");
			},
			error : function() {}
		});
		
		//7.投资理念 8.投资流程
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/invest_detail/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				if(resp.invest_philosophy){
					$("#div_7").html(resp.invest_philosophy);
				}else{
					$("#div_7").html("--");
				}
				if(resp.invest_process){
					$("#div_8").html(resp.invest_process);
				}else{
					$("#div_8").html("--");
				}
			},
			error : function() {}
		});
		
		//9.交易系统
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/it_info/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				if(resp.transaction_auto_level){
					$("#div_9_1").html(resp.transaction_auto_level);
				}else{
					$("#div_9_1").html("--");
				}
				if(resp.dev_trans_risk_system_intrduction){
					$("#div_9_2").html(resp.dev_trans_risk_system_intrduction);
				}else{
					$("#div_9_2").html("--");
				}
			},
			error : function() {}
		});
		
		//10.产品相关事宜
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/cooperation_factor/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				if(resp.safety_pad_ratio){
					$("#span_10_1").html(resp.safety_pad_ratio);
				}else{
					$("#span_10_1").html("--");
				}
				if(resp.safety_pad_scale){
					$("#span_10_2").html(util.fmtFixed(resp.safety_pad_scale,2));
				}else{
					$("#span_10_2").html("--");
				}
				if(resp.fee_manage){
					$("#span_10_3").html(util.fmtFixed(resp.fee_manage,2));
				}else{
					$("#span_10_3").html("--");
				}
				if(resp.is_fee_pay_benchmark){
					$("#span_10_4").html(resp.is_fee_pay_benchmark);
				}else{
					$("#span_10_4").html("--");
				}
			},
			error : function() {}
		});
		
		//11.风控流程
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/rc_info/"+org_id,
			type : 'get',
			contentType : "application/json;charset=utf-8",
			success : function(resp) {
				if(resp.is_stop_lose_mechanism){
					$("#span_11_1").html(resp.is_stop_lose_mechanism);
				}else{
					$("#span_11_1").html("--");
				}
				if(resp.stop_lose_mechanism_illustration){
					$("#div_11_1").html(resp.stop_lose_mechanism_illustration);
				}else{
					$("#div_11_1").html("--");
				}
				if(resp.is_diverse_risk_index){
					$("#span_11_2").html(resp.is_diverse_risk_index);
				}else{
					$("#span_11_2").html("--");
				}
				if(resp.risk_control_index_list){
					$("#div_11_2").html(resp.risk_control_index_list);
				}else{
					$("#div_11_2").html("--");
				}
				if(resp.risk_handle_case){
					$("#div_11_3").html(resp.risk_handle_case);
				}else{
					$("#div_11_3").html("--");
				}
			},
			error : function() {}
		});
		
		/*获取满分*/
		params = $.extend({}, {
			'org_id':org_id1
		});
		$.ajax({
			url :apiPath+"/api/v1/due_diligence/module/subjective_score/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {								
				subjForm.invest_process.value=util.fmtFixed(resp.subjective_result.invest_process,0);
				subjForm.risk_control_process.value=util.fmtFixed(resp.subjective_result.risk_control_process,0);
				subjForm.org_incentive.value=util.fmtFixed(resp.subjective_result.org_incentive,0);
				subjForm.strategy_scale.value=util.fmtFixed(resp.subjective_result.strategy_scale,0);
				subjForm.department_structure.value=util.fmtFixed(resp.subjective_result.department_structure,0);
				subjForm.plan.value=util.fmtFixed(resp.subjective_result.plan,0);
				subjForm.invest_philosophy.value=util.fmtFixed(resp.subjective_result.invest_philosophy,0);
				subjForm.invest_factors.value=util.fmtFixed(resp.subjective_result.invest_factors,0);
				subjForm.sh_structure.value=util.fmtFixed(resp.subjective_result.sh_structure,0);
				subjForm.trading_system.value=util.fmtFixed(resp.subjective_result.trading_system,0);
				subjForm.core_member.value=util.fmtFixed(resp.subjective_result.core_member,0);				
				}
			})
		
		$("input").blur(function(){
			if($(this).val()>subScore){
				subScoreT=false;
				layer.msg('评分超过本题满分分数，请重新评价');
				$(this).focus();
			}else if($(this).val()<=subScore){
				subScoreT=true;
			}
		});
		/*保存评分*/
		$("#comp").click(function(){		
			var userName = $('#userName').val();
			var password = $('#password').val();
			if(subjForm.sco1.value.trim().length==0){
				layer.msg('请为主要股东背景评分');
			}else if(subjForm.sco2.value.trim().length==0){
				layer.msg('请为组织架构评分');
			}else if(subjForm.sco3.value.trim().length==0){
				layer.msg('请为经营规划评分');
			}else if(subjForm.sco4.value.trim().length==0){
				layer.msg('请为核心投研人员教育/工作背景评分');
			}else if(subjForm.sco5.value.trim().length==0){
				layer.msg('请为激励机制评分');
			}else if(subjForm.sco6.value.trim().length==0){
				layer.msg('请为策略容量评分');
			}else if(subjForm.sco7.value.trim().length==0){
				layer.msg('请为投资理念评分');
			}else if(subjForm.sco8.value.trim().length==0){
				layer.msg('请为投资流程评分');
			}else if(subjForm.sco9.value.trim().length==0){
				layer.msg('请为交易系统评分');
			}else if(subjForm.sco10.value.trim().length==0){
				layer.msg('请为产品相关事宜评分');
			}else if(subjForm.sco11.value.trim().length==0){
				layer.msg('请为风控流程评分');
			}else if(!subScoreT){
				layer.msg('有项目打分超过满分分数，请修改');
			}else{
				params = $.extend({}, {
					'org_id':org_id1,
					'user_id':user_id,
					'subjective_mark':{
						'invest_process':Number(subjForm.sco8.value),
						'risk_control_process':Number(subjForm.sco10.value),
						'org_incentive':Number(subjForm.sco5.value),
						'strategy_scale':Number(subjForm.sco6.value),
						'department_structure':Number(subjForm.sco2.value),
						'plan':Number(subjForm.sco3.value),
						'invest_philosophy':Number(subjForm.sco7.value),
						'invest_factors':Number(subjForm.sco11.value),
						'sh_structure':Number(subjForm.sco1.value),
						'trading_system':Number(subjForm.sco9.value),
						'core_member':Number(subjForm.sco4.value),
					}
				});
				$.ajax({
					url :apiPath+"/api/v1/due_diligence/mark/save/",
					type : 'post',
					contentType : "application/json;charset=utf-8",
					data : JSON.stringify(params),
					success : function(resp) {
						sessionStorage.setItem('evaluationResults',JSON.stringify(resp));
						window.location.href= ctx+ "/InvestmentRatings/observationPool/Score/scoringResults/" + org_id_init +","+org_id ;
					}
				})
			}
			
			
		})
		
			
	}
});