/**
 * 后台管理主页.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('responsive_nav_min');
	require('responsive_main');
	var $ = require('jquery');
	var userManagement = require('backstage/userManagement');
	var distributionStatistics = require('backstage/distributionStatistics');
	var moduleStatistics = require('backstage/moduleStatistics');
	var registerStatistics = require('backstage/registerStatistics');
	var productAnalysis = require('backstage/productAnalysis');
	var investmentAnalysis = require('backstage/investmentAnalysis');
	var roleSettings = require('backstage/roleSettings');
	var basicSettings = require('backstage/basicSettings');
	// 变量区域
	
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		initConfig();
		showUserManagement();
    }
	function initConfig(){
		$('#manageMenus li').on('click',function(){
			showPage($('#manageMenus li').index($(this)));
		})
	}
	
	
	
	function showPage(index){
		switch(index){
		case 0:
			showUserManagement();
			break;
		case 1:
		case 2:
			showDistributionStatistics();
			break;
		case 3:
			showModuleStatistics();
			break;
		case 4:
			showRegisterStatistics();
			break;
		case 5:
			showProductAnalysis();
			break;
		case 6:
			showInvestmentAnalysis();
			break;
		case 7:
		case 8:
			showRoleSettings();
			break;
		case 9:
			showBasicSettings();
			break;
		default:
			showUserManagement();
			break;
		}
	}
	

	/**
	 * 用户管理
	 */
	function showUserManagement(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/userManager/showUserManagement",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				userManagement.init();
				
			}
		});
	}
	/**
	 * 分布统计
	 */
	function showDistributionStatistics(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/statisticalAnalysis/showDistributionStatistics",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				distributionStatistics.init();
				
			}
		});
	}
	/**
	 * 模块统计
	 */
	function showModuleStatistics(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/statisticalAnalysis/showModuleStatistics",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				moduleStatistics.init();
				
			}
		});
	}
	/**
	 * 注册统计
	 */
	function showRegisterStatistics(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/statisticalAnalysis/showRegisterStatistics",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				registerStatistics.init();
				
			}
		});
	}
	/**
	 * 产品分析
	 */
	function showProductAnalysis(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/statisticalAnalysis/showProductAnalysis",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				productAnalysis.init();
				
			}
		});
	}
	/**
	 * 投顾分析
	 */
	function showInvestmentAnalysis(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/statisticalAnalysis/showInvestmentAnalysis",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				investmentAnalysis.init();
				
			}
		});
	}
	
	/**
	 * 角色设置
	 */
	function showRoleSettings(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/personalitySettings/showRoleSettings",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				roleSettings.init();
			}
		});
	}
	
	/**
	 * 基本设置
	 */
	function showBasicSettings(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/personalitySettings/showBasicSettings",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				basicSettings.init();
				
			}
		});
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});