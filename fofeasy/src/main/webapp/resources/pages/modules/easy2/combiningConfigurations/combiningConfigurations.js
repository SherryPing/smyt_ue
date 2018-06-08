/**
 * 组合配置.js
 */

define(function(require, exports, module) {
	// 引入js和css区域
	require('move');
	require('header');
	var $ = require('jquery');
	var util = require('util');
	var policyMix = require('easy2/combiningConfigurations/policyMix/policyMix');
	var productPortfolio = require('easy2/combiningConfigurations/productPortfolio/productPortfolio');
    var pageNo=0;
    var loc=location.href;
    if(loc.indexOf("?")>0&&loc.indexOf("=")>0){
        var locParam=loc.split("?")[1].split("=");
        if(locParam[0]=="index"){
            pageNo=Number(locParam[1]);
        }
    }
	// 初始化区域
	$(function() {
		init();
	});

	function init() {
		initConfig();
		initEvent();
        if(pageNo!="1"&&pageNo!="2") {
            policyMixPage();
        }else{
            $('#labUl').css('display','none');
		}
	}
	function initConfig() {
		
	}
	function initEvent() {
		if(pageNo=="1"){
            var div = $('.comContent');
            var action = $('#labUl li');
            $(div).fadeOut(50);
            $(action).removeClass("Active");
            $(div[0]).fadeIn(500);
            $(this).addClass("Active");
            $('#addNewprcdiv').css("display","none");
            $('#showPrcdiv').css('display','block');
            policyMixPage();
		}else if(pageNo=="2"){
            var div = $('.comContent');
            var action = $('#labUl li');
            $(div).fadeOut(50);
            $(action).removeClass("Active");
            $(div[1]).fadeIn(500);
            $(this).addClass("Active");
            $('#addNewprcdiv').css("display","none");
            $('#showPrcdiv').css('display','block');
            productPortfolioPage();
		}

		$('#labUl li').click(function(){
			var div = $('.comContent');
			var action = $('#labUl li');
				$(div).fadeOut(50);
				$(action).removeClass("Active");
			$(div[$(this).index()]).fadeIn(500);
			$(this).addClass("Active");
			$('#addNewprcdiv').css("display","none");
			$('#showPrcdiv').css('display','block');
		});
		/*
		$('#assetUl li').click(function(){
			var prcdiv = $('.prcDiv');
			$(prcdiv).fadeOut(50);
			$(prcdiv[$(this).index()]).fadeIn(500);
		});
		$('.checkboxBtn').click(function(){
			$(this).toggleClass("checkboxActive");
		});
		$('#addNewprc').on("click",function(){
			$('#showPrcdiv').fadeOut(50);
			$('#addNewprcdiv').fadeIn(500);
		});
		  var assetUl = document.getElementById('assetUl');
			var assetLi = assetUl.getElementsByTagName('li');
			var assetyBg = assetLi[assetLi.length - 1];
			var current = 100;
			var heatmapdata = null;
			for (var i = 0; i < assetLi.length - 1; i++) {
				assetLi[i].onmouseover = function() {
					startMove1(assetyBg, this.offsetLeft);
				};
				assetLi[i].onmouseout = function() {
					startMove1(assetyBg, current);
				};
				assetLi[i].onclick = function() {
					current = this.offsetLeft;
				};
			}*/
		$('#labUl li').on('click',function(){
			switch ($('#labUl li').index($(this))) {
			case 0:
				policyMixPage();
				break;
			case 1:
				productPortfolioPage();
				break;
			default:
				policyMixPage();
				break;
			}
		});
		
	}
	
	
	/**
	 * 策略组合
	 */
	function policyMixPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/combination/policyMix",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				policyMix.init();
			}
		});	
	}
	
	
	/**
	 * 产品组合
	 */
	function productPortfolioPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/combination/productPortfolio",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productPortfolio.init();
			}
		});	
	}
	
	
});