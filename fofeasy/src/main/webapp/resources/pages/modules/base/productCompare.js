define(function(require, exports, module) {
	// 引入js和css区域
	var selectFunds = require('base/selectFunds');
	var $ = require('jquery');
	var productCompareChart = require('base/productCompareChart');
	var productCompareGrid = require('base/productCompareGrid');
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		initCompares();
		// 显示图表
		productCompareChart.init();
		productCompareGrid.init();
		$(".fof-chart").hide();
		binBtn();
	}
	/**
     * 加载选中产品
     */
    function initCompares(){
		var funds = selectFunds.getFunds();
		for (var i=0; i<funds.length; i++){
			setFundButton(funds[i]);			
		}
    }
    /**
	 * 设置基金产品按钮选项
	 */
	function setFundButton(fund){
		var el = $('.fof-contrastbar .compare-buttons .nofund:eq(0)');
		el.data('fundid',fund.fundId);
		el.data('fundname',fund.fundName);
		el.find('span').text(fund.fundName);
		el.find('i').show();
		el.removeClass('nofund').addClass(el.data('class'));
	}
	/**
	 * 切换显示
	 */
	function binBtn(){
		$(".fof-contrastbar span:eq(0) button:eq(0)").bind("click",function(){
			$(".fof-contrastbar span:eq(0) button:eq(0)").removeClass("btn-default").addClass("btn-primary");
			$(".fof-contrastbar span:eq(0) button:eq(1)").removeClass("btn-primary").addClass("btn-default");
			$("#main-content").show();						  
			$(".fof-chart").hide();
		});
		$(".fof-contrastbar span:eq(0) button:eq(1)").bind("click",function(){
			$(".fof-contrastbar span:eq(0) button:eq(1)").removeClass("btn-default").addClass("btn-primary");
			$(".fof-contrastbar span:eq(0) button:eq(0)").removeClass("btn-primary").addClass("btn-default");
			$(".fof-chart").fadeIn();
			$("#main-content").fadeOut();
		});
	}
});