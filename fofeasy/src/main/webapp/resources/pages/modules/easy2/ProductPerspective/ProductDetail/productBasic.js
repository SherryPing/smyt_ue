/**
 * 基本信息.js
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var util = require('util');
	var state = false;
	// 初始化区域
	function _init(){
		if(document.referrer.indexOf("customData")){
			state = true;
		};
		basicInfo()
	}
	function basicInfo(){
		var params = {
				'fund_id':$('#fundId').val(),
				userId: useUserId,'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/fund_info/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.data_freq != '周度'&&resp.data_freq != '日度')
					$('#menuImg3').attr('data-isLegal','false');
				if(resp.fund_type_strategy.indexOf('股票多头')<0)
					$('#menuImg3').attr('data-isLegal','false');
				$('#freq').val(resp.data_freq);
				$('#fundName').text(util.betgAgainst(resp.fund_name));
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
				$('#fund_custodian').text(util.betgAgainst(resp.fund_custodian));
				$('#expected_return').text(util.betgAgainst(resp.expected_return));
				$('#nav_date1').text(util.betgAgainst(resp.nav_date));
				$('#fee_trust').text(util.betgAgainst(resp.fee_trust));
				$('#fee_pay').text(util.betgAgainst(resp.fee_pay));
				$('#Policy').text(util.betgAgainst(resp.fund_type_strategy));
				//判断发行规模有没有值，有值就除10000，把单位换成亿、没有的话就直接让他显示出来。
				if(resp.asset_scale!='-'){
					$('#asset_scale').text((resp.asset_scale/10000).toFixed(2));
				}
				else{
					$('#asset_scale').text('--');
				}
				//判断投资经理是否为空，为空就不显示。
				// console.log(resp);
				if(resp.manager_info[0].manager_name==null){
					$('#infoDetail').html('<div>暂无信息</div>');
				}
				else if(resp.manager_info[0].manager_name=='-'){
					$('#infoDetail').html('<div>暂无信息</div>');
				}
				else{
					var manageInfo="";
					for(var i=0;i<resp.manager_info.length;i++){
						manageInfo+='<div><div class="dian"></div><span class="managerName">'+resp.manager_info[i].manager_name+'</span></div><div class="workExperience"><span>'+resp.manager_info[i].manager_resume+'</span></div>'
					}
					$('#infoDetail').html(manageInfo);
				}
				$('#proFile').text(resp.org_info.org_info);	
			}
		})
	}
	//输出区域
	exports.init = _init;
})
	