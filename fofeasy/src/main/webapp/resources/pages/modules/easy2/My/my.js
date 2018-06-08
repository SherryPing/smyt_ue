/**
 * 我的.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('chosen');
	require('jdirk');
	require('move');
	require('header');
	require('md5');
	var $ = require('jquery');
	var util = require('util');
	require('bootstrap_datetimepicker');
	require('bootstrap_table_zh');
	// require('btdata_zh');
	require('jqueryform');
//	var constant = require('constant');
//	var dzmcombo = require('dzmcombo');
	// 变量区域  
	var fundTab;
	var org_id=null;
	var fund_id = null;
	var manager_id=null;
	var myCollection = require("easy2/My/myCollection");
	var comparisonReport = require("easy2/My/comparisonReport");
	var dataFiling = require("easy2/My/dataFiling");
	var personalSettings = require("easy2/My/personalSettings");
	// var systemNotifications = require("easy2/My/systemNotifications");
	var selfUploaded = require("easy2/My/selfUploaded");
	var loc=location.href;
	var pageNo=0;
	if(loc.indexOf("?")>0&&loc.indexOf("=")>0){
		var locParam=loc.split("?")[1].split("=");
		if(locParam[0]=="index"){
			pageNo=Number(locParam[1]);
		}		
	}
	
	// 初始化区域
	$(function(){
        init();
    });
	
	function init(){
        initEvent();
//      datafil();
//      dataFiltbl();
       /* myCollectionPage();*/
        showPage(pageNo);        
    }
	
	//初始化事件
	function initEvent(){
		$('#setMenu button').on('click',function(){			
			showPage($('#setMenu button').index($(this)));
			$('#setMenu button').removeClass("personBtnactiv");
			$(this).addClass("personBtnactiv");
		});
		//日期选择
		$('.select_date').datetimepicker({
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
		});

		$('title').text('我的')
		$('#more_up').on('click',function(){
			fund_id = null;
			$('#more_uptype').val('fund');
		});
	}
	//
	function showPage(index){		
		switch(index){
		case 0:
			// 我的收藏
			myCollectionPage();
			break;
		case 1:
			// 对比报告
			comparisonReportPage();
			break;
		case 2:
			//数据填报
			dataFilingPage();
			break;
		case 3:
			//个人设置
			personalSettingsPage();
			break;
		// case 4:
		// 	//自主上传
		// 	if($("#setMenu button:eq(4)").data('type'))
		// 		selfUploadedPage();
		// 	else
		// 		layer.msg('您没有购买【升级版】或【组合版】，请联系您的销售经理！');
		// 	break;
		default:
			myCollectionPage();
			break;
		}
	}

	/**
	 * 我的收藏
	 */
	function myCollectionPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/userCenter/myCollection",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				myCollection.init();
			}
		});
	}
	/**
	 * 对比报告
	 */
	function comparisonReportPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/userCenter/comparisonReport",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				comparisonReport.init();
			}
		});
	}
	/**
	 * 数据填报
	 */
	function dataFilingPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/userCenter/dataFiling",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				dataFiling.init();
			}
		});
	}
	/**
	 * 个人设置
	 */
	function personalSettingsPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/userCenter/personalSettings",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				personalSettings.init();
			}
		});
	}
	/**
	 * 自主上传
	 */
	// function selfUploadedPage(){
	// 	$('#setMenu button').removeClass("personBtnactiv");
	// 	$('#dataUp').addClass("personBtnactiv");
	// 	$("#main-content").html("");
	// 	$.ajax({
	// 		url:ctx+"/userCenter/selfUploaded",
	// 		type:"get",
	// 		data:{},
	// 		success:function(data){
	// 			$("#main-content").append(data);
	// 			// 绑定事件
	// 			selfUploaded.init();
	// 		}
	// 	});
	// }
});