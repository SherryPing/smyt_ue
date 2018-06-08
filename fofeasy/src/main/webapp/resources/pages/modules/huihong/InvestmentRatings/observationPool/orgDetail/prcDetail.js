/**
 * 产品详情.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	require('modal');
	require('move');
	var util = require('util');
	var $ = require('jquery');
	var Ladda = require('ladda');
	var productBasic = require('huihong/InvestmentRatings/observationPool/orgDetail/prcBasic');
	var productPerformance = require('huihong/InvestmentRatings/observationPool/orgDetail/prcPerformance');
	var productAttribution = require('huihong/InvestmentRatings/observationPool/orgDetail/productAttribution');
	var productAnalysis = require('huihong/InvestmentRatings/observationPool/orgDetail/prcScene');
	var selectFunds = require('base/selectFunds');
	// 变量区域
	var fundId;
	var fundName;
	var isReport = false;
	
	// 初始化区域
	$(function(){
        init();
        move();
    });
	function init(){
//		isCollect();
		initConfig();
        initAction();
    }

	function initConfig(){
		
		//fundId = $('#fundId').val();
		// 显示基本信息
		showBasic();
	}
	function menuImg(){
		document.getElementById("menuImg1").src=ctxResources+"/images/MenuOptions1-1.png";
		document.getElementById("menuImg2").src=ctxResources+"/images/MenuOptions2-1.png";
		document.getElementById("menuImg3").src=ctxResources+"/images/MenuOptions3-1.png";
		document.getElementById("menuImg4").src=ctxResources+"/images/MenuOptions4-1.png";
}
	function move(){
		var cloud = document.getElementById("menuBackground");// 蓝色背景
	    var Menu = document.getElementById("Menu");
	   	var Distance=Menu.children[1].offsetLeft;
	    var lis = Menu.children[1].children;
	    $(window).resize(function() { //当浏览器大小变化时
			Distance=Menu.children[1].offsetLeft;
			target = current+Distance;
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
		//收藏 or 取消
//		$('#collectIMG').on('click',function(){
//			if($(this).attr('src').indexOf('huisheng/coll.png') != -1){
//				$.post(ctx+"/userCenter/collectFund",{'fundId':fundId,'user_id':useUserId},function(resp){
//					$('#collectIMG').attr('src',ctxResources+'/images/addCollect.png');
//				});
//			}else{
//				layer.confirm('确认取消收藏？', {
//					  btn: ['确认','取消'] //按钮
//					}, function(index){
//						$.post(ctx+"/userCenter/delFund",{'fundId':fundId,'user_id':useUserId},function(resp){
//							$('#collectIMG').attr('src',ctxResources+'/images/my-collection.png');
//						});
//						layer.close(index);
//					}, function(){
//					});
//			}
//			
//		});
		$('#Menu li>a').each(function(){
			$(this).bind('click',function(){
				showPage($("#Menu li>a").index($(this)));
			})
		});
		//顶部搜索框
	/*	$('#topSearch').on('click',function(){
			var searchType=$('#select_top').val();
			var searchCnt = $('#search_topinp').val();
			sessionStorage.setItem("searchcontent",searchCnt);
			sessionStorage.setItem("searchtype",searchType);
			window.location.href=ctx+"/productList/show";
		});*/
	}
	//是否收藏
	function isCollect(){
		$.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
			if($.inArray($('#fundId').val(),resp) != -1){
				$('#collectIMG').attr('src',ctxResources+'/images/addCollect.png');
			}
		});
	}
	
	// 业务逻辑区域
	function showPage(index){
		console.log(index);
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
			var flag = $('#menuImg3').attr('data-isLegal')//$('#menuImg3').data('isLegal');
			var startDate = new Date($('#foundation_date').text());
			var endDate = new Date($('#nav_date').text());
			startDate.setMonth(startDate.getMonth()+6);
			if(flag == 'true'&&startDate<=endDate)
				showAttribution();
			else
				layer.msg('目前仅提供股票多头策略、周频、净值数据满六个月基金的归因分析！ ');
			_hmt.push(['_trackEvent', '页面', '归因分析']);
			break;
		case 3:
			//情景分析
			if($('#freq').val().indexOf('月')==-1){
				showSituational();
				_hmt.push(['_trackEvent', '页面', '情景分析']);
			}else{
				layer.msg('目前仅提供 净值披露频率为： 周频 的情景分析！ ');
			}
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
			url:ctx+"/InvestmentRatings/observationPool/orgDetail/prcBasic",
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
			url:ctx+"/InvestmentRatings/observationPool/orgDetail/prcPerformance",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productPerformance.init();
			}
		});	}
	/**
	 * 归因分析 
	 */
	function showAttribution(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/InvestmentRatings/observationPool/orgDetail/prcAttribution",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productAttribution.init();
			}
		});
		
	}
	/**
	 * 情景分析
	 */
	function showSituational(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/InvestmentRatings/observationPool/orgDetail/prcScene",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				productAnalysis.init();
			}
		});
	}
	function initPrcinfo(){
		var params = {
				'fund_id':$('#fundId').val(),'user_id':useUserId
				};
		$.ajax({
			url:apiPath + "/api/v1/fof_easy/fund_static/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				console.log(resp);
				document.title = resp.fund_name;
				$('#reg_code').text('备案编号：'+(resp.reg_code==""?"--":resp.reg_code));
				$('#fund_name').text(resp.fund_name);
				$('#org_name').text(resp.org_name);
				$('#netNav').text(resp.nav);
				$('#added_nav').text(resp.added_nav);
				$('#swanav').text(resp.swanav);
				$('#nav_date').text(resp.nav_date);
				$('#year_return').text(util.fmtRatio(resp.year_return));
				$('#total_return').text(util.fmtRatio(resp.total_return));
				$('#fundStatu').text(resp.fund_status);
				$('#foundation_date').text(resp.foundation_date);
				$('#investmentAdvisers').attr("href",ctx+"/excavation/detail/"+resp.org_id)
				var fundStatu=$('#fundStatu').text();
				if(fundStatu=='运行中'){
					$('#fundStatu').css('color','red');
				}
			}
		})
	}
});