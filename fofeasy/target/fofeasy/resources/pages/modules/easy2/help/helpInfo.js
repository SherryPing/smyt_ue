/**
 * 帮助手册.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('bootstrap_table_zh');
	require('chosen');
	require('header');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('move');
	require("highcharts_zh_CN");
	require("chartCollection");
	require("highchartmap");
	var $ = require('jquery');
	var util = require('util');
	
	// 初始化区域
	$(function() {
		init();
	});

	function init() {
		initAction();
		initConfig();
		

	}
	function initConfig() {
		function speed(dom){
			var iSpeed = 0;
			var left = 0;
			function move(obj, iTarget) {
				clearInterval(obj.timer);
				obj.timer = setInterval(function() {
					iSpeed += (iTarget - obj.offsetLeft) / 5;
					iSpeed *= 0.7;
					left += iSpeed;

					if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
						clearInterval(obj.timer);
						obj.style.left = iTarget + 'px';
					//alert('关了');
					} else {
						obj.style.left = left + 'px';
					}
				}, 30);
			}
			var historyUl = document.getElementById(dom);
			var historyLi = historyUl.getElementsByTagName('li');
			var historyBg = historyLi[historyLi.length - 1];
			var Distance = historyUl.children[0].offsetLeft;
			console.log(Distance);
			for (var i = 0; i < historyLi.length - 1; i++) {
				historyLi[i].onmouseover = function() {
					move(historyBg, this.offsetLeft);
				};
				historyLi[i].onmouseout = function() {
					move(historyBg, Distance);
				};
				historyLi[i].onclick = function() {
					Distance = this.offsetLeft;
				};
			}			
		}
		/*左侧导航*/
		$("#subul").click(function(){
			$(".subNavLeft").toggle();						
		});
		$(".navLeft>li").click(function(){
			$(".navLeft li").css("color","#686868");
			/*$(".subNavLeft>li").css("color","#686868");*/
			$(".navLeft>li").css("border-left","0");	
			$(this).css("color","#0686d8");		
			$(this).css("border-left","3px solid #0686d8");	
		});
		$("#fa").click(function(){
			$('.mol').fadeOut(50);
			$('#FAQ').fadeIn(800);
			$(".subNavLeft").css("display","none");
			$(".subNavLeft>li").css("font-weight","500");
		});
		$(".subNavLeft>li").click(function(){
			$(".subNavLeft>li").css("font-weight","500");
			console.log($(this))
			$(this).css("font-weight","600");	
			let mol = $('.mol');
			$('#FAQ').fadeOut(50);
			$('.mol').fadeOut(50);
			$(mol[$(this).index()]).fadeIn(800);
		});
		
		/*faq收缩*/
		$(".QA .faqQ").click(function(){
			$(this).parent().find('.faqA').toggle();
			/*icon下拉上收*/
			if($(".QA .faqA").is(":visible")) {
				$(this).parent().find('#arrow-up').css("display","block");
				$(this).parent().find('#arrow-down').css("display","none");
			}else{
				$(this).parent().find('#arrow-up').css("display","none");
				$(this).parent().find('#arrow-down').css("display","block");
			}
		})
		/*产品透视滑动条*/
		$('#pro_pers #historyUl li').click(function(){
			$("#pro_pers #historyUl li").css("color","#686868");
			$(this).css("color","#0686d8");
			let perMol = $('#pro_pers .per_mol');
			$('#pro_pers .per_mol').fadeOut(50);
			$(perMol[$(this).index()]).fadeIn(800);
		});
		$('#EvaHistoryUl li').click(function(){
			$("#EvaHistoryUl li").css("color","#686868");
			$(this).css("color","#0686d8");
			let evaMol = $('.eva_mol');
			$('.eva_mol').fadeOut(50);
			$(evaMol[$(this).index()]).fadeIn(800);
		});
		$('#IndHistoryUl li').click(function(){
			$("#IndHistoryUl li").css("color","#686868");
			$(this).css("color","#0686d8");
			let indMol = $('.ind_mol');
			$('.ind_mol').fadeOut(50);
			$(indMol[$(this).index()]).fadeIn(800);
		});
		$('#CombHistoryUl li').click(function(){
			$("#CombHistoryUl li").css("color","#686868");
			$(this).css("color","#0686d8");
			let combMol = $('.comb_mol');
			$('.comb_mol').fadeOut(50);
			$(combMol[$(this).index()]).fadeIn(800);
		});
		speed('historyUl');
		speed('EvaHistoryUl');
		speed('IndHistoryUl');
		speed('CombHistoryUl');
		
	}
	function initAction() {
		
	}
			
		
});