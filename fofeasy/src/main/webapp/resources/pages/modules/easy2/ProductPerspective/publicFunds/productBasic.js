/**
 * 基本信息.js
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var util = require('util');
	var state = false;
	// 初始化区域
	function _init(){
		// if(document.referrer.indexOf("customData")){
		// 	state = true;
		// };
		basicInfo()
	}
	function basicInfo(){
		var params = {
				'fund_id':$('#fundId').val()
				};
		$.ajax({
            url:apiPath2 + "/base/fund/info/",
            type:'get',
			contentType:"application/json;charset=utf-8",
			data:params,
			success:function(res) {
                if (res.success) {
					var resp=res.records;
					$('#fundName').text(util.betgAgainst(resp.fund_name));
					$('#orgName').text(util.betgAgainst(resp.org_name));
					$('#fundType').text(util.betgAgainst(resp.fund_type_name?resp.fund_type_name:"--"));
					$('#init_raise').text(util.betgAgainst(resp.init_raise));
					$('#purchase_status').text(util.betgAgainst(resp.purchase_status));
					$('#comparison_criterion').text(util.betgAgainst(resp.comparison_criterion));//业绩比较基准
					$('#tracking_benchmark').text(util.betgAgainst(resp.tracking_benchmark));
					$('#fee_purchase').text(util.betgAgainst(resp.fee_purchase));
					$('#fee_manage').text(util.betgAgainst(resp.fee_manage));
					$('#fund_full_name').text(util.betgAgainst(resp.fund_full_name));
					$('#foundation_date1').text(util.betgAgainst(resp.foundation_date));
					$('#total_asset').text(util.betgAgainst(resp.total_asset));
					$('#redemption_status').text(util.betgAgainst(resp.redemption_status));
					$('#fee_redeem').text(util.betgAgainst(resp.fee_redeem));
					$('#fee_trust').text(util.betgAgainst(resp.fee_trust));
                    if(resp.person_info.length>0){
                        var member="";
                        for(var i=0;i<resp.person_info.length;i++){
                            if(i==resp.person_info.length-1){
                                member+=resp.person_info[i].person_name
                            }else{
                                member+=resp.person_info[i].person_name+','
                            }
                        }
                        $('#person_info').html(member);
                    }else{
                        $('#person_info').html("--");
					}

					//判断投资经理是否为空，为空就不显示。
					if(resp.person_info.length>0) {
                        if (resp.person_info[0].resume) {
                            var manageInfo = "";
                            for (var i = 0; i < resp.person_info.length; i++) {
                                manageInfo += '<div><div class="dian"></div><span class="managerName">' + resp.person_info[i].person_name + '</span></div><div class="workExperience"><span>' + resp.person_info[i].resume + '</span></div>'
                            }
                            $('#infoDetail').html(manageInfo);
                        }
                        else {
                            $('#infoDetail').html('<div>暂无信息</div>');
                        }
                    }else {
                        $('#infoDetail').html('<div>暂无信息</div>');
                    }
					// $('#proFile').text(resp.org_info.org_info);
                    $('#proFile').html('<div>暂无信息</div>');
				}
            }
		})
	}
	//输出区域
	exports.init = _init;
})
	