/**
 * http://usejsdoc.org/
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('modal');
	require('move');
	var $ = require('jquery');
	var Ladda = require('ladda');
	var productDetailNet = require('base/productDetailNet');
	var productDetailPerformance = require('base/easy2Js/performanceIndicators');
	var productReportTemplate = require('base/productReportTemplate');
	var productDetailPosition = require('base/easy2Js/sitAnalysis');
	var productDetailAttribution = require('base/productDetailAttribution');

	// 变量区域
	var fundId;
	var isReport = false;
	// 初始化区域
	$(function(){
        init();
        move()
    });
	function init(){
		initConfig();
        initAction();
    }
	function initConfig(){
		//如果基金状态是运行中，字体为红色。
		var fundStatu=$('#fundStatu').text();
		if(fundStatu=="运行中"){
			$('#fundStatu').css('color','red');
		}
		fundId = $('#prcInfo').data('id');
		// 显示基本信息
		showBasic();
		//滑动导航栏
		window.onload = function() {
			var oUl = document.getElementById('navUl');
			var aLi = oUl.getElementsByTagName('li');
			var oBg = aLi[aLi.length - 1];
			var novem = document.body.clientWidth;
			$(window).resize(function() { //当浏览器大小变化时
				novem = $(window).width(); //浏览器时下窗口可视区域高度
				ofleft = parseInt(novem * 0.318); //重新赋值，浏览器宽度。
				startMove(oBg, ofleft);
			});
			var ofleft = parseInt(novem * 0.318);
			for (var i = 0; i < aLi.length - 1; i++) {
				aLi[i].onmouseover = function() {
					startMove(oBg, this.offsetLeft);
				};
				aLi[i].onmouseout = function() {
					startMove(oBg, ofleft);
				};
			}
				$('#navUl li:nth(0) img').attr("src",ctx+'/resources/images/header1-1.png');
				$('#navUl li:nth(1) img').attr("src",ctx+'/resources/images/header2-2.png');
				$('#navUl li:nth(2) img').attr("src",ctx+'/resources/images/header3-1.png');
				$('#navUl li:nth(3) img').attr("src",ctx+'/resources/images/header4-1.png');
				$('#navUl li:nth(4) img').attr("src",ctx+'/resources/images/header5-1.png');
				$('#activeLine').css('margin-left','25%');
		
		};
	}
	function menuImg(){
		document.getElementById("menuImg1").src=ctxResources+"/images/MenuOptions1-1.png";
		document.getElementById("menuImg2").src=ctxResources+"/images/MenuOptions2-1.png";
		document.getElementById("menuImg3").src=ctxResources+"/images/MenuOptions3-1.png";
		document.getElementById("menuImg4").src=ctxResources+"/images/MenuOptions4-1.png";
}
	function move(){
		var cloud = document.getElementById("menuBackground");// 云彩
	    var Menu = document.getElementById("Menu");
	   	var Distance=Menu.children[1].offsetLeft;
	    var lis = Menu.children[1].children;
	    var menuTop=document.getElementById("Menu");
	    
	    $(window).resize(function() { //当浏览器大小变化时
			Distance=Menu.children[1].offsetLeft;
			target = current+Distance;
			$('#Menu ul').css('top',menuTop.offsetTop);
			$('#menuBackground').css('top',menuTop.offsetTop);
		});
	    var current = 0;  // 用于存放点击时候的 offsetLeft
	    var imgNumber=1;  //用户存放是第几个img。
	    for(var i=0; i<lis.length; i++){
	        lis[i].onmouseover = function () {
	    		menuImg();
	            target = this.offsetLeft+Distance;  // 把左侧的位置给target
	            var id1=$(this).find('img').attr('id');  //获取imgID
	            var few=id1.substring(7);//获取这是第几个
	            document.getElementById(id1).src=ctxResources+"/images/MenuOptions"+few+"-2.png";
	        }
	        lis[i].onmouseout = function () {
	            target = current+Distance;     // 鼠标离开，target是刚才我们点击的位置
	            menuImg();
	            document.getElementById("menuImg"+imgNumber).src=ctxResources+"/images/MenuOptions"+imgNumber+"-2.png";
	        }
	        lis[i].onclick = function () {
	            current = this.offsetLeft; //点击的时候把当前位置存贮一下
	            imgNumber=$(this).index()+1;
	        }
	    }
	//    缓冲公式	
	    var leader = Distance, target = Distance;
	    setInterval(function () {
	        leader = leader + (target - leader) / 10;
	        cloud.style.left = leader + "px";
	    },10);
	}
	function initAction(){
		$('#Menu li>a').each(function(){
			$(this).bind('click',function(){
				showPage($("#Menu li>a").index($(this)));
			})
		});
		
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
			// 业绩分析
			showNet();
			_hmt.push(['_trackEvent', '页面', '业绩分析']);
			break;
		case 2:
			// 归因分析
			showAttribution();
			_hmt.push(['_trackEvent', '页面', '归因分析']);
			break;
		case 3:
			//情景分析
			showSituational();
			_hmt.push(['_trackEvent', '页面', '情景分析']);
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
			url:ctx+"/productDetail/showNewBasic/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				$("#main-content .brief").css('background-color','#ECECEC');
			}
		});
	}
	/**
	 * 业绩指标
	 */
	function showNet(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/productDetailPerformance/showNewPerformance/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productDetailPerformance.init();
			}
		});	}
	/**
	 * 归因分析 
	 */
	function showAttribution(){
		$("#main-content").html("");
		/*$.ajax({
			url:ctx+"/productDetailAttribution/showNewAttribution/" + fundId,
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productDetailAttribution.init();
			}
		});*/
		layer.msg('敬请期待Σ(っ °Д °;)っ');
	}
	/**
	 * 情景分析
	 */
	function showSituational(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/productDetail/showSituational/" + fundId,
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