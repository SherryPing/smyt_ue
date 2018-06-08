/**
 * 评分评级_当前权重.js
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
	var moduleId;
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
		$("input").attr("readonly", "readonly");
		//临时返回上一页按钮
		$(".back").click(function(){
			window.history.go(-1);
		})
		moduleRecordId=JSON.parse(sessionStorage.getItem("module")).moduleRecordId;
		/*获取权重*/
		params = $.extend({}, {
			'module_record_id':moduleRecordId
		});	
		
	$.ajax({
		url :apiPath+"/api/v1/due_diligence/module/weight/",
		type : 'post',
		contentType : "application/json;charset=utf-8",
		data : JSON.stringify(params),
		success : function(resp) {
			console.log(resp)
			var resp=resp.weights;
			newTempForm.objective_mark.value=util.fmtRatioNp(resp.total.objective_mark);
			newTempForm.subjective_mark.value=util.fmtRatioNp(resp.total.subjective_mark);
			
			newTempForm.basic_info.value=util.fmtRatioNp(resp.objective_mark.basic_info);
			newTempForm.team_info.value=util.fmtRatioNp(resp.objective_mark.team_info);
			newTempForm.fund_info.value=util.fmtRatioNp(resp.objective_mark.fund_info);
			newTempForm.rc_info.value=util.fmtRatioNp(resp.objective_mark.rc_info);
			
			newTempForm.sh_structure.value=util.fmtRatioNp(resp.subjective_mark.sh_structure);
			newTempForm.department_structure.value=util.fmtRatioNp(resp.subjective_mark.department_structure);
			newTempForm.plan.value=util.fmtRatioNp(resp.subjective_mark.plan);
			newTempForm.core_member.value=util.fmtRatioNp(resp.subjective_mark.core_member);
			newTempForm.org_incentive.value=util.fmtRatioNp(resp.subjective_mark.org_incentive);
			newTempForm.strategy_scale.value=util.fmtRatioNp(resp.subjective_mark.strategy_scale);
			newTempForm.invest_philosophy.value=util.fmtRatioNp(resp.subjective_mark.invest_philosophy);
			newTempForm.invest_process.value=util.fmtRatioNp(resp.subjective_mark.invest_process);
			newTempForm.trading_system.value=util.fmtRatioNp(resp.subjective_mark.trading_system);
			newTempForm.risk_control_process.value=util.fmtRatioNp(resp.subjective_mark.risk_control_process);
			newTempForm.invest_factors.value=util.fmtRatioNp(resp.subjective_mark.invest_factors);
			
			newTempForm.increase_ratio.value=util.fmtRatioNp(resp.basic_info.increase_ratio);
			newTempForm.investor_ratio.value=util.fmtRatioNp(resp.basic_info.investor_ratio);
			newTempForm.manage_scale.value=util.fmtRatioNp(resp.basic_info.manage_scale);
			newTempForm.prize.value=util.fmtRatioNp(resp.basic_info.prize);
			newTempForm.reg_capital.value=util.fmtRatioNp(resp.basic_info.reg_capital);
			newTempForm.scale_mtd.value=util.fmtRatioNp(resp.basic_info.scale_mtd);
			newTempForm.share_holder.value=util.fmtRatioNp(resp.basic_info.share_holder);
			newTempForm.years.value=util.fmtRatioNp(resp.basic_info.years);
			
			newTempForm.extreme_down.value=util.fmtRatioNp(resp.fund_info.extreme_down);
			newTempForm.extreme_raise.value=util.fmtRatioNp(resp.fund_info.extreme_raise);
			newTempForm.income.value=util.fmtRatioNp(resp.fund_info.income);
			newTempForm.income_over_mdd.value=util.fmtRatioNp(resp.fund_info.income_over_mdd);
			newTempForm.mdd.value=util.fmtRatioNp(resp.fund_info.mdd);
			
			newTempForm.rc_doc.value=util.fmtRatioNp(resp.rc_info.rc_doc);
			newTempForm.rc_member.value=util.fmtRatioNp(resp.rc_info.rc_doc);
			newTempForm.rc_system.value=util.fmtRatioNp(resp.rc_info.rc_system);
			
			newTempForm.researcher_invest_year.value=util.fmtRatioNp(resp.team_info.researcher_invest_year);
			newTempForm.researcher_managed_asset.value=util.fmtRatioNp(resp.team_info.researcher_managed_asset);
			newTempForm.researcher_working_year.value=util.fmtRatioNp(resp.team_info.researcher_working_year);
			newTempForm.staff_changed.value=util.fmtRatioNp(resp.team_info.staff_changed);
			newTempForm.staff_num.value=util.fmtRatioNp(resp.team_info.staff_num);
			newTempForm.team_structure.value=util.fmtRatioNp(resp.team_info.team_structure);				
		},
		error : function() {}
	})		

		
		
		
	}
});