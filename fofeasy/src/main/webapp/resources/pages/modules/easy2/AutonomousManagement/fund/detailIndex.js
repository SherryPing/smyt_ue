/**
 * 自主管理产品详情.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('modal');
	require('move');
	require('layer');
	require('modernizr');
	require('progressBar');
	var $ = require('jquery');
	var Ladda = require('ladda');
	require('angular');
	var util = require('util');
	require('highchartmap');
	var productBasic = require('easy2/AutonomousManagement/fund/basic');
	var productPerformance = require('easy2/AutonomousManagement/fund/performance');
	var productPosition = require('easy2/AutonomousManagement/fund/positionsAnalysis');
	var productAttribution = require('easy2/AutonomousManagement/fund/attributionAnalysis');
	var productSituation = require('easy2/AutonomousManagement/fund/situationalAnalysis');
	var productCombination = require('easy2/AutonomousManagement/fund/combinationSilo');
	var selectFunds = require('base/selectFunds');
	// 变量区域
	var fundId;
	var isReport = false;
	// 初始化区域
	$(function(){
        init();
        // move();
    });
	function init(){
		initConfig();
        initAction();
        initPrcinfo();
    }

	function initConfig(){

		fundId = $('#fundId').val();
		// 显示基本信息
        showNet();
		
	}
	
	//客户多选数据对象。
	function act_data() {
		var data = {
			"subindexRanking" : '',
			"selectBenchmarks" : [],
			"frequency" : '',
			"incomeIndicators" : '',
			"riskIndicators" : '',
			"riskAdjustIndicators" : [],
			"relativeIndex":[],
			"report_type":''
		};
		return data
	}
// 	function menuImg(){
// 		document.getElementById("menuImg1").src=ctxResources+"/images/IndependentMenu1-1.png";
// 		document.getElementById("menuImg2").src=ctxResources+"/images/IndependentMenu2-1.png";
// 		document.getElementById("menuImg3").src=ctxResources+"/images/IndependentMenu3-1.png";
// 		document.getElementById("menuImg4").src=ctxResources+"/images/IndependentMenu4-1.png";
// 		document.getElementById("menuImg5").src=ctxResources+"/images/IndependentMenu5-1.png";
// }
// 	function move(){
// 		var cloud = document.getElementById("menuBackground");// 蓝色背景
// 	    var Menu = document.getElementById("Menu");
// 	   	var Distance=Menu.children[1].offsetLeft;
// 	    var lis = Menu.children[1].children;
// 	    $(window).resize(function() { //当浏览器大小变化时
// 			Distance=Menu.children[1].offsetLeft;
// 			target = current+Distance;
// 		});
// 	    var current = 0;  // 用于存放点击时候的 offsetLeft
// 	    var imgNumber=1;  //用户存放是第几个img。
// 	    for(var i=0; i<lis.length; i++){
// 	        lis[i].onmouseover = function () {
// 	    		menuImg();
// 	            target = this.offsetLeft+Distance;  // 把左侧的位置给target
// 	            var id1=$(this).find('img').attr('id');  //获取imgID
// 	            var few=id1.substring(7);//获取这是第几个
// 	            document.getElementById(id1).src=ctxResources+"/images/IndependentMenu"+few+"-2.png";
// 	        }
// 	        lis[i].onmouseout = function () {
// 	            target = current+Distance;     // 鼠标离开，target是刚才我们点击的位置
// 	            menuImg();
// 	            document.getElementById("menuImg"+imgNumber).src=ctxResources+"/images/IndependentMenu"+imgNumber+"-2.png";
// 	        }
// 	        lis[i].onclick = function () {
// 	            current = this.offsetLeft; //点击的时候把当前位置存贮一下
// 	            imgNumber=$(this).find("img").attr("id").substring(7);
// 	        }
// 	    }
// 	//    缓冲公式
// 	    var leader = Distance, target = Distance;
// 	    setInterval(function () {
// 	        leader = leader + (target - leader) / 10;
// 	        cloud.style.left = leader + "px";
// 	    },10);
// 	}
	function initAction(){
		$('#Menu li>a').each(function(){
			$(this).bind('click',function(){
				showPage($("#Menu li>a").index($(this)));
			})
		});
        $('#Menu li').on('click',function(){
            $('#Menu li').removeClass("active");
            $(this).addClass("active");
        });
		//分指标排名
				$('#index_ranking .reportStime').on('click',function(){
					var btn = $('#index_ranking .reportStime');
					for(var i = 0;i < btn.length;i++){
						$(btn[i]).removeClass('choiceTime');
					}
					$(this).addClass('choiceTime');
				});
    			//Bechmark
    			$('#exportBenchmark .bmarkSlc1').on('click',function(){
    				var state = $(this).find('div').hasClass('benchmarkDivfalse');
    				if(state==1){
    					$(this).find('div').removeClass('benchmarkDivfalse');
    					$(this).find('label').removeClass('benchmarkLabfalse');
    				}
    				else{
    					$(this).find('div').addClass('benchmarkDivfalse');
    					$(this).find('label').addClass('benchmarkLabfalse');
    				}
    			});
				//频率选择
				$('.checkboxData').click(function() { 
				var btn = $('.checkboxData');
				for (var i = 0; i < btn.length; i++) {
					$(btn[i]).removeClass('checkboxdataAct');
				}
				$(this).addClass('checkboxdataAct');
				});
				//收益指标
				$('#income_indicators .reportBtn').on('click',function(){
					var btn = $(this).parent().find('.reportBtn');
					for(var i = 0;i<btn.length;i++){
						$(btn[i]).removeClass('reportActive');
					}
					$(this).addClass('reportActive');
				});
				//风险调整&收益指标
				$('#sharp_select .reportBtn,#relative_index .reportBtn').on('click',function(){
					if($(this).hasClass('reportActive'))
						$(this).removeClass('reportActive');
					else
						$(this).addClass('reportActive');
				});
				
				//风险指标选择
				$('#risk_indicator .reportStime').on('click',function(){
					var btn = $('#risk_indicator .reportStime');
					for(var i=0;i<btn.length;i++){
						$(btn[i]).removeClass('choiceTime');
					}
					$(this).addClass('choiceTime');
				});
				
		$(".export_pdf").on('click',function(){
			progressStop();
			progressStart();
				$('#layer').css('display', 'block');
			//清空
			conditionDatas = act_data();
			
			switch ($(".export_pdf").index($(this))) {
			case 0:
				conditionDatas.report_type = 'performance';
				break;
			case 1:
				conditionDatas.report_type = 'position';
				break;
			case 2:
				conditionDatas.report_type = 'attribution';
				break;
			default:
				conditionDatas.report_type = 'performance';
				break;
			}
			//benchmark
			var benchmark = $('#radiusChoice .bmarkSlc1 div');
			for (var i = 0; i < benchmark.length; i++) {
				var bchChoice = $(benchmark[i]).hasClass('benchmarkDivfalse');
				if (bchChoice != 1) {
					var Sign = $(benchmark[i]).attr('id');
					conditionDatas.selectBenchmarks.push(Sign);
				}
			}
			//净值表
			var Frequency = $('#exportFrequency button'); 
			for (var i = 0; i < Frequency.length; i++) {
				var btnChoice = $(Frequency[i]).hasClass('checkboxdataAct');
				if (btnChoice == 1) {
					var Sign = $(Frequency[i]).attr('id');
					conditionDatas.frequency = Sign;
				}
			}
			//分指标排名
			var index_indicators = $('#index_ranking .reportStime');
			
			for(var i=0;i < index_indicators.length;i++){
				var btnChoice = $(index_indicators[i]).hasClass('choiceTime');
				if(btnChoice ==1){
					var Sign = $(index_indicators[i]).attr('id');
					
					conditionDatas.subindexRanking = Sign;
				}
			}
			//收益指标表现
			var income_indicators = $('#income_indicators button');
			
			for(var i=0;i < income_indicators.length;i++){
				var btnChoice = $(income_indicators[i]).hasClass('reportActive');
				if(btnChoice ==1){
					var Sign = $(income_indicators[i]).attr('id');
					
					conditionDatas.incomeIndicators = Sign;
				}
			}
			//风险指标表现
			var risk_indicator=$('#risk_indicator .reportStime');
			for(var i=0;i<risk_indicator.length;i++){
				var btnChoice = $(risk_indicator[i]).hasClass('choiceTime');
				if(btnChoice ==1){
					var Sign = $(risk_indicator[i]).attr('id');
					conditionDatas.riskIndicators = Sign;
				}
			}
			//风险调整收益
			var sharp_select = $('#sharp_select .reportBtn');
			for(var i=0;i<sharp_select.length;i++){
				var btnChoice = $(sharp_select[i]).hasClass('reportActive');
				if(btnChoice ==1){
					var Sign = $(sharp_select[i]).attr('id');
					conditionDatas.riskAdjustIndicators.push(Sign);
				}
			}
			//相对指标
			var relative_index = $('#relative_index .reportBtn');
			for(var i=0;i<relative_index.length;i++){
				var btnChoice = $(relative_index[i]).hasClass('reportActive');
				if(btnChoice ==1){
					var Sign = $(relative_index[i]).attr('id');
					conditionDatas.relativeIndex.push(Sign);
				}
			}
			exportReport();
		})
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
			// 持仓分析
			showPositions();
			$('#prcBasic').load();
			_hmt.push(['_trackEvent', '页面', '持仓分析']);
			break;
		case 3:
			//归因分析
			showAttribution();
			_hmt.push(['_trackEvent', '页面', '归因分析']);
			break;
		case 4:
			//情景分析
			if($('#freq').val().indexOf('月')==-1){
				showSituational();
				_hmt.push(['_trackEvent', '页面', '情景分析']);
			}else{
				layer.msg('目前仅提供 净值披露频率为： 周频 的情景分析！ ');
			}
			_hmt.push(['_trackEvent', '页面', '情景分析']);
			break;
		case 5:
			//组合调仓
			showCombination();
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
			url:ctx+"/ProductPerspective/Basic",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				$("#main-content .brief").css('background-color','#ECECEC');
				productBasic.init();
			}
		});
	}
	/**
	 * 业绩指标
	 */
	function showNet(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/ProductPerspective/Performance",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productPerformance.init();
			}
		});	}
	/**
	 * 持仓分析
	 */
	function showPositions(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/AutonomousManagement/positionAnalysis",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").html(data);
				// 绑定事件
				productPosition.init();
			}
		});
	}
	/**
	 * 归因分析
	 */
	function showAttribution(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/AutonomousManagement/attributionAnalysis",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productAttribution.init();
			}
		});
		//layer.msg('敬请期待Σ(っ °Д °;)っ');
	}

	/**
	 * 情景分析
	 */
	function showSituational(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/AutonomousManagement/situationalAnalysis",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productSituation.init();
			}
		});
	}
	/**
	 * 组合调仓
	 */
	function showCombination(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/AutonomousManagement/combinationSilo",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productCombination.init();
			}
		});
	}
	
	/**
	 * 导出报告
	 */
	function exportReport(){
//		$("#main-content").html("");
		var fundName = $('#fund_name').text();
		var params = {
				'fund_id':fundId,
				'fund_name':fundName,
				'subindexRanking':conditionDatas.subindexRanking,  //同类排名
				'incomeIndicators': conditionDatas.incomeIndicators,  //收益指标
//				'frequency':conditionDatas.frequency,  //净值
				'benchmarks':conditionDatas.selectBenchmarks.join(','),  
				'riskIndicators':conditionDatas.riskIndicators,
				'riskAdjustIndicators':conditionDatas.riskAdjustIndicators.join(','),
				'relativeIndex':conditionDatas.relativeIndex.join(','),
				'user_id':useUserId,
				'report_type':conditionDatas.report_type
				
	    }
		$.ajax({
			url:apiPath+'/api/v1/self_management/prepare_selfmanage_fund_data/',
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			complete:function(resp){
				progressComplete();
				setTimeout(function () {
					$('#layer').css('display', 'none');
					$('.step').fadeOut();
					$('.secondSituation').fadeIn();
				  }, 1500);
			},
			success:function(resp){
				var url = ctx+"/productReport/exportindependentFund?fundId=" 
					+ fundId + "&fundName=" + fundName+"&fileFormat=pdf"+"&imageHost="+image_host
					+ "&showType=" + conditionDatas.report_type;
				window.open(url);
			}
		})	
		
	}
	
