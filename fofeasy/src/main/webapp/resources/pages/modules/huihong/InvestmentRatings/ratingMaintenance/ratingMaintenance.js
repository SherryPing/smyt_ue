/**
 * 评级标准维护.js
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var util = require('util');
	var moduleId;
	// 初始化区域
	function _init(){
		initConfig();
		initEvent();
	}
	
	function initConfig(){
		
	}
	
	function initEvent(){		
		
		/*返回上一页*/
		function cancel(){
			/*window.location.href=ctx+"/InvestmentRatings";*/
			window.location.href='/InvestmentRatings?index='+4;
			/*window.history.back();  */
		}
		
		/*取消修改*/
		$("#cancel").click(function(){
			cancel();
		})


		//权重表单提交
		/*$('#confirm').click(function() {
			var form = $("#newTempForm");
			var options = {
				url : apiPath+"/due_diligence/department_info/?org_id="+org_id1,
				type : 'post',
				success : function(data) {
				}
			};
			form.ajaxSubmit(options);
		});*/

		
		/*获取模板描述信息*/
		$.ajax({
			url :apiPath+"/api/v1/due_diligence/module/info/",
			type : 'get',
			contentType : "application/json;charset=utf-8",
			//			params: {'org_id':org_id},
			success : function(resp) {
				moduleId=resp.module_id;				
			}
		})
		
		/*切换设置模板权重页面*/
		$("#createNewTemp").click(function(){
			$("#mainPage").fadeOut(100);
			$("#newTemp").fadeIn(1000);
			console.log(moduleId)
			/*获取权重*/
			params = $.extend({}, {
				'module_id':moduleId
			});
		$.ajax({
			url :apiPath+"/api/v1/due_diligence/module/weight/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
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
		})
		
		
		/*上传权重*/
		$('#confirm').click(function() {
			params = $.extend({}, {
				"module_id": moduleId,
				"weights": {
					"total" : {
						"objective_mark" : newTempForm.objective_mark.value,
						"subjective_mark'" : newTempForm.subjective_mark.value,
					},
					'objective_mark': {
						'basic_info': newTempForm.basic_info.value, 
						'team_info': newTempForm.team_info.value,
						'fund_info': newTempForm.fund_info.value,
						'rc_info': newTempForm.rc_info.value,
					},
					'subjective_mark': {
						'sh_structure': newTempForm.sh_structure.value, 
						'department_structure': newTempForm.department_structure.value, 
						'plan': newTempForm.plan.value, 
	                    'core_member': newTempForm.core_member.value,  
	                    'org_incentive': newTempForm.org_incentive.value, 
	                    'strategy_scale': newTempForm.strategy_scale.value, 
	                    'invest_philosophy': newTempForm.invest_philosophy.value,  
	                    'invest_process': newTempForm.invest_process.value, 
	                    'trading_system': newTempForm.trading_system.value,  
	                    'risk_control_process': newTempForm.risk_control_process.value, 
	                    'invest_factors': newTempForm.invest_factors.value, 
	                 },
	                 'basic_info': {
	                	'increase_ratio': newTempForm.increase_ratio.value, 
	                    'investor_ratio': newTempForm.investor_ratio.value, 
	                    'manage_scale': newTempForm.manage_scale.value, 
	                    'prize': newTempForm.prize.value, 
	                    'reg_capital': newTempForm.reg_capital.value, 
	                    'scale_mtd': newTempForm.scale_mtd.value, 
	                    'share_holder': newTempForm.share_holder.value, 
	                    'years': newTempForm.years.value, 
	                 },
	                 'fund_info': {
	                	'extreme_down': newTempForm.extreme_down.value, 
	                    'extreme_raise': newTempForm.extreme_raise.value, 
	                    'income': newTempForm.income.value, 
	                    'income_over_mdd': newTempForm.income_over_mdd.value, 
	                    'mdd': newTempForm.mdd.value, 
	                 },
	                 'rc_info': {
	                	 'rc_doc': newTempForm.rc_doc.value, 
	                	 'rc_member': newTempForm.rc_member.value, 
	                	 'rc_system': newTempForm.rc_system.value, 
	                 },
	                 'team_info': {
	                	 'researcher_invest_year': newTempForm.researcher_invest_year.value, 
	                     'researcher_managed_asset': newTempForm.researcher_managed_asset.value, 
	                     'researcher_working_year': newTempForm.researcher_working_year.value, 
	                     'staff_changed': newTempForm.staff_changed.value, 
	                     'staff_num': newTempForm.staff_num.value, 
	                     'team_structure': newTempForm.team_structure.value, 
	                     }
					
				}
				
			});
			/*$.ajax({
				url :apiPath+"/due_diligence/module/modify/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					console.log(resp)
					cancel();
				},
				error : function() {}
			})*/
		})
		

		
	}
	//输出区域
	exports.init = _init;
})

