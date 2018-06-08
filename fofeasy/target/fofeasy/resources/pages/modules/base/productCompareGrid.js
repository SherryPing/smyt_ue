define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	var selectFunds = require('base/selectFunds');
	// 初始化区域
	
	
	function init0(){
		showForm();
	}
	
	
	/**
	 * 对比数据表格
	 */
	function showForm(){
		var params = $("#searchChartForm").serializeObject();
		var ids = selectFunds.getFundIds();
		params = $.extend(params,{ids:ids});
		$.ajax({
			url:ctx+"/productNet/showForm",
			type:"get",
			data:params,
			success:function(data){
				$("#main-content").append(data);
			}
		});
		
	}
	
	
	
	exports.init = init0;
});