//	/**
//	 * 导出报告
//	 */
//	function exportReport(){
//		
//		$("#main-content").html("");
//		$.ajax({
//			url:ctx+"/productReport/showNet/" + fundId,
//			type:"get",
//			data:{},
//			success:function(data){
//				$("#main-content").append(data);
//				productReportTemplate.init();
////				productReportTemplate.genReport(netCallback);
////				isReport = false;
////				if (isReport){
////					// 生成报告的时候，多了异步回调操作
////					productDetailNet.genReport(netCallback);
////					isReport = false;
////				} else{
////					// 绑定事件
////					productDetailNet.init();
////				}
//			}
//		});
		
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
		
//	}
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
	function initPrcinfo(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/self_management/fund_static/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				document.title = resp.fund_name;
                $('#Policy').text(resp.fund_type==""?"--":resp.fund_type);
				$('#reg_code').text(resp.reg_code==""?"--":resp.reg_code);
				$('#fund_name').text(resp.fund_name);
				$('#org_name').text(resp.org_name);
				$('#netNav').text(util.fmtFixed(resp.nav,4));
				$('#added_nav').text(util.fmtFixed(resp.added_nav,4));
				$('#swanav').text(util.fmtFixed(resp.swanav,4));
				$('#nav_date').text(resp.nav_date);
				$('#year_return').text(util.fmtRatio(resp.year_return));
				$('#total_return').text(util.fmtRatio(resp.total_return));
				$('#fundStatu').text(resp.fund_status);
				$('#foundation_date').text(resp.foundation_date);
                // $('#org_name').attr("href",ctx+"/excavation/detail/"+resp.org_id);
				var fundStatu=$('#fundStatu').text();
				if(fundStatu=='运行中'){
					$('#fundStatu').css('color','red');
				}
			}
		})
	}
});