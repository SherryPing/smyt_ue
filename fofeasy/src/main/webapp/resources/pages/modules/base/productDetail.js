/**
 * http://usejsdoc.org/
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('header');
	require('modal');
	var $ = require('jquery');
	var Ladda = require('ladda');
	var productDetailNet = require('base/productDetailNet');
	var productDetailPerformance = require('base/productDetailPerformance');
	var productReportTemplate = require('base/productReportTemplate');
	var productDetailPosition = require('base/productDetailPosition');
	var productDetailAttribution = require('base/productDetailAttribution');

	// 变量区域
	var fundId;
	var isReport = false;
	// 初始化区域
	$(function(){
        init();
    });
	function init(){
		initConfig();
        initAction();
    }
	function initConfig(){
		fundId = $('#fund').data('id');
		// 显示基本信息
		showBasic();
	}
	function initAction(){
		$('.ul3 li').each(function(){
			$(this).bind('click',function(){
				if (!$(this).hasClass("active")){
					$(this).addClass('active').siblings(".ul3 li").removeClass("active");
				}
				showPage($(this).data('id'));
			})
		});
//		$('#btnReport').bind('click',function(){
//			exportReport();
//		});
	}
	// 业务逻辑区域
	function showPage(index){
		switch(index){
		case 0:
			// 基本信息
			showBasic();
			_hmt.push(['_trackEvent', '页面', '基本信息']);
			break;
		case 1:
			// 净值分析
			showNet();
			_hmt.push(['_trackEvent', '页面', '净值分析']);
			break;
		case 2:
			// 业绩分析
			showPerformance();
			_hmt.push(['_trackEvent', '页面', '业绩分析']);
			break;
		case 3:
			// 持仓分析
			showPosition();
			_hmt.push(['_trackEvent', '页面', '持仓分析']);
			break;
		case 4:
			// 归因分析
			showAttribution();
			_hmt.push(['_trackEvent', '页面', '归因分析']);
			break;

		default:
			showBasic();
			break;
		}
	}
	/**
	 * 打开基本信息 
	 */
	function showBasic(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/productDetail/showBasic/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				$("#main-content .brief").css('background-color','#ECECEC');
			}
		});
	}
	/**
	 * 净值分析
	 */
	function showNet(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/productNet/showNet/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productDetailNet.init();
			}
		});
	}
	/**
	 * 业绩指标
	 */
	function showPerformance(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/productDetailPerformance/showPerformance/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productDetailPerformance.init();
			}
		});
	}
	/**
	 * 持仓分析
	 */
	function showPosition(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/productDetailPosition/showPosition/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productDetailPosition.init();
			}
		});
	}
	/**
	 * 归因分析 
	 */
	function showAttribution(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/productDetailAttribution/showAttribution/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productDetailAttribution.init();
			}
		});
	}
	/**
	 * 导出报告
	 */
	function exportReport(){
		
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/productReport/showNet/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				productReportTemplate.init();
//				productReportTemplate.genReport(netCallback);
//				isReport = false;
//				if (isReport){
//					// 生成报告的时候，多了异步回调操作
//					productDetailNet.genReport(netCallback);
//					isReport = false;
//				} else{
//					// 绑定事件
//					productDetailNet.init();
//				}
			}
		});
		
//		isReport = true;
//		$('#netli').trigger('click');
		
		//自定页
//		layer.open({
//		  type: 1,
//		  skin: 'layui-layer-demo', //样式类名
//		  closeBtn: 0, //不显示关闭按钮
//		  anim: 2,
//		  shadeClose: true, //开启遮罩关闭
//		  area: ['420px', '240px'], //宽高
//		  content: '<div class="layui-form-pane" style="margin-top: 15px;"><div class="layui-form-item"><label class="layui-form-label">范围选择</label><div class="layui-input-inline"><input class="layui-input" placeholder="开始日" id="LAY_demorange_s"></div><div class="layui-input-inline"><input class="layui-input" placeholder="截止日" id="LAY_demorange_e"></div></div></div>'
//		});
		
	}
//	function netCallback(isOk){
//		console.log('isOk is ' + isOk);
//		if (isOk){
//			var fundId = $('#fund').data('id');
//			var fundName = $('#fund').text();
//			var url = ctx + '/productReport/exportReport?fundId=' + fundId + '&fundName=' + fundName;
//			
//			var tempwindow=window.open("");         
//			tempwindow.location=url;
//
////			window.open(url);
//		} else{
//			layer.alert('报告生成失败',{title:'系统提示',icon:2,time:10000});
//		}
//	}
});