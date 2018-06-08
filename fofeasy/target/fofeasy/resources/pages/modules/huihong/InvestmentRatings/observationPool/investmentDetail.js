/**
 * 投顾详情.js
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
	require('move');
	// 初始化区域
	$(function() {
		init();
	});
	function init(){
		initConfig();
		initEvent();
	}
	
	function initConfig(){
		
	}
	
	function initEvent(){
		$('#investmenTratings-investmentDetailUl li').click(function(){
			var moduleDiv = $('.detailModul');
			var moduleBtn = $('#investmenTratings-investmentDetailUl li');
			for(var i=0;i<moduleDiv.length;i++){
				$(moduleDiv[i]).fadeOut(50);
				$(moduleBtn[i]).removeClass("modulesActive");
			}
			$(this).addClass("modulesActive");
			$(moduleDiv[$(this).index()]).fadeIn(50);
		})
	}
});