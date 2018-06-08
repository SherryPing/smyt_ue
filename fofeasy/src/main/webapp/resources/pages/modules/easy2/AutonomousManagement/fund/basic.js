/**
 * 基本信息.js
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var state = false;
	// 初始化区域
	function _init(){
		if(document.referrer.indexOf("customData")){
			state = true;
		};
		basicInfo()
	}
	function basicInfo(){
		$('#managerInfo').css('display','none');
		$('#companyInfo').css('display','none');
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/self_management/fund_info/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				$('#fundName').text(resp.fund_name);
				$('#fund_type_issuance').text(util.betgAgainst(resp.fund_type_issuance));
				$('#foundation_date1').text(util.betgAgainst(resp.foundation_date));
				$('#fund_type_structure').text(util.betgAgainst(resp.fund_type_structure));
				$('#fund_status').text(util.betgAgainst(resp.fund_status));
				$('#open_date').text(util.betgAgainst(resp.open_date));
				$('#fund_stockbroker').text(util.betgAgainst(resp.fund_stockbroker));
				$('#fee_subscription').text(util.betgAgainst(resp.fee_subscription));
				$('#fee_redeem').text(util.betgAgainst(resp.fee_redeem));
				$('#fee_manage').text(util.betgAgainst(resp.fee_manage));
				$('#reg_time').text(util.betgAgainst(resp.reg_time));
				$('#fund_full_name').text(util.betgAgainst(resp.fund_full_name));
				$('#fund_type_strategy').text(util.betgAgainst(resp.fund_type_strategy));
				$('#region').text(util.betgAgainst(resp.region));
				$('#fund_time_limit').text(util.betgAgainst(resp.fund_time_limit));
				$('#data_freq').text(util.betgAgainst(resp.data_freq));//频率
				$('#freq').val(util.betgAgainst(resp.data_freq));
				$('#fund_custodian').text(util.betgAgainst(resp.fund_custodian));
				$('#expected_return').text(util.betgAgainst(resp.expected_return));
				$('#nav_date1').text(util.betgAgainst(resp.nav_date));
				$('#fee_trust').text(util.betgAgainst(resp.fee_trust));
				$('#fee_pay').text(util.betgAgainst(resp.fee_pay));
				$('#Policy').text(util.betgAgainst(resp.fund_type_strategy));
				$('#asset_scale').text(util.betgAgainst(resp.total_asset/100000000,"number",2))
			}
		})
	}
	//输出区域
	exports.init = _init;
})
	