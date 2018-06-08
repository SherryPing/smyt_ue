define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	var $ = require('jquery');
	var ec = require('echarts');
	var util = require('util');
	require('bootstrap_datetimepicker');
	require('bootstrap_table_zh');
	require('slider');
	var constant = require('constant');
	var dzmcombo = require('dzmcombo');
	// 变量区域
	var isFirst;
	var benchmarkCombo;
	var dateEnd;
	var conditionDatas;
	var stockIndustryData;
	
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		initConfig();
        initAction();         
    }
	function initConfig(){
	}
	function initAction(){
		$('.cdata').datetimepicker({ //日期选择
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
		});
		var a=document.getElementsByClassName('control-group');
		for(var i=1;i<a.length+1;i++){
			new SlideBar({
			actionBlock : 'action-block'+i,
			actionBar : 'action-bar'+i,
			slideBar : 'scroll-bar'+i,
			barLength : 250,
			maxNumber : 100,
			showArea : 'showArea'+i
			});
		}
		$('.bmarkSlc').click(function() { //选择基准点击事件
		    var a = $(this).find('div').hasClass('benchmarkDivfalse');
		    if (a == 1) {
		        $(this).find('div').removeClass("benchmarkDivfalse");
		        $(this).find('label').removeClass("benchmarkLabfalse");
		    } else {
		        $(this).find('div').addClass("benchmarkDivfalse");
		        $(this).find('label').addClass("benchmarkLabfalse");
		    }
		});
	}
